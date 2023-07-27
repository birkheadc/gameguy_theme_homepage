import React from "react";

export function useLanguage() {
  const [language, setLanguage] = React.useState<string>(DEFAULT_LANGUAGE);
  
  React.useEffect(function getLanguageOnMount() {
    const language = window.localStorage.getItem(LANGUAGE_KEY);
    if (language == null) {
      changeLanguage(DEFAULT_LANGUAGE);
    } else {
      setLanguage(language);
    }
  }, []);

  React.useEffect(function addListenerOnMount() {
    const listener = ((event: StorageEvent) => {
      if (event.key !== LANGUAGE_KEY) return;
      const language = window.localStorage.getItem(LANGUAGE_KEY);
      if (language == null) {
        changeLanguage(DEFAULT_LANGUAGE);
      } else {
        setLanguage(language);
      }
    })

    window.addEventListener('storage', listener);
    return (() => {
      window.removeEventListener('storage', listener);
    })
  }, []);

  React.useEffect(function setCssAttributeOnLanguageChange() {
    document.documentElement.setAttribute(LANGUAGE_KEY, language);
  }, [ language ]);

  const changeLanguage = (language: string) => {
    window.localStorage.setItem(LANGUAGE_KEY, language);
    window.dispatchEvent(new StorageEvent('storage', { key: LANGUAGE_KEY }));
  }

  return {language, changeLanguage};
}

const DEFAULT_LANGUAGE = 'en';
const LANGUAGE_KEY = 'data-language';