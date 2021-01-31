import React from 'react';
import './place_type.css';
import { useTranslate } from 'react-redux-multilingual';

const monasteryMarkup = (translate, props) => {
  const { nsp_probableStatus, nsp_probableGender, nsp_subjectOfDedication, nsp_monasticIdentity } = props;

  return (
    <div className="place-type-specific-markup">
      {nsp_probableGender && (
        <div>
          <span className="boldText">{translate('monasteryGenderFieldTitle')}</span> {nsp_probableGender}
        </div>
      )}
      {nsp_probableStatus && (
        <div>
          <span className="boldText">{translate('monasteryStatusFieldTitle')}</span> {nsp_probableStatus}
        </div>
      )}
      {nsp_monasticIdentity && (
        <div>
          <span className="boldText">{translate('monasteryOrderFieldTitle')}</span> {nsp_monasticIdentity}
        </div>
      )}
      {nsp_subjectOfDedication && (
        <div>
          <span className="boldText">{translate('monasteryDedicationFieldTitle')}</span> {nsp_subjectOfDedication}
        </div>
      )}
    </div>
  );
};

const placeMarkupByType = (translate, { nsp_placeType, ...rest }) => {
  switch (nsp_placeType) {
    case 'monastery':
      return monasteryMarkup(translate, rest);
    default:
      return <div />;
  }
};

const PlaceTypeInfoComponent = (props) => {
  const translate = useTranslate();
  return <div className="place-type-info-container">{placeMarkupByType(translate, props)}</div>;
};

export default PlaceTypeInfoComponent;
