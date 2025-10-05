/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'react-redux-multilingual';
import NameComponent from './place_name';
import MetadataComponent from './place_metadata';
import LocationComponent from './place_location';
import CSSIComponent from './place_cssi';
import ESRComponent from './place_esr';
import UCIComponent from './place_uci';
import ReferencesComponent from './place_references';
import PlaceTypeInfoComponent from './place_type';
import LinksComponent from './place_links';
import MediaComponent from './place_media';

import './resource_page.css';

const CollapsibleSection = ({ title, isOpen, onToggle, children }) => (
  <div className="collapsible-section">
    <button
      type="button"
      className={`collapsible-header ${isOpen ? 'active' : ''}`}
      onClick={onToggle}
      aria-expanded={isOpen}>
      <span className="collapsible-title">{title}</span>
      <span className="collapsible-icon">{isOpen ? '−' : '+'}</span>
    </button>
    {isOpen && <div className="collapsible-content">{children}</div>}
  </div>
);

CollapsibleSection.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const ResourcePage = memo((props) => {
  const translate = useTranslate();
  const { currentPlace, loadingCurrentPlace, currentLocale } = props;
  const { labels, skos_altLabel } = currentPlace || {};

  // State for managing which sections are open (default: first section open)
  const [openSections, setOpenSections] = useState({
    names: true,
    location: false,
    cssi: false,
    network: false,
    references: false,
    notes: false,
    metadata: false,
    media: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Memoize props to prevent unnecessary re-renders
  const nameProps = useMemo(() => ({ currentLocale, labels, skos_altLabel }), [currentLocale, labels, skos_altLabel]);

  if (loadingCurrentPlace) {
    return (
      <div className="resource-page">
        <div className="loading-container">
          <div className="loader" />
          <p>Loading resource...</p>
        </div>
      </div>
    );
  }

  if (!currentPlace || Object.keys(currentPlace).length === 0) {
    return (
      <div className="resource-page">
        <div className="error-container">
          <h2>Resource Not Found</h2>
          <p>The requested resource could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="resource-page">
      <div className="resource-header">
        <h1>{currentPlace.skos_prefLabel || 'Unnamed Resource'}</h1>
        {currentPlace.iri && (
          <div className="resource-iri">
            <strong>IRI:</strong> <code>{currentPlace.iri}</code>
          </div>
        )}
      </div>

      <div className="resource-sections">
        <CollapsibleSection
          title={translate('tabLabelNames')}
          isOpen={openSections.names}
          onToggle={() => toggleSection('names')}>
          <NameComponent {...nameProps} />
          <ESRComponent {...currentPlace} />
        </CollapsibleSection>

        <CollapsibleSection
          title={translate('tabLabelLocation')}
          isOpen={openSections.location}
          onToggle={() => toggleSection('location')}>
          <LocationComponent {...currentPlace} />
        </CollapsibleSection>

        <CollapsibleSection
          title={translate('tabLabelCssi')}
          isOpen={openSections.cssi}
          onToggle={() => toggleSection('cssi')}>
          <CSSIComponent {...currentPlace} />
        </CollapsibleSection>

        <CollapsibleSection
          title={translate('tabLabelNetwork')}
          isOpen={openSections.network}
          onToggle={() => toggleSection('network')}>
          <PlaceTypeInfoComponent {...currentPlace} />
          <LinksComponent {...currentPlace} />
        </CollapsibleSection>

        <CollapsibleSection
          title={translate('tabLabelReferences')}
          isOpen={openSections.references}
          onToggle={() => toggleSection('references')}>
          <ReferencesComponent {...currentPlace} />
        </CollapsibleSection>

        <CollapsibleSection
          title={translate('tabLabelNotes')}
          isOpen={openSections.notes}
          onToggle={() => toggleSection('notes')}>
          <UCIComponent {...currentPlace} />
        </CollapsibleSection>

        <CollapsibleSection
          title={translate('tabLabelMetadata')}
          isOpen={openSections.metadata}
          onToggle={() => toggleSection('metadata')}>
          <MetadataComponent {...currentPlace} />
        </CollapsibleSection>

        <CollapsibleSection
          title={translate('tabLabelMedia')}
          isOpen={openSections.media}
          onToggle={() => toggleSection('media')}>
          <MediaComponent {...currentPlace} />
        </CollapsibleSection>
      </div>
    </div>
  );
});

ResourcePage.displayName = 'ResourcePage';

ResourcePage.propTypes = {
  currentPlace: PropTypes.shape({
    iri: PropTypes.string,
    skos_prefLabel: PropTypes.string,
    labels: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string), // Array format: ["en,Name", "it,Nome"]
      PropTypes.objectOf(PropTypes.string), // Object format: {en: "Name", it: "Nome"}
    ]),
    skos_altLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }),
  loadingCurrentPlace: PropTypes.bool,
  currentLocale: PropTypes.string,
};

ResourcePage.defaultProps = {
  currentPlace: null,
  loadingCurrentPlace: false,
  currentLocale: 'en',
};

export default ResourcePage;
