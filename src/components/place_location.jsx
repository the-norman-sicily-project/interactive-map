import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './place_location.css';

import { useTranslate } from 'react-redux-multilingual';

const getSeeAlsoSource = (translate, link) => {
  if (link.includes('geonames.org')) {
    return translate('geonamesLinkName');
  }
  if (link.includes('earth.google.com')) {
    return translate('googleEarthLinkName');
  }
  return translate('otherLinkName');
};

const LocationComponent = (props) => {
  const translate = useTranslate();

  const {
    nsp_hasLocation: {
      skos_altLabel,
      rdfs_seeAlso,
      wgs_lat,
      wgs_long,
      wgs_alt,
      nsp_coordinateSource,
      nsp_seismicCode,
      nsp_modernComune,
      nsp_modernProvince,
    },
    nsp_historicalProvince,
  } = props;

  return (
    <div className="location-container">
      {skos_altLabel && (
        <div>
          <span className="boldText">{translate('locationAltNamesFieldTitle')}</span>{' '}
          {Array.isArray(skos_altLabel) ? skos_altLabel.join(', ') : skos_altLabel}
        </div>
      )}
      {nsp_historicalProvince && (
        <div>
          <span className="boldText">{translate('locationHistoricalProvinceFieldTitle')}</span> {nsp_historicalProvince}
        </div>
      )}
      {nsp_modernProvince && (
        <div>
          <span className="boldText">{translate('locationModernComuneFieldTitle')}</span> {nsp_modernComune}
        </div>
      )}
      {nsp_modernProvince && (
        <div>
          <span className="boldText">{translate('locationModernProvinceFieldTitle')}</span> {nsp_modernProvince}
        </div>
      )}
      {rdfs_seeAlso &&
        rdfs_seeAlso.map((item) => (
          <div key={_.uniqueId('location-seealso')}>
            <span className="boldText">{`${getSeeAlsoSource(translate, item).toUpperCase()}:`}</span>{' '}
            <a target="_blank" rel="noreferrer noopener" href={item}>
              {item}
            </a>
          </div>
        ))}
      <div>
        <span className="boldText">{translate('locationLatitudeFieldTitle')}</span> {wgs_lat}
      </div>
      <div>
        <span className="boldText">{translate('locationLongitudeFieldTitle')}</span> {wgs_long}
      </div>
      {wgs_alt && (
        <div>
          <span className="boldText">{translate('locationElevationFieldTitle')}</span> {wgs_alt}
        </div>
      )}
      {nsp_coordinateSource && (
        <div>
          <span className="boldText">{translate('locationCoordinateSourceFieldTitle')}</span>{' '}
          {translate(nsp_coordinateSource.trim())}
        </div>
      )}
      {nsp_seismicCode && (
        <div>
          <span className="boldText">{translate('locationSiesmicCodeFieldTitle')}</span>:{nsp_seismicCode}
        </div>
      )}
    </div>
  );
};

LocationComponent.propTypes = {
  nsp_historicalProvince: PropTypes.string,
  nsp_hasLocation: PropTypes.shape({
    skos_altLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    rdfs_seeAlso: PropTypes.arrayOf(PropTypes.string),
    wgs_lat: PropTypes.number,
    wgs_long: PropTypes.number,
    wgs_alt: PropTypes.number,
    nsp_coordinateSource: PropTypes.string,
    nsp_seismicCode: PropTypes.string,
    nsp_modernComune: PropTypes.string,
    nsp_modernProvince: PropTypes.string,
  }),
};

LocationComponent.defaultProps = {
  nsp_historicalProvince: null,
  nsp_hasLocation: {
    skos_altLabel: null,
    rdfs_seeAlso: null,
    wgs_lat: null,
    wgs_long: null,
    wgs_alt: null,
    nsp_coordinateSource: null,
    nsp_seismicCode: null,
    nsp_modernComune: null,
    nsp_modernProvince: null,
  },
};

export default LocationComponent;
