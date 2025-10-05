import React from 'react';
import PropTypes from 'prop-types';
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
            {/* eslint-disable-next-line react/no-array-index-key */}
            {links.map(({ nsp_role, nsp_hasSource, nsp_hasTarget, nsp_hasReference = [] } = {}, linkIdx) => {
              const references = Array.isArray(nsp_hasReference) ? nsp_hasReference : [nsp_hasReference];
              const sourceIri = nsp_hasSource && nsp_hasSource.iri ? nsp_hasSource.iri : 'unknown';
              const targetIri = nsp_hasTarget && nsp_hasTarget.iri ? nsp_hasTarget.iri : 'unknown';
              const linkKey = `${sourceIri}-${targetIri}-${linkIdx}`;

              return (
                <li key={linkKey}>
                  <div>
                    <div className="linksTitle">
                      <span title={nsp_hasSource && nsp_hasSource.iri}>
                        {nsp_hasSource && nsp_hasSource.skos_prefLabel}
                      </span>{' '}
                      {nsp_role}{' '}
                      <span title={nsp_hasTarget && nsp_hasTarget.iri}>
                        {nsp_hasTarget && nsp_hasTarget.skos_prefLabel}
                      </span>
                    </div>
                    {/* eslint-disable react/no-array-index-key */}
                    {references.map(({ nsp_zoteroIri, nsp_pages, nsp_notes }, refIdx) => {
                      if (nsp_zoteroIri) {
                        return (
                          <div key={`${linkKey}-ref-${refIdx}`}>
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
                    {/* eslint-enable react/no-array-index-key */}
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
