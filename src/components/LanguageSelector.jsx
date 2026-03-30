import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.body.className = i18n.language === 'ar' ? 'ar-font' : 'en-font';
  }, [i18n.language]);

  return (
    <div className="lang-switcher">
      <button 
        className={i18n.language === 'en' ? 'active' : ''} 
        onClick={() => toggleLanguage('en')}
      >
        EN
      </button>
      <button 
        className={i18n.language === 'ar' ? 'active' : ''} 
        onClick={() => toggleLanguage('ar')}
      >
        AR
      </button>
    </div>
  );
};

export default LanguageSelector;