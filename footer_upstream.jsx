import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#032541] py-20 mt-auto w-full">
      <div className="max-w-[1300px] mx-auto px-8 flex flex-col md:flex-row items-start justify-center gap-16">
        
        {/* === Left Side: Simple & Clean Typography Logo === */}
        <div className="flex flex-col items-end gap-10 shrink-0">
          
          {}
          <div className="flex flex-col text-[40px] font-extrabold uppercase leading-[0.9] tracking-tighter italic">
            {}
            <span className="text-[#1ed5a9]">The</span>
            {}
            <span className="text-[#01b4e4]">Movie</span>
            {}
            <span className="text-[#01b4e4] opacity-80">DB</span>
          </div>

          <button className="bg-white text-[#01b4e4] font-bold py-3 px-6 rounded-md hover:bg-[#01b4e4] hover:text-white transition-all uppercase tracking-wider text-sm">
            Join the Community
          </button>
        </div>

        {/* === Right Side: Links Columns === */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-white">
          {/* Column 1: The Basics */}
          <div>
            <h3 className="font-bold text-xl uppercase mb-3">The Basics</h3>
            <ul className="space-y-1 text-lg font-normal opacity-90">
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">About TMDB</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">Support Forums</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">API</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">System Status</li>
            </ul>
          </div>

          {/* Column 2: Get Involved */}
          <div>
            <h3 className="font-bold text-xl uppercase mb-3">Get Involved</h3>
            <ul className="space-y-1 text-lg font-normal opacity-90">
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">Contribution Bible</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">Add New Movie</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">Add New TV Show</li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div>
            <h3 className="font-bold text-xl uppercase mb-3">Community</h3>
            <ul className="space-y-1 text-lg font-normal opacity-90">
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">Guidelines</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">Discussions</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">Leaderboard</li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-bold text-xl uppercase mb-3">Legal</h3>
            <ul className="space-y-1 text-lg font-normal opacity-90">
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">Terms of Use</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">API Terms of Use</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">DMCA Policy</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Build Info */}
      <div className="mt-16 text-center text-white/20 text-[10px] font-semibold">
        Build f115a4f (9934)
      </div>
    </footer>
  );
};

export default Footer;
