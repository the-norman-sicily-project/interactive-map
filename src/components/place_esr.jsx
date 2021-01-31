import React from 'react';
import PropTypes from 'prop-types';
import './place_esr.css';
import { useTranslate } from 'react-redux-multilingual';

const ESRComponent = (props) => {
  const translate = useTranslate();

  const {
    nsp_earliestSurvivingRecord: { rdfs_label, nsp_minYear, nsp_maxYear },
  } = props;

  return (
    <div className="esr-container">
      {rdfs_label && (
        <div>
          <span className="boldText">{translate('esrFieldTitle')}</span> {rdfs_label} ({nsp_minYear} - {nsp_maxYear})
        </div>
      )}
    </div>
  );
};

ESRComponent.propTypes = {
  nsp_earliestSurvivingRecord: PropTypes.shape({
    rdfs_label: PropTypes.string,
    nsp_minYear: PropTypes.string,
    nsp_maxYear: PropTypes.string,
  }),
};

ESRComponent.defaultProps = {
  nsp_earliestSurvivingRecord: {},
};

export default ESRComponent;
