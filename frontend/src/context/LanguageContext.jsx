import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children, initialLanguage }) {
  const [language, setLanguage] = useState(() => {
    if (initialLanguage) return initialLanguage;
    try {
      return localStorage.getItem('airsense_lang') || 'th';
    } catch {
      return 'th';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('airsense_lang', language);
    } catch {}
  }, [language]);

  function t(path) {
    if (!path) return '';
    const keys = path.split('.');

    let current = translations[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        current = undefined;
        break;
      }
    }

    if (current !== undefined) return current;

    // Fallback to en
    let fallback = translations.en;
    for (const key of keys) {
      if (fallback && fallback[key] !== undefined) {
        fallback = fallback[key];
      } else {
        return path;
      }
    }
    return fallback;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'th',
      setLanguage: () => {},
      t: (key) => key,
    };
  }
  return context;
}
