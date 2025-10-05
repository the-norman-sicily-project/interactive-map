import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import './LanguageSwitcher.css';

const LanguageSwitcher = ({ currentLocale, onLocaleChange }) => {
  const { type, id } = useParams();

  const changeLocale = (locale) => {
    if (locale !== currentLocale) {
      // Update URL with new locale parameter
      const newUrl = `/place/${type}/${id}?locale=${locale}`;
      window.history.pushState({}, '', newUrl);
      onLocaleChange(locale);
    }
  };

  return (
    <div className="language-switcher">
      <button
        type="button"
        className={`lang-button ${currentLocale === 'en' ? 'active' : ''}`}
        onClick={() => changeLocale('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="lang-separator">|</span>
      <button
        type="button"
        className={`lang-button ${currentLocale === 'it' ? 'active' : ''}`}
        onClick={() => changeLocale('it')}
        aria-label="Switch to Italian"
      >
        IT
      </button>
    </div>
  );
};

LanguageSwitcher.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  onLocaleChange: PropTypes.func.isRequired,
};

export default LanguageSwitcher;
