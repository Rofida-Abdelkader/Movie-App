import useAuthStore from '@/store/authStore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <footer className="bg-[#032541] py-10 md:py-20 mt-auto w-full">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-16">

        {/* === Left Side === */}
        <div className="flex flex-col items-center md:items-end gap-6 md:gap-10 shrink-0">
          <div className="flex flex-col text-[32px] md:text-[40px] font-extrabold uppercase leading-[0.9] tracking-tighter italic text-center md:text-right">
            <span className="text-[#1ed5a9]">{t('footer.the')}</span>
            <span className="text-[#01b4e4]">{t('footer.movie')}</span>
            <span className="text-[#01b4e4] opacity-80">{t('footer.db')}</span>
          </div>
          {user ? (
            <button className="bg-[#01b4e4] text-white font-bold py-3 px-6 rounded-md hover:bg-white hover:text-[#01b4e4] transition-all uppercase tracking-wider text-sm">
              {t('home.welcome') + " " + user.username}
            </button>
          ) : (
            <button onClick={() => navigate('/register')} className="bg-[#01b4e4] text-white font-bold py-3 px-6 rounded-md hover:bg-white hover:text-[#01b4e4] transition-all uppercase tracking-wider text-sm">
              {t('footer.join_community')}
            </button>
          )}
        </div>

        {/* === Right Side: Links === */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-white rtl:text-right w-full md:w-auto">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-base md:text-xl uppercase mb-3">{t('footer.basics')}</h3>
            <ul className="space-y-1 text-sm md:text-lg font-normal opacity-90">
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.about')}</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.contact')}</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.forums')}</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.api')}</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.status')}</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-base md:text-xl uppercase mb-3">{t('footer.involved')}</h3>
            <ul className="space-y-1 text-sm md:text-lg font-normal opacity-90">
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.bible')}</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.add_movie')}</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.add_tv')}</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-base md:text-xl uppercase mb-3">{t('footer.community')}</h3>
            <ul className="space-y-1 text-sm md:text-lg font-normal opacity-90">
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.guidelines')}</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.discussions')}</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.leaderboard')}</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold text-base md:text-xl uppercase mb-3">{t('footer.legal')}</h3>
            <ul className="space-y-1 text-sm md:text-lg font-normal opacity-90">
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.terms')}</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.api_terms')}</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.privacy')}</li>
              <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">{t('footer.dmca')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Build Info */}
      <div className="mt-10 md:mt-16 text-center text-white/20 text-[10px] font-semibold">
        {t('footer.build')}
      </div>
    </footer>
  );
};

export default Footer;