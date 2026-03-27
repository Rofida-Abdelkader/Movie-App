import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useToast from '../hooks/useToast';

const Login = () => {
  const toast = useToast();
  const [form, setForm] = useState({ username: '', password: '' })
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuthStore();
  const handleChange = (e) => {
    clearError();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));
    console.log("savedUser:", savedUser);
    console.log("form:", form);
    if (
      !savedUser ||
      savedUser.username !== form.username ||
      savedUser.password !== form.password
    ) {
      toast.error("Invalid credentials");
      return;
    }

    const result = await login({
      username: form.username,
      password: form.password,
      email: savedUser.email,
    });

    if (result.success) {
      toast.success('Welcome back! 👋');
      navigate('/');
    } else {
      toast.error(result.error || 'Login failed.');
    }
  };

  // ── TMDB login with token (bonus) ─────────────────────────────
  const handleTmdbLogin = async () => {
    const { requestTmdbToken, validateTmdbToken, createTmdbSession } =
      useAuthStore.getState();

    // Server-side flow: validate with username + password
    const requestToken = await requestTmdbToken();
    if (!requestToken) { toast.error('Could not reach TMDB.'); return; }

    const validatedToken = await validateTmdbToken({
      username: form.username,
      password: form.password,
      requestToken,
    });
    if (!validatedToken) { toast.error('Invalid TMDB credentials.'); return; }

    const result = await createTmdbSession(validatedToken);
    if (result.success) {
      toast.success('Logged in via TMDB! 🎬');
      navigate('/');
    } else {
      toast.error(result.error || 'TMDB session failed.');
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto px-10 py-8 font-sans text-[#000] dark:text-white">
      <h2 className="text-[1.5rem] font-bold mb-4">Login to your account</h2>

      <div className="text-[1.1rem] leading-snug space-y-4 mb-8">
        <p>
          In order to use the editing and rating capabilities of TMDB, as well as
          get personal recommendations you will need to login to your account. If
          you do not have an account, registering for an account is free and
          simple.{' '}
          <Link to="/register" className="text-[#01b4e4] hover:underline">
            Click here
          </Link>{' '}
          to get started.
        </p>
        <p>
          If you signed up but didn't get your verification email,{' '}
          <Link to="/reset-password" className="text-[#01b4e4] hover:underline">
            click here
          </Link>{' '}
          to have it resent.
        </p>
      </div>

      {/* ── Error banner ──────────────────────────────────────── */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-[4px] text-sm">
          {error}
        </div>
      )}

      <form className="max-w-full space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-[16px]">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4] transition-all"
          />
        </div>

        <div>
          <label className="block mb-1 text-[16px]">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4] transition-all"
          />
        </div>

        <div className="flex items-center gap-6 pt-2 flex-wrap">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#01b4e4] text-white px-5 py-1.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>

          <Link
            to="/reset-password"
            className="text-[#01b4e4] hover:underline text-[16px]"
          >
            Reset password
          </Link>

          {/* ── BONUS: TMDB login button ──────────────────────── */}
          <button
            type="button"
            onClick={handleTmdbLogin}
            disabled={loading}
            className="ml-auto text-sm text-gray-500 hover:text-[#01b4e4] underline transition-colors disabled:opacity-60"
          >
            Login with TMDB account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
