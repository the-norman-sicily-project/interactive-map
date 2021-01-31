import React from 'react';
import PropTypes from 'prop-types';
import './place_metadata.css';
import { useTranslate } from 'react-redux-multilingual';

const MetadataComponent = (props) => {
  const translate = useTranslate();

  const { nsp_updatedOn, nsp_updatedBy, nsp_createdOn, nsp_createdBy, nsp_recordStatus, nsp_fieldVisit } = props;

  let fieldVisitString;
  if (nsp_fieldVisit) {
    if (Array.isArray(nsp_fieldVisit)) {
      fieldVisitString = nsp_fieldVisit.map((d) => new Date(d).toLocaleDateString()).join(', ');
    } else {
      fieldVisitString = new Date(nsp_fieldVisit).toLocaleDateString();
    }
  }

  return (
    <div className="metadata-container">
      {fieldVisitString && (
        <div>
          <span className="boldText">{translate('fieldVisitsFieldTitle')}</span> {fieldVisitString}
        </div>
      )}
      <div>
        <span className="boldText">{translate('metaCreatedOnFieldTitle')}</span>{' '}
        {new Date(nsp_createdOn).toLocaleDateString()} {translate('byFieldTitle')} {nsp_createdBy.foaf_givenName}{' '}
        {nsp_createdBy.foaf_familyName}{' '}
        {nsp_createdBy.foaf_mbox && <a href={nsp_createdBy.foaf_mbox}>{translate('emailFieldPostfix')}</a>}
      </div>
      <div>
        <span className="boldText">{translate('metaUpdatedOnFieldTitle')}</span>{' '}
        {new Date(nsp_updatedOn).toLocaleDateString()} {translate('byFieldTitle')} {nsp_updatedBy.foaf_givenName}{' '}
        {nsp_updatedBy.foaf_familyName}{' '}
        {nsp_updatedBy.foaf_mbox && <a href={nsp_updatedBy.foaf_mbox}>{translate('emailFieldPostfix')}</a>}
      </div>
      <div>
        <span className="boldText">{translate('metaRecordStatusFieldTitle')}</span> {nsp_recordStatus}
      </div>
    </div>
  );
};

MetadataComponent.propTypes = {
  nsp_recordStatus: PropTypes.string,
  nsp_createdOn: PropTypes.string,
  nsp_updatedOn: PropTypes.string,
  nsp_fieldVisit: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  nsp_createdBy: PropTypes.shape({
    foaf_givenName: PropTypes.string,
    foaf_familyName: PropTypes.string,
    foaf_mbox: PropTypes.string,
  }),
  nsp_updatedBy: PropTypes.shape({
    foaf_givenName: PropTypes.string,
    foaf_familyName: PropTypes.string,
    foaf_mbox: PropTypes.string,
  }),
};

MetadataComponent.defaultProps = {
  nsp_fieldVisit: null,
  nsp_recordStatus: null,
  nsp_createdOn: null,
  nsp_createdBy: {},
  nsp_updatedOn: null,
  nsp_updatedBy: {},
};

export default MetadataComponent;
