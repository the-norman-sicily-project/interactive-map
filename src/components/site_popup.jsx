/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import _ from 'lodash';
import TabSchema from '../schemas/tabs';
import { ddToDms, snakeCase2StartCase, startCaseList } from '../utils';

const SitePopup = ({ feature }) => {
  const fieldValueMarkup = (path, fv) => {
    switch (path) {
      case 'geometry.coordinates': {
        return (
          <div>
            <div>{fv.join(', ')}</div>
            <div>{ddToDms({ lat: fv[1], lng: fv[0] })}</div>
          </div>
        );
      }
      case 'properties.positional_accuracy_assesment': {
        if (fv.toLowerCase() === 'unknown') {
          return 'No';
        }
        return `Yes (${snakeCase2StartCase(fv)})`;
      }
      case 'properties.attestation_types': {
        return startCaseList(fv);
      }
      case 'properties.location_see_also_uris': {
        if (Array.isArray(fv)) {
          return fv.map(v => (
            <div key={_.uniqueId('location-see-also-uri-')}>
              <a href={`${v}`}>{v}</a>
            </div>
          ));
        }
        return <a href={`${fv}`}>{fv}</a>;
      }
      case 'properties.alternate_location_names': {
        const names = fv.map(item => {
          return item.name;
        });
        return names.join(', ');
      }
      default: {
        if (Array.isArray(fv)) {
          return fv.join(', ');
        }
        return fv;
      }
    }
  };

  const tabHeaderMarkup = (
    <TabList>
      {TabSchema.map(({ displayText }) => {
        return (
          <Tab key={_.uniqueId('tab-')}>
            <div style={{ textAlign: 'center' }}>
              {displayText.split('\n').map(part => {
                return <div key={_.uniqueId('tab-name')}>{part}</div>;
              })}
            </div>
          </Tab>
        );
      })}
    </TabList>
  );

  const tabPanelMarkup = TabSchema.map(({ fields }) => {
    return (
      <TabPanel key={_.uniqueId('tab-panel-')}>
        <table>
          <tbody>
            {fields.map(({ displayText, path }) => {
              const fieldValue = _.get(feature, path);
              const fieldTitle = displayText.split('\n').map(part => {
                return <div key={_.uniqueId('field-title-')}>{part}</div>;
              });
              if (fieldValue) {
                return (
                  <tr key={_.uniqueId('row-')}>
                    <td style={{ width: '35%' }}>{fieldTitle}</td>
                    <td>{fieldValueMarkup(path, fieldValue)}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </TabPanel>
    );
  });

  return (
    <Tabs>
      {tabHeaderMarkup}
      {tabPanelMarkup}
    </Tabs>
  );
};

SitePopup.propTypes = {
  feature: PropTypes.object.isRequired,
};

export default SitePopup;
