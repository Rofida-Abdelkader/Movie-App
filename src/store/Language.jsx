import { create } from 'zustand';

const useLanguageStore = create((set) => ({
    language: 'en-US',
    setLanguage: (lang) => set({ language: lang }),
    languages: ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'ar-EG', 'zh-CN', 'ja-JP', 'ko-KR', 'ru-RU'],
}));

export default useLanguageStore;