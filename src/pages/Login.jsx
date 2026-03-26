import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="max-w-[1300px] mx-auto px-10 py-8 font-sans text-[#000]">
      <h2 className="text-[1.5rem] font-bold mb-4">Login to your account</h2>
      
      <div className="text-[1.1rem] leading-snug space-y-4 mb-8">
        <p>
          In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account is free and simple. <Link to="/register" className="text-[#01b4e4] hover:underline">Click here</Link> to get started.
        </p>
        <p>
          If you signed up but didn't get your verification email, <Link to="/reset-password" className="text-[#01b4e4] hover:underline">click here</Link> to have it resent.
        </p>
      </div>

      <form className="max-w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block mb-1 text-[16px]">Username</label>
          <input 
            type="text" 
            className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4] transition-all" 
          />
        </div>
        
        <div>
          <label className="block mb-1 text-[16px]">Password</label>
          <input 
            type="password" 
            className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4] transition-all" 
          />
        </div>

        <div className="flex items-center gap-6 pt-2">
          <button 
            type="submit" 
            className="bg-[#01b4e4] text-white px-5 py-1.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-sm"
          >
            Login
          </button>
          {/* هنا التعديل الأساسي لربط صفحة الريسيت */}
          <Link to="/reset-password" className="text-[#01b4e4] hover:underline text-[16px]">
            Reset password
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;