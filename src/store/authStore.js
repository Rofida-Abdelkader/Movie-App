import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * AUTH STORE
 * ──────────────────────────────────────────────────────────────
 * Handles:
 *  • Local "mock" auth  (register / login / logout)
 *  • TMDB real auth     (requestToken → validateToken → createSession)
 *  • Persists user + sessionId to localStorage automatically
 *
 * TMDB auth flow (bonus):
 *  1. requestTmdbToken()        → gets a request_token from TMDB
 *  2. Redirect user to:
 *     https://www.themoviedb.org/authenticate/{request_token}?redirect_to=YOUR_APP_URL
 *  3. After redirect, call createTmdbSession(request_token)
 *     → exchanges token for a session_id
 *  4. session_id is stored in the store and used for all TMDB API calls
 * ──────────────────────────────────────────────────────────────
 */

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const TMDB_BASE = 'https://api.themoviedb.org/3';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────
      user: null,   // { id, username, email, avatar? }
      sessionId: null,   // TMDB session_id (bonus flow)
      accountId: null,   // TMDB account_id (needed for Favorites API)
      loading: false,
      error: null,

      // ── Helpers ────────────────────────────────────────────
      clearError: () => set({ error: null }),

      // ── LOCAL AUTH ─────────────────────────────────────────

      /**
       * Register a new user locally.
       * In a real app swap this with your backend call.
       */
      register: async ({ username, email, password }) => {
        set({ loading: true, error: null });
        try {
          if (!username || !email || !password)
            throw new Error('All fields are required.');
          if (password.length < 4)
            throw new Error('Password must be at least 4 characters.');

          // Firebase creates the account and returns a user credential
          const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
          const { auth } = await import('../firebase/firebase');

          const credential = await createUserWithEmailAndPassword(auth, email, password);

          // Save the username to Firebase profile
          await updateProfile(credential.user, { displayName: username });

          const user = {
            id: credential.user.uid,
            username,
            email,
            avatar: null,
            createdAt: new Date().toISOString(),
          };

          set({ user, loading: false });
          return { success: true };
        } catch (err) {
          // Firebase error messages are not user friendly so we clean them up
          let message = err.message;
          if (err.code === 'auth/email-already-in-use') message = 'Email is already registered.';
          if (err.code === 'auth/invalid-email') message = 'Invalid email address.';
          if (err.code === 'auth/weak-password') message = 'Password must be at least 6 characters.';
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      /**
       * Login with username + password (local mock).
       * Replace the body with a real API call as needed.
       */
      login: async ({ email, password }) => {
        set({ loading: true, error: null });
        try {
          const { signInWithEmailAndPassword } = await import('firebase/auth');
          const { auth } = await import('../firebase/firebase');

          const credential = await signInWithEmailAndPassword(auth, email, password);

          const user = {
            id: credential.user.uid,
            username: credential.user.displayName || credential.user.email,
            email: credential.user.email,
            avatar: credential.user.photoURL || null,
          };

          set({ user, loading: false });
          return { success: true };
        } catch (err) {
          let message = err.message;
          if (err.code === 'auth/user-not-found') message = 'No account found with this email.';
          if (err.code === 'auth/wrong-password') message = 'Incorrect password.';
          if (err.code === 'auth/invalid-email') message = 'Invalid email address.';
          if (err.code === 'auth/invalid-credential') message = 'Invalid email or password.';
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },
      /** Update account details (username / email / avatar). */
      updateAccount: async (fields) => {
        set({ loading: true, error: null });
        try {
          const { updateProfile, updateEmail, updatePassword } = await import('firebase/auth');
          const { auth } = await import('../firebase/firebase');

          const currentUser = auth.currentUser;

          if (!currentUser) throw new Error('No user is logged in.');

          // Update username or avatar
          if (fields.username || fields.avatar) {
            await updateProfile(currentUser, {
              displayName: fields.username || currentUser.displayName,
              photoURL: fields.avatar || currentUser.photoURL,
            });
          }

          // Update email
          if (fields.email) {
            await updateEmail(currentUser, fields.email);
          }

          // Update password
          if (fields.password) {
            await updatePassword(currentUser, fields.password);
          }

          // Update local state to match
          set((state) => ({
            user: { ...state.user, ...fields },
            loading: false,
          }));

          return { success: true };
        } catch (err) {
          let message = err.message;
          if (err.code === 'auth/requires-recent-login')
            message = 'Please log out and log in again before changing email or password.';
          if (err.code === 'auth/invalid-email')
            message = 'Invalid email address.';
          if (err.code === 'auth/weak-password')
            message = 'Password must be at least 6 characters.';
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },
      /** Log out — clears everything. */
      logout: async () => {
        const { signOut } = await import('firebase/auth');
        const { auth } = await import('../firebase/firebase');
        await signOut(auth);
        set({ user: null, sessionId: null, accountId: null, error: null });

        // Clear wishlist on logout
        const useWishlistStore = await import('./wishlistStore');
        useWishlistStore.default.getState().clearWishlist();
      },

      // ── TMDB AUTH (BONUS) ───────────────────────────────────

      /**
       * Step 1 – get a request token from TMDB.
       * Returns the token string so the caller can redirect the user.
       */
      requestTmdbToken: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `${TMDB_BASE}/authentication/token/new?api_key=${TMDB_API_KEY}`
          );
          const data = await res.json();
          if (!data.success) throw new Error('Failed to get TMDB token.');
          set({ loading: false });
          return data.request_token;
        } catch (err) {
          set({ error: err.message, loading: false });
          return null;
        }
      },

      /**
       * Step 2 – validate token with username+password (server-side flow).
       * Alternative to the redirect flow.
       */
      validateTmdbToken: async ({ username, password, requestToken }) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `${TMDB_BASE}/authentication/token/validate_with_login?api_key=${TMDB_API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username,
                password,
                request_token: requestToken,
              }),
            }
          );
          const data = await res.json();
          if (!data.success) throw new Error(data.status_message || 'Validation failed.');
          set({ loading: false });
          return data.request_token;
        } catch (err) {
          set({ error: err.message, loading: false });
          return null;
        }
      },

      /**
       * Step 3 – exchange validated request token for a session_id.
       * Also fetches TMDB account info and stores accountId.
       */
      createTmdbSession: async (requestToken) => {
        set({ loading: true, error: null });
        try {
          // Create session
          const sessionRes = await fetch(
            `${TMDB_BASE}/authentication/session/new?api_key=${TMDB_API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ request_token: requestToken }),
            }
          );
          const sessionData = await sessionRes.json();
          if (!sessionData.success)
            throw new Error(sessionData.status_message || 'Session creation failed.');

          const sessionId = sessionData.session_id;

          // Fetch account info
          const accountRes = await fetch(
            `${TMDB_BASE}/account?api_key=${TMDB_API_KEY}&session_id=${sessionId}`
          );
          const accountData = await accountRes.json();

          const user = {
            id: accountData.id?.toString(),
            username: accountData.username,
            email: accountData.email || '',
            avatar: accountData.avatar?.tmdb?.avatar_path
              ? `https://image.tmdb.org/t/p/w200${accountData.avatar.tmdb.avatar_path}`
              : null,
          };

          set({
            sessionId,
            accountId: accountData.id,
            user,
            loading: false,
          });
          return { success: true };
        } catch (err) {
          set({ error: err.message, loading: false });
          return { success: false, error: err.message };
        }
      },

      // ── Convenience getters ────────────────────────────────
      isLoggedIn: () => !!get().user,
    }),

    {
      name: 'tmdb-auth',          // localStorage key
      partialize: (state) => ({   // only persist these fields
        user: state.user,
        sessionId: state.sessionId,
        accountId: state.accountId,
      }),
    }
  )
);

export default useAuthStore;
