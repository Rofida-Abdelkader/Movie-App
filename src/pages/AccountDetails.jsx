import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useWishlistStore from '../store/wishlistStore';
import useToast from '../hooks/useToast';
import { useTranslation } from 'react-i18next';

const AccountDetails = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();

  const { user, logout, updateAccount, loading } = useAuthStore();
  const { clearWishlist } = useWishlistStore();

  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'password'

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePasswordChange = (e) =>
    setPasswordForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    const result = await updateAccount({ username: form.username, email: form.email });
    if (result.success) {
      toast.success(t('account.details_updated'));
    } else {
      toast.error(result.error || t('account.update_failed'));
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword.length < 4) {
      toast.error(t('account.pass_min_char'));
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error(t('account.pass_mismatch'));
      return;
    }

    // Verify current password from local storage (mock back-end)
    const savedUserStr = localStorage.getItem("user");
    if (savedUserStr) {
      const savedUser = JSON.parse(savedUserStr);
      if (savedUser.password && savedUser.password !== passwordForm.currentPassword) {
        toast.error(t('account.pass_incorrect'));
        return;
      }

      // Store the new password in local storage
      savedUser.password = passwordForm.newPassword;
      localStorage.setItem("user", JSON.stringify(savedUser));
    }

    const result = await updateAccount({ password: passwordForm.newPassword });
    if (result.success) {
      toast.success(t('account.pass_changed'));
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      toast.error(result.error || t('account.pass_change_failed'));
    }
  };

  const handleLogout = () => {
    logout();
    clearWishlist();
    localStorage.removeItem("user");
    toast.info(t('account.logged_out'));
    navigate('/');
  };

  const inputCls =
    'w-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0d141e] rounded-[4px] p-2 outline-none focus:border-[#01b4e4] transition-all text-[15px] text-black dark:text-white rtl:text-right';

  return (
    <div className="font-sans pb-10 min-h-screen bg-transparent">
      {/* ── Banner/Header TMDB Style ──────────────────────────────── */}
      <div className="w-full bg-[#032541] relative shadow-md">
        <div className="max-w-[1300px] mx-auto px-6 py-10 md:py-16 flex items-center gap-6">
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-[#01b4e4] flex items-center justify-center text-white text-4xl md:text-6xl font-bold shadow-xl shrink-0 overflow-hidden border-4 border-[#032541] hover:scale-105 transition-transform duration-300">
            {user.avatar
              ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
              : user.username?.[0]?.toUpperCase() || '?'
            }
          </div>
          <div className="text-white rtl:text-right">
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-tight flex items-center gap-3">
              {user.username}
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-1 font-semibold ">
              {t('account.member_since')} {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
        {/* ── Sidebar TMDB Style ──────────────────────────────────────── */}
        <div className="w-full md:w-[260px] shrink-0">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-[#0d253f]">
            <div className="bg-[#01b4e4] px-5 py-4 text-white font-bold text-[1.2rem] flex items-center gap-2 rtl:text-right">
              {t('account.settings')}
            </div>
            <ul className="flex flex-col py-2">
              <li
                onClick={() => setActiveTab('details')}
                className={`px-5 py-3 cursor-pointer transition-all border-l-4 rtl:border-r-4 rtl:border-l-0 ${activeTab === 'details'
                  ? 'border-[#01b4e4] font-bold bg-gray-100 dark:bg-gray-800 text-[#000] dark:text-white'
                  : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
              >
                {t('account.edit_profile')}
              </li>
              <li
                onClick={() => setActiveTab('password')}
                className={`px-5 py-3 cursor-pointer transition-all border-l-4 rtl:border-r-4 rtl:border-l-0 ${activeTab === 'password'
                  ? 'border-[#01b4e4] font-bold bg-gray-100 dark:bg-gray-800 text-[#000] dark:text-white'
                  : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
              >
                {t('account.change_password')}
              </li>
              <li
                className="px-5 py-3 mt-2 border-t border-l-4 rtl:border-r-4 rtl:border-l-0 border-transparent border-t-gray-100 dark:border-t-gray-800 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-red-500 font-bold"
                onClick={handleLogout}
              >
                {t('account.logout')}
              </li>
            </ul>
          </div>
        </div>

        {/* ── Main Content Area ────────────────────────────────────── */}
        <div className="flex-1 bg-white dark:bg-[#0d253f] border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-8 max-w-[800px] rtl:text-right">
          <h2 className="text-[1.8rem] font-bold mb-6 text-[#000] dark:text-white pb-3 border-b border-gray-100 dark:border-gray-700">
            {activeTab === 'details' ? t('account.edit_profile') : t('account.change_password')}
          </h2>

          {/* Account Details Tab */}
          {activeTab === 'details' && (
            <form className="space-y-6" onSubmit={handleSaveDetails}>
              <div>
                <label className="block mb-2 text-[15px] font-medium text-gray-700 dark:text-gray-300">{t('account.username')}</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className={inputCls}
                />
              </div>
              <div className="pb-4">
                <label className="block mb-2 text-[15px] font-medium text-gray-700 dark:text-gray-300">{t('account.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputCls}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#01b4e4] text-white px-8 py-2.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-md disabled:opacity-60 rtl:ml-auto"
              >
                {loading ? t('account.saving') : t('account.save_changes')}
              </button>
            </form>
          )}

          {/* Change Password Tab */}
          {activeTab === 'password' && (
            <form className="space-y-6" onSubmit={handleSavePassword}>
              <div>
                <label className="block mb-2 text-[15px] font-medium text-gray-700 dark:text-gray-300">{t('account.current_password')}</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className={inputCls}
                />
              </div>
              <div className="pt-2">
                <label className="block mb-2 text-[15px] font-medium text-gray-700 dark:text-gray-300">{t('account.new_password')}</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={4}
                  className={inputCls}
                />
              </div>
              <div className="pb-4">
                <label className="block mb-2 text-[15px] font-medium text-gray-700 dark:text-gray-300">{t('account.confirm_new_password')}</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  className={`${inputCls} ${passwordForm.confirmPassword &&
                    passwordForm.newPassword !== passwordForm.confirmPassword
                    ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                    : ''
                    }`}
                />
                {passwordForm.confirmPassword &&
                  passwordForm.newPassword !== passwordForm.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1 font-bold">{t('account.pass_mismatch')}</p>
                  )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#01b4e4] text-white px-8 py-2.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-md disabled:opacity-60 rtl:ml-auto"
              >
                {loading ? t('account.updating') : t('account.update_password')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
