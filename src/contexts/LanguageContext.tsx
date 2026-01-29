import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import translations from '../lib/translations';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('language') as Language;
      if (saved && (saved === 'pt' || saved === 'en')) {
        setLanguageState(saved);
      }
    } catch (error) {
      console.error('Error loading language from localStorage:', error);
    } finally {
      setIsReady(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    try {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
    } catch (error) {
      console.error('Error saving language to localStorage:', error);
    }
  };

  const t = (key: string): string => {
    try {
      if (!translations || !translations[language]) {
        return key;
      }
      return translations[language]?.[key] || translations.pt?.[key] || key;
    } catch (error) {
      console.error('Translation error:', error, 'key:', key);
      return key;
    }
  };

  if (!isReady) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

