import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div className="max-w-[1300px] mx-auto px-10 py-10 font-sans text-[#000]">
      <h2 className="text-[1.5rem] font-bold mb-2">Resend activation email</h2>
      <p className="text-[1.1rem] mb-8 opacity-90">
        Missing your account verification email? Enter your email below to have it resent.
      </p>

      <form className="space-y-6">
        <div>
          <label className="block mb-1 text-[16px]">Email</label>
          <input 
            type="email" 
            placeholder="What's your email?"
            className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4] placeholder:text-gray-400 italic" 
          />
        </div>

        <div className="flex items-center gap-6 pt-2">
          <button 
            type="submit" 
            className="bg-[#01b4e4] text-white px-5 py-1.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-sm disabled:opacity-50"
          >
            Send
          </button>
          <Link to="/login" className="text-[#01b4e4] hover:underline text-[16px]">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;