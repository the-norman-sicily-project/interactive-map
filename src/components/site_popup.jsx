/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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

import './site_popup.css';

import 'react-tabs/style/react-tabs.css';

const SitePopup = (props) => {
  const translate = useTranslate();

  const { currentPlace, loadingCurrentPlace, currentLocale } = props;
  const { labels, skos_altLabel } = currentPlace;

  const nameProps = { currentLocale, labels, skos_altLabel };

  return (
    <Popup minWidth={550} maxWidth={550} minHeight={250}>
      {loadingCurrentPlace && (
        <div className="loadingContainer" style={{ minHeight: 335, maxHeight: 335 }}>
          <div className="center">
            <div className="loader" />
          </div>
        </div>
      )}

      {!loadingCurrentPlace && (
        <div className="contentContainer">
          <Tabs>
            <TabList>
              <Tab>{translate('tabLabelNames')}</Tab>
              <Tab>{translate('tabLabelLocation')}</Tab>
              <Tab>{translate('tabLabelCssi')}</Tab>
              <Tab>{translate('tabLabelNetwork')}</Tab>
              <Tab>{translate('tabLabelReferences')}</Tab>
              <Tab>{translate('tabLabelNotes')}</Tab>
              <Tab>{translate('tabLabelMetadata')}</Tab>
              <Tab>{translate('tabLabelMedia')}</Tab>
            </TabList>

            <TabPanel>
              <div className="scrollableContent">
                <NameComponent {...nameProps} />
                <ESRComponent {...currentPlace} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="scrollableContent">
                <LocationComponent {...currentPlace} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="scrollableContent">
                <CSSIComponent {...currentPlace} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="scrollableContent">
                <PlaceTypeInfoComponent {...currentPlace} />
                <LinksComponent {...currentPlace} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="scrollableContent">
                <ReferencesComponent {...currentPlace} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="scrollableContent">
                <UCIComponent {...currentPlace} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="scrollableContent">
                <MetadataComponent {...currentPlace} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="scrollableContent">
                <div className="boldText">{translate('noDataMessage')}</div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      )}
    </Popup>
  );
};

SitePopup.propTypes = {
  currentPlace: PropTypes.shape(PropTypes.any),
  loadingCurrentPlace: PropTypes.bool,
  currentLocale: PropTypes.string,
};

SitePopup.defaultProps = {
  currentPlace: null,
  loadingCurrentPlace: null,
  currentLocale: 'en',
};

export default SitePopup;
