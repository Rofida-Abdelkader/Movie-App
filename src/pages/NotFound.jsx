import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    // Main container: centering content vertically and horizontally
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-background transition-colors duration-300">
      
      {/* 404 Error Number: Using TMDB primary blue color */}
      <h1 className="text-9xl font-black text-[#01b4e4] drop-shadow-md animate-pulse">
        404
      </h1>
      
      {/* Error Message Section */}
      <div className="mt-4">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          Oops! Page Not Found
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      {/* Navigation Button: Styled with the site's signature gradient */}
      <Link
        to="/"
        className="mt-8 px-8 py-3 bg-gradient-to-r from-[#1ed5a9] to-[#01b4e4] text-[#032541] font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
      >
        Back to Home
      </Link>

      {/* Background Decoration: Subtle logo watermark */}
      <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none overflow-hidden">
        <div className="w-full h-full bg-[url('https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537ca28a4c51f7213d81c2f02015682.svg')] bg-no-repeat bg-center bg-contain scale-150"></div>
      </div>
    </div>
  );
};

export default NotFound;