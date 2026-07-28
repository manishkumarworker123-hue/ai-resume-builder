import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, type Language } from '../i18n/translations';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang: Language) => set({ language: lang }),
      t: (key: keyof typeof translations['en']) => {
        const lang = get().language;
        return translations[lang][key] || translations['en'][key] || key;
      },
    }),
    {
      name: 'ai-resume-language-storage',
    }
  )
);
