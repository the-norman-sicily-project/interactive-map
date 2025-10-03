import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './place_name.css';
import { useTranslate } from 'react-redux-multilingual';

// Removed dynamic imports to avoid process.env issues
// import('@formatjs/intl-displaynames/polyfill');
// import('@formatjs/intl-displaynames/locale-data/en');
// import('@formatjs/intl-displaynames/locale-data/it');

const NameComponent = (props) => {
  const translate = useTranslate();
  const { labels, skos_altLabel } = props;

  // Simple language name mapping to avoid Intl.DisplayNames issues
  const getLanguageDisplayName = (code) => {
    const languageMap = {
      en: 'ENGLISH',
      it: 'ITALIAN',
      fr: 'FRENCH',
      de: 'GERMAN',
      es: 'SPANISH',
      pt: 'PORTUGUESE',
      la: 'LATIN',
      ar: 'ARABIC',
      gr: 'GREEK',
      he: 'HEBREW',
    };
    return languageMap[code?.toLowerCase()] || code?.toUpperCase() || 'UNKNOWN';
  };

  // Helper function to get language name with fallback
  const getLanguageName = (langCode) => {
    if (!langCode || typeof langCode !== 'string' || langCode.trim() === '') {
      return 'UNKNOWN';
    }
    return getLanguageDisplayName(langCode.trim());
  };

  // Render labels based on format
  const renderLabels = () => {
    if (!labels) {
      return null;
    }

    // Handle object format {en: "Name", it: "Nome"}
    if (typeof labels === 'object' && !Array.isArray(labels)) {
      return Object.entries(labels).map(([lc, value]) => {
        if (!lc || !value) {
          return null;
        }
        return (
          <div key={_.uniqueId('name-')}>
            <span className="boldText">{`${getLanguageName(lc.trim())} ${translate('nameFieldTitle')}`}</span>{' '}
            {value.trim()}
          </div>
        );
      });
    }

    // Handle array format ["en,Name", "it,Nome"]
    if (Array.isArray(labels)) {
      return labels.map((l) => {
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
      });
    }

    return null;
  };

  return (
    <div className="name-container">
      {renderLabels()}

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
  labels: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string), // Array format: ["en,Name", "it,Nome"]
    PropTypes.objectOf(PropTypes.string), // Object format: {en: "Name", it: "Nome"}
  ]),
  skos_altLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

NameComponent.defaultProps = {
  labels: [],
  skos_altLabel: null,
};

export default NameComponent;
