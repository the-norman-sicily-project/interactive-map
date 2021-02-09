import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'react-redux-multilingual';
import mirador from 'mirador';
import miradorImageToolsPlugin from 'mirador-image-tools/es/plugins/miradorImageToolsPlugin';
import { catalog } from '../data/catalog';

const MediaComponent = (props) => {
  const miradorRef = useRef();
  const { nsp_id, nsp_placeType } = props;
  const locationId = `${nsp_placeType}${nsp_id}`;
  const viewerId = `viewer-${locationId}`;
  const { manifestId } = catalog.find((item) => item.locationId === locationId) || {};

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
      console.log(`An error occurred when mounting ${viewerId}: ${e.message}`);
    }

    return () => {
      try {
        if (miradorRef.current) {
          miradorRef.current.unmount();
        }
      } catch (e) {
        console.log(`An error occurred when dismounting ${viewerId}: ${e.message}`);
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
