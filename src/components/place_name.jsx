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
  const languageNames = new Intl.DisplayNames([currentLocale], { type: 'language' });

  return (
    <div className="name-container">
      {labels.map((l) => {
        const [lc, value] = l.split(',');
        return (
          <div key={_.uniqueId('name-')}>
            <span className="boldText">{`${languageNames.of(lc).toUpperCase()} ${translate('nameFieldTitle')}`}</span>{' '}
            {value}
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
