import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'react-redux-multilingual';
import mirador from 'mirador';
import miradorImageToolsPlugin from 'mirador-image-tools/es/plugins/miradorImageToolsPlugin';

const MediaComponent = (props) => {
  const miradorRef = useRef();
  const [catalog, setCatalog] = useState([]);
  const { nsp_id, nsp_placeType } = props;
  const locationId = `${nsp_placeType}${nsp_id}`;
  const viewerId = `viewer-${locationId}`;
  const { manifestId } = catalog.find((item) => item.locationId === locationId) || {};

  // Load catalog data from public directory
  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/catalog.json`);
        if (response.ok) {
          const catalogData = await response.json();
          setCatalog(catalogData);
        }
      } catch (error) {
        // Catalog loading failed, component will show no data message
      }
    };
    loadCatalog();
  }, []);

  useEffect(() => {
    const config = {
      id: viewerId,
      windows: [
        {
          manifestId,
          view: 'gallery',
        },
      ],
      window: {
        imageToolsEnabled: true,
        imageToolsOpen: false,
        allowClose: false, // Prevent the user from closing this window
        allowMaximize: false,
        defaultSideBarPanel: 'info',
        sideBarOpenByDefault: false,
        views: [
          // Only allow the user to select single and gallery view
          { key: 'single' },
          { key: 'gallery' },
        ],
      },
      workspace: {
        type: 'mosaic',
      },
      workspaceControlPanel: {
        enabled: false, // Remove extra workspace settings
      },
      language: 'en',
      availableLanguages: {
        en: 'English',
        it: 'Italiano',
      },
      selectedTheme: 'light',
      config: {
        theme: 'light',
        language: {
          en: 'English',
          it: 'Italiano',
        },
      },
    };

    try {
      const miradorInstance = mirador.viewer(config, [...miradorImageToolsPlugin]);
      miradorRef.current = miradorInstance;
    } catch (e) {
      // Error mounting Mirador viewer
    }

    return () => {
      try {
        if (miradorRef.current) {
          miradorRef.current.unmount();
        }
      } catch (e) {
        // Error dismounting Mirador viewer
      }
    };
  }, [viewerId, manifestId]);

  const translate = useTranslate();

  if (manifestId) {
    return <div id={viewerId} />;
  }

  return <div className="boldText">{translate('noDataMessage')}</div>;
};

MediaComponent.propTypes = {
  nsp_id: PropTypes.string,
  nsp_placeType: PropTypes.string,
};

MediaComponent.defaultProps = {
  nsp_id: undefined,
  nsp_placeType: undefined,
};

export default MediaComponent;
