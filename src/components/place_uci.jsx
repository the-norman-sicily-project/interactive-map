import React from 'react';
import PropTypes from 'prop-types';
import './place_uci.css';
import { useTranslate } from 'react-redux-multilingual';

const UCIComponent = (props) => {
  const translate = useTranslate();

  const {
    nsp_notes,
    nsp_uncorroboratedInformation: { nsp_content, nsp_source },
  } = props;

  if (nsp_notes || nsp_content) {
    return (
      <div className="uci-container">
        {nsp_notes && (
          <div>
            <span className="boldText">{translate('notesFieldTitle')}</span> {nsp_notes}
          </div>
        )}
        {nsp_content && (
          <div>
            <span className="boldText">{translate('uciFieldTitle')}</span> {nsp_content}
            {nsp_source && (
              <span>
                {' '}
                ({translate('uciSourceFieldTitle')}
                {nsp_source})
              </span>
            )}
          </div>
        )}
        )
      </div>
    );
  }
  return <div className="boldText">{translate('noDataMessage')}</div>;
};

UCIComponent.propTypes = {
  nsp_notes: PropTypes.string,
  nsp_uncorroboratedInformation: PropTypes.shape({
    nsp_content: PropTypes.string,
    nsp_source: PropTypes.string,
  }),
};

UCIComponent.defaultProps = {
  nsp_notes: null,
  nsp_uncorroboratedInformation: {},
};

export default UCIComponent;
