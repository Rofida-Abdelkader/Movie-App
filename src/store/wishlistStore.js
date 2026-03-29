import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './authStore';

/**
 * WISHLIST STORE
 * ──────────────────────────────────────────────────────────────
 * Handles:
 *  • Local wishlist  (add / remove / toggle / clear)
 *  • TMDB Favorites API sync  (when user has a real session_id)
 *
 * Usage:
 *   const { wishlist, toggleWishlist, isWishlisted } = useWishlistStore();
 *
 * The wishlist is an array of movie objects:
 *   { id, title, poster_path, vote_average, media_type? }
 * ──────────────────────────────────────────────────────────────
 */

const TMDB_API_KEY = "5e2343a149dc636e6c5398bf90b319dd"; // Replace with your actual API key
const TMDB_BASE    = 'https://api.themoviedb.org/3';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────
      wishlist: [],   // array of movie/show objects
      loading:  false,
      error:    null,

      // ── Selectors ──────────────────────────────────────────

      /** Returns true if a movie is in the wishlist. */
      isWishlisted: (movieId) =>
        get().wishlist.some((m) => m.id === movieId),

      /** Total count — use this for the Navbar counter. */
      count: () => get().wishlist.length,

      // ── LOCAL ACTIONS ───────────────────────────────────────

      /** Add a movie to the wishlist (no-op if already there). */
      addToWishlist: (movie) => {
        if (get().isWishlisted(movie.id)) return;
        set((state) => ({ wishlist: [movie, ...state.wishlist] }));
      },

      /** Remove a movie from the wishlist. */
      removeFromWishlist: (movieId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((m) => m.id !== movieId),
        }));
      },

      /**
       * Toggle a movie in/out of the wishlist.
       * Also syncs with TMDB Favorites API if the user has a session.
       * Returns 'added' | 'removed'.
       */
      toggleWishlist: async (movie) => {
        const alreadyIn = get().isWishlisted(movie.id);

        if (alreadyIn) {
          get().removeFromWishlist(movie.id);
        } else {
          get().addToWishlist(movie);
        }

        // ── TMDB Favorites sync (bonus) ──────────────────────
        const { sessionId, accountId } = useAuthStore.getState();
        if (sessionId && accountId) {
          await get().syncFavoriteToTmdb({
            movieId:   movie.id,
            mediaType: movie.media_type || 'movie',
            favorite:  !alreadyIn,
          });
        }

        return alreadyIn ? 'removed' : 'added';
      },

      /** Clear the entire wishlist. */
      clearWishlist: () => set({ wishlist: [] }),

      // ── TMDB FAVORITES API (BONUS) ──────────────────────────

      /**
       * Mark / unmark a movie as a TMDB favorite.
       * Requires: sessionId + accountId in authStore.
       */
      syncFavoriteToTmdb: async ({ movieId, mediaType = 'movie', favorite }) => {
        const { sessionId, accountId } = useAuthStore.getState();
        if (!sessionId || !accountId) return;

        try {
          await fetch(
            `${TMDB_BASE}/account/${accountId}/favorite?api_key=${TMDB_API_KEY}&session_id=${sessionId}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                media_type: mediaType,
                media_id:   movieId,
                favorite,
              }),
            }
          );
        } catch (err) {
          console.error('[TMDB] syncFavorite error:', err);
        }
      },

      /**
       * Fetch the user's TMDB favorites list and merge into local wishlist.
       * Call this once after TMDB login to hydrate the wishlist.
       */
      fetchTmdbFavorites: async (mediaType = 'movie') => {
        const { sessionId, accountId } = useAuthStore.getState();
        if (!sessionId || !accountId) return;

        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `${TMDB_BASE}/account/${accountId}/favorite/${mediaType}s` +
            `?api_key=${TMDB_API_KEY}&session_id=${sessionId}&sort_by=created_at.desc`
          );
          const data = await res.json();
          const results = (data.results || []).map((m) => ({
            ...m,
            media_type: mediaType,
          }));

          // Merge without duplicates
          set((state) => {
            const existingIds = new Set(state.wishlist.map((m) => m.id));
            const newItems    = results.filter((m) => !existingIds.has(m.id));
            return { wishlist: [...newItems, ...state.wishlist], loading: false };
          });
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      /**
       * Full sync: fetch both movies AND TV favorites from TMDB.
       */
      fetchAllTmdbFavorites: async () => {
        await get().fetchTmdbFavorites('movie');
        await get().fetchTmdbFavorites('tv');
      },
    }),

    {
      name: 'tmdb-wishlist',         // localStorage key
      partialize: (state) => ({
        wishlist: state.wishlist,    // only persist the wishlist array
      }),
    }
  )
);

export default useWishlistStore;
