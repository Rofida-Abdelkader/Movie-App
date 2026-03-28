import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaRegHeart } from 'react-icons/fa';
import MovieCard from '../components/MovieCard';
import useWishlistStore from '../store/wishlistStore';
import useAuthStore from '../store/authStore';
import useToast from '../hooks/useToast';
import { useTranslation } from 'react-i18next';

const Wishlist = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { user } = useAuthStore();

  const handleRemove = (movie) => {
    removeFromWishlist(movie.id);
    toast.info(`"${movie.title || movie.name}" ${t('wishlist.removed')}`);
  };

  return (
    <div className="max-w-[1300px] mx-auto px-10 py-10 font-sans min-h-[60vh] rtl:text-right">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex justify-between items-center mb-8 border-b pb-4 border-gray-200 dark:border-gray-800 transition-colors">
        <div>
          <h2 className="text-[1.8rem] font-bold text-[#000] dark:text-white transition-colors">
            {t('wishlist.title')}
          </h2>
          {user && (
            <p className="text-gray-400 text-sm mt-0.5">{user.username}</p>
          )}
        </div>
        <span className="bg-[#01b4e4] text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          {wishlist.length} {wishlist.length === 1 ? t('wishlist.item') : t('wishlist.items')}
        </span>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      {wishlist.length > 0 ? (
        <>
          {/* Clear all button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                clearWishlist();
                toast.info(t('wishlist.cleared'));
              }}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors underline rtl:ml-0 rtl:mr-auto"
            >
              {t('wishlist.clear_all')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {wishlist.map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} />

                {/* Remove button — appears on hover */}
                <button
                  title="Remove from wishlist"
                  onClick={() => handleRemove(movie)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 z-10 rtl:right-auto rtl:left-2"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* ── Empty State ──────────────────────────────────────── */
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <div className="bg-gray-100 dark:bg-gray-800 p-10 rounded-full mb-6 transition-colors">
            <FaRegHeart size={60} className="text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-300">
            {t('wishlist.empty')}
          </h3>
          <p className="mb-8 text-gray-400">
            {t('wishlist.empty_desc')}
          </p>
          <Link
            to="/"
            className="bg-[#01b4e4] text-white px-10 py-3 rounded-[4px] font-bold hover:bg-[#081c22] transition-all shadow-md hover:shadow-lg active:transform active:scale-95"
          >
            {t('wishlist.browse')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
