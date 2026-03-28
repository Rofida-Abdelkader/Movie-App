import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useToast from '../hooks/useToast';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const { register, loading, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const benefits = [
    t('register.benefit_1'),
    t('register.benefit_2'),
    t('register.benefit_3'),
    t('register.benefit_4'),
    t('register.benefit_5'),
    t('register.benefit_6'),
    t('register.benefit_7'),
  ];

  const handleChange = (e) => {
    clearError();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (form.password !== form.confirmPassword) {
      toast.error(t('register.pass_mismatch'));
      return;
    }
    if (form.password.length < 6) {
      toast.error(t('register.pass_min'));
      return;
    }

    const result = await register({
      username: form.username,
      email: form.email,
      password: form.password,
    });

    if (result.success) {
      localStorage.setItem("user", JSON.stringify({
        username: form.username,
        password: form.password,
        email: form.email
      }));
      toast.success(t('register.account_created'));
      navigate('/');
    } else {
      toast.error(result.error || t('register.reg_failed'));
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto px-10 py-10 flex flex-col md:flex-row gap-10 font-sans rtl:text-right">
      {/* Sidebar – Benefits */}
      <div className="w-full md:w-[300px] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm h-fit bg-white dark:bg-[#0d253f]">
        <div className="bg-[#01b4e4] text-white p-5">
          <h3 className="text-[1.2rem] font-bold text-left rtl:text-right">{t('register.benefits_title')}</h3>
        </div>
        <div className="p-5 space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-3 text-[15px] text-[#000] dark:text-white transition-colors">
              <span className="font-bold text-[18px] text-[#01b4e4]">✓</span>
              <p>{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 text-[#000] dark:text-white">
        <h2 className="text-[1.5rem] font-bold mb-2 text-left rtl:text-right">{t('register.title')}</h2>
        <p className="mb-8 opacity-90 text-left rtl:text-right">
          {t('register.subtitle')}
        </p>

        {/* ── Error banner ──────────────────────────────────── */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-[4px] text-sm text-left rtl:text-right">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-left rtl:text-right text-gray-700 dark:text-gray-300">{t('register.username')}</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0d141e] rounded-[4px] p-2 outline-none focus:border-[#01b4e4] rtl:text-right text-black dark:text-white transition-all"
            />
          </div>

          <div>
            <label className="block mb-1 text-left rtl:text-right text-gray-700 dark:text-gray-300">{t('register.password')}</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0d141e] rounded-[4px] p-2 outline-none focus:border-[#01b4e4] rtl:text-right text-black dark:text-white transition-all"
            />
          </div>

          <div>
            <label className="block mb-1 text-left rtl:text-right text-gray-700 dark:text-gray-300">{t('register.confirm_password')}</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full border rounded-[4px] p-2 outline-none focus:border-[#01b4e4] transition-all rtl:text-right text-black dark:text-white ${form.confirmPassword && form.password !== form.confirmPassword
                ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0d141e]'
                }`}
            />
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 text-left rtl:text-right font-bold">{t('register.pass_mismatch')}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-left rtl:text-right text-gray-700 dark:text-gray-300">{t('register.email')}</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0d141e] rounded-[4px] p-2 outline-none focus:border-[#01b4e4] rtl:text-right text-black dark:text-white transition-all"
            />
          </div>

          <p className="text-[14px] text-gray-500 italic leading-relaxed text-left rtl:text-right">
            {t('register.terms')}
          </p>

          <div className="flex items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#01b4e4] text-white px-5 py-1.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? t('register.creating_account') : t('register.sign_up')}
            </button>
            <Link to="/" className="text-[#01b4e4] hover:underline">
              {t('register.cancel')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
