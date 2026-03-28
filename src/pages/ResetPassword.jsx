import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    const savedUserStr = localStorage.getItem("user");
    if (savedUserStr) {
      const savedUser = JSON.parse(savedUserStr);
      if (savedUser.email === email) {
        setStep(2);
        return;
      }
    }
    toast.error(t('reset_pass.no_account'));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      toast.error(t('reset_pass.pass_min'));
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t('reset_pass.pass_mismatch'));
      return;
    }

    const savedUserStr = localStorage.getItem("user");
    if (savedUserStr) {
      const savedUser = JSON.parse(savedUserStr);
      savedUser.password = newPassword;
      localStorage.setItem("user", JSON.stringify(savedUser));
      toast.success(t('reset_pass.success'));
      navigate('/login');
    } else {
      toast.error(t('reset_pass.error'));
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto px-10 py-10 font-sans text-[#000] dark:text-white rtl:text-right">
      <h2 className="text-[1.5rem] font-bold mb-2">{t('reset_pass.title')}</h2>
      <p className="text-[1.1rem] mb-8 opacity-90">
        {step === 1 ? t('reset_pass.enter_email') : t('reset_pass.enter_new')}
      </p>

      {step === 1 ? (
        <form className="space-y-6 max-w-[500px]" onSubmit={handleVerifyEmail}>
          <div>
            <label className="block mb-1 text-[16px] text-gray-700 dark:text-gray-300 text-left rtl:text-right">{t('reset_pass.email_label')}</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t('reset_pass.email_placeholder')}
              className="w-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0d141e] rounded-[4px] p-2 outline-none focus:border-[#01b4e4] placeholder:text-gray-400 rtl:text-right text-black dark:text-white transition-all" 
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <button 
              type="submit" 
              className="bg-[#01b4e4] text-white px-5 py-1.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-sm disabled:opacity-50"
            >
              {t('reset_pass.verify')}
            </button>
            <Link to="/login" className="text-[#01b4e4] hover:underline text-[16px]">
              {t('reset_pass.cancel')}
            </Link>
          </div>
        </form>
      ) : (
        <form className="space-y-6 max-w-[500px]" onSubmit={handleResetPassword}>
          <div>
            <label className="block mb-1 text-[16px] text-gray-700 dark:text-gray-300 text-left rtl:text-right">{t('reset_pass.new_pass')}</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={4}
              className="w-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0d141e] rounded-[4px] p-2 outline-none focus:border-[#01b4e4] rtl:text-right text-black dark:text-white transition-all" 
            />
          </div>
          <div>
            <label className="block mb-1 text-[16px] text-gray-700 dark:text-gray-300 text-left rtl:text-right">{t('reset_pass.confirm_pass')}</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0d141e] rounded-[4px] p-2 outline-none focus:border-[#01b4e4] rtl:text-right text-black dark:text-white transition-all" 
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <button 
              type="submit" 
              className="bg-[#01b4e4] text-white px-5 py-1.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-sm disabled:opacity-50"
            >
              {t('reset_pass.title')}
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="text-[#01b4e4] hover:underline text-[16px]"
            >
              {t('reset_pass.back')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;