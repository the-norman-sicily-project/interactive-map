import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './place_name.css';
import { useTranslate } from 'react-redux-multilingual';

import('@formatjs/intl-displaynames/polyfill');
import('@formatjs/intl-displaynames/locale-data/en');
import('@formatjs/intl-displaynames/locale-data/it');

const NameComponent = (props) => {
  const translate = useTranslate();
  const { currentLocale, labels, skos_altLabel } = props;

  // Create DisplayNames with fallback for unsupported locales
  let languageNames;
  try {
    languageNames = new Intl.DisplayNames([currentLocale, 'en'], { type: 'language' });
  } catch (error) {
    // Fallback to English if currentLocale is not supported
    languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
  }

  // Helper function to get language name with fallback
  const getLanguageName = (langCode) => {
    if (!langCode || langCode.trim() === '') {
      return 'UNKNOWN';
    }

    try {
      const name = languageNames.of(langCode);
      return name ? name.toUpperCase() : langCode.toUpperCase();
    } catch (error) {
      // If the language code is not recognized, just return the code itself
      return langCode.toUpperCase();
    }
  };

  return (
    <div className="name-container">
      {labels.map((l) => {
        if (!l || typeof l !== 'string') {
          return null;
        }

        const [lc, value] = l.split(',');

        // Skip if we don't have both language code and value
        if (!lc || !value) {
          return null;
        }

        return (
          <div key={_.uniqueId('name-')}>
            <span className="boldText">{`${getLanguageName(lc.trim())} ${translate('nameFieldTitle')}`}</span>{' '}
            {value.trim()}
          </div>
        );
      })}

      {skos_altLabel && (
        <div>
          <span className="boldText">{translate('nameAltLabelFieldTitle')}</span>{' '}
          {Array.isArray(skos_altLabel) ? skos_altLabel.join(', ') : skos_altLabel}{' '}
        </div>
      )}
    </div>
  );
};

NameComponent.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  skos_altLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  currentLocale: PropTypes.string,
};

NameComponent.defaultProps = {
  labels: [],
  skos_altLabel: null,
  currentLocale: 'en',
};

export default NameComponent;
