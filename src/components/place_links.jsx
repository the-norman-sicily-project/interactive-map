import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import './place_links.css';
import { useTranslate } from 'react-redux-multilingual';

const LinksComponent = (props) => {
  const translate = useTranslate();

  const { nsp_hasLink } = props;

  if (nsp_hasLink) {
    const links = Array.isArray(nsp_hasLink) ? nsp_hasLink : [nsp_hasLink];

    if (links.length > 0) {
      return (
        <div className="links-container">
          <div>
            <span className="boldText">{translate('linksFieldTitle')}</span>
          </div>
          <ul>
            {links.map(({ nsp_role, nsp_hasSource, nsp_hasTarget, nsp_hasReference = [] } = {}) => {
              const references = Array.isArray(nsp_hasReference) ? nsp_hasReference : [nsp_hasReference];

              return (
                <li key={uniqueId('links-')}>
                  <div>
                    <div className="linksTitle">
                      <span title={nsp_hasSource.iri}>{nsp_hasSource.skos_prefLabel}</span> {nsp_role}{' '}
                      <span title={nsp_hasTarget.iri}>{nsp_hasTarget.skos_prefLabel}</span>
                    </div>
                    {references.map(({ nsp_zoteroIri, nsp_pages, nsp_notes }) => {
                      if (nsp_zoteroIri) {
                        return (
                          <div key={uniqueId('reference-')}>
                            (Reference:{' '}
                            <a target="_blank" rel="noopener noreferrer" href={nsp_zoteroIri}>
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
                            )
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
  return null;
};

LinksComponent.propTypes = {
  nsp_hasLink: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
};

LinksComponent.defaultProps = {
  nsp_hasLink: null,
};

export default LinksComponent;
