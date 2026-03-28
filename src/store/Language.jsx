import { create } from 'zustand';
import i18n from '../i18n';

const useLanguageStore = create((set) => ({
    language: 'en',
    setLanguage: (lang) => {
        set({ language: lang });
        i18n.changeLanguage(lang);
    },
    languages: ['en', 'ar'],
}));

export default useLanguageStore;