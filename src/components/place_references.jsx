import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { useTranslate } from 'react-redux-multilingual';
import { startCaseList, startCaseTerm } from '../utils';

import './place_references.css';

const ReferencesComponent = (props) => {
  const translate = useTranslate();

  const { nsp_hasReference, nsp_attestationType } = props;

  let attestationTypeString;

  if (Array.isArray(nsp_attestationType)) {
    attestationTypeString = startCaseList(nsp_attestationType);
  } else {
    attestationTypeString = nsp_attestationType ? startCaseTerm(nsp_attestationType) : undefined;
  }

  const references = Array.isArray(nsp_hasReference) ? nsp_hasReference : [nsp_hasReference];
  return (
    <div className="references-container">
      {attestationTypeString && (
        <div>
          <span className="boldText">{translate('attestationTypesFieldTitle')}</span> {attestationTypeString}
        </div>
      )}
      <div>
        <span className="boldText">{translate('referencesFieldTitle')}</span>
      </div>
      <ul>
        {references.map(({ nsp_zoteroIri, nsp_pages, nsp_notes }) => (
          <li key={uniqueId('reference-')}>
            Zotero URL:{' '}
            <a target="_blank" rel="noreferrer noopener" href={nsp_zoteroIri}>
              {nsp_zoteroIri}
            </a>
            {nsp_pages && (
              <span>
                {' '}
                {translate('referencesPagesFieldTitle')} {nsp_pages}
              </span>
            )}
            {nsp_notes && (
              <span>
                {' '}
                {translate('referencesNotesFieldTitle')} {nsp_notes}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

ReferencesComponent.propTypes = {
  nsp_hasReference: PropTypes.oneOfType([
    PropTypes.shape({ nsp_zoteroIri: PropTypes.string, nsp_pages: PropTypes.string, nsp_notes: PropTypes.string }),
    PropTypes.arrayOf(
      PropTypes.shape({ nsp_zoteroIri: PropTypes.string, nsp_pages: PropTypes.string, nsp_notes: PropTypes.string }),
    ),
  ]),
  nsp_attestationType: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

ReferencesComponent.defaultProps = {
  nsp_hasReference: [],
  nsp_attestationType: null,
};

export default ReferencesComponent;
