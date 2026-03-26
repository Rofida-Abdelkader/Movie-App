import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const benefits = [
    "Find something to watch on your subscribed streaming services",
    "Log the movies and TV shows you have watched",
    "Keep track of your favourite movies and TV shows and get recommendations from them",
    "Build and maintain a personal watchlist",
    "Build custom mixed lists (movies and TV)",
    "Take part in movie and TV discussions",
    "Contribute to, and improve the information in our database"
  ];

  return (
    <div className="max-w-[1300px] mx-auto px-10 py-10 flex flex-col md:flex-row gap-10 font-sans">
      {/* Sidebar - Benefits */}
      <div className="w-full md:w-[300px] border border-gray-200 rounded-xl overflow-hidden shadow-sm h-fit">
        <div className="bg-[#01b4e4] text-white p-5">
          <h3 className="text-[1.2rem] font-bold">Benefits of being a member</h3>
        </div>
        <div className="p-5 space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-3 text-[15px] text-[#000]">
              <span className="font-bold text-[18px]">✓</span>
              <p>{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 text-[#000]">
        <h2 className="text-[1.5rem] font-bold mb-2">Sign up for an account</h2>
        <p className="mb-8 opacity-90">
          Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is required to continue.
        </p>
        
        <form className="space-y-6">
          <div>
            <label className="block mb-1">Username</label>
            <input type="text" className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4]" />
          </div>
          
          <div>
            <label className="block mb-1">Password (4 characters minimum)</label>
            <input type="password" className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4]" />
          </div>

          <div>
            <label className="block mb-1">Password Confirm</label>
            <input type="password" className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4]" />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-[4px] p-2 outline-none focus:border-[#01b4e4]" />
          </div>

          <p className="text-[14px] text-gray-500 italic leading-relaxed">
            By clicking the "Sign up" button below, I certify that I have read and agree to the TMDB terms of use and privacy policy.
          </p>

          <div className="flex items-center gap-6 pt-2">
            <button className="bg-[#01b4e4] text-white px-5 py-1.5 rounded-[4px] font-bold hover:bg-[#081c22] transition-colors shadow-sm">
              Sign Up
            </button>
            <Link to="/" className="text-[#01b4e4] hover:underline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;