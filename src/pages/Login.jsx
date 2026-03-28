import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useToast from '../hooks/useToast';
import { useTranslation } from 'react-i18next';
const Login = () => {
  const { t } = useTranslation();
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
    if (
      !savedUser ||
      savedUser.username !== form.username ||
      savedUser.password !== form.password
    ) {
      toast.error(t("login.invalid_credentials"));
      return;
    }

    const result = await login({
      username: form.username,
      password: form.password,
      email: savedUser.email,
    });

    if (result.success) {
      toast.success(t("login.welcome_back"));
      navigate('/');
    } else {
      toast.error(result.error || t("login.login_failed"));
    }
  };

  // ── TMDB login with token (bonus) ─────────────────────────────
  const handleTmdbLogin = async () => {
    const { requestTmdbToken, validateTmdbToken, createTmdbSession } =
      useAuthStore.getState();

    // Server-side flow: validate with username + password
    const requestToken = await requestTmdbToken();
    if (!requestToken) { toast.error(t("login.could_not_reach_tmdb")); return; }

    const validatedToken = await validateTmdbToken({
      username: form.username,
      password: form.password,
      requestToken,
    });
    if (!validatedToken) { toast.error(t("login.invalid_tmdb_credentials")); return; }

    const result = await createTmdbSession(validatedToken);
    if (result.success) {
      toast.success(t("login.logged_in_via_tmdb"));
      navigate('/');
    } else {
      toast.error(result.error || t("login.tmdb_session_failed"));
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto px-10 py-8 font-sans text-[#000] dark:text-white">
      <h2 className="text-[1.5rem] font-bold mb-4">{t("login.title")}</h2>

      <div className="text-[1.1rem] leading-snug space-y-4 mb-8">
        <p>
          {t("login.description_1")}
          <Link to="/register" className="text-[#01b4e4] hover:underline">
            {t("login.click_here")}
          </Link>{' '}
          {t("login.to_get_started")}
        </p>
        <p>
          {t("login.description_2")}
          <Link to="/reset-password" className="text-[#01b4e4] hover:underline">
            {t("login.click_here")}
          </Link>{' '}
          {t("login.to_have_it_resent")}
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
          <label className="block mb-1 text-[16px] text-gray-700 dark:text-gray-300">{t("login.username")}</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0d141e] rounded-[4px] p-2 outline-none focus:border-[#01b4e4] transition-all text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-[16px] text-gray-700 dark:text-gray-300">{t("login.password")}</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0d141e] rounded-[4px] p-2 outline-none focus:border-[#01b4e4] transition-all text-black dark:text-white"
          />
        </div>

        <div className="flex items-center gap-6 pt-2 flex-wrap">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#01b4e4] text-white px-5 py-1.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? t("login.logging_in") : t("login.login")}
          </button>

          <Link
            to="/reset-password"
            className="text-[#01b4e4] hover:underline text-[16px]"
          >
            {t("login.reset_password")}
          </Link>

          {/* ── BONUS: TMDB login button ──────────────────────── */}
          <button
            type="button"
            onClick={handleTmdbLogin}
            disabled={loading}
            className="ml-auto text-sm text-gray-500 dark:text-gray-400 hover:text-[#01b4e4] underline transition-colors disabled:opacity-60"
          >
            {t("login.login_with_tmdb")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
