import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';

const ResetPassword = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
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
    toast.error('No account found with that email.');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      toast.error('Password must be at least 4 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const savedUserStr = localStorage.getItem("user");
    if (savedUserStr) {
      const savedUser = JSON.parse(savedUserStr);
      savedUser.password = newPassword;
      localStorage.setItem("user", JSON.stringify(savedUser));
      toast.success('Password reset successfully! Please login.');
      navigate('/login');
    } else {
      toast.error('Error resetting password.');
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto px-10 py-10 font-sans text-[#000] dark:text-white">
      <h2 className="text-[1.5rem] font-bold mb-2">Reset Password</h2>
      <p className="text-[1.1rem] mb-8 opacity-90">
        {step === 1 ? 'Enter your email to reset your password.' : 'Enter your new password.'}
      </p>

      {step === 1 ? (
        <form className="space-y-6 max-w-[500px]" onSubmit={handleVerifyEmail}>
          <div>
            <label className="block mb-1 text-[16px]">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="What's your email?"
              className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4] placeholder:text-gray-400" 
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <button 
              type="submit" 
              className="bg-[#01b4e4] text-white px-5 py-1.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-sm disabled:opacity-50"
            >
              Verify Email
            </button>
            <Link to="/login" className="text-[#01b4e4] hover:underline text-[16px]">
              Cancel
            </Link>
          </div>
        </form>
      ) : (
        <form className="space-y-6 max-w-[500px]" onSubmit={handleResetPassword}>
          <div>
            <label className="block mb-1 text-[16px]">New Password</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={4}
              className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4]" 
            />
          </div>
          <div>
            <label className="block mb-1 text-[16px]">Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4]" 
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <button 
              type="submit" 
              className="bg-[#01b4e4] text-white px-5 py-1.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-sm disabled:opacity-50"
            >
              Reset Password
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="text-[#01b4e4] hover:underline text-[16px]"
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;