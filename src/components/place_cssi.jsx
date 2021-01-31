import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import './place_cssi.css';
import { useTranslate } from 'react-redux-multilingual';
import { startCaseTerm, startCaseList } from '../utils';

const CSSIComponent = (props) => {
  const translate = useTranslate();

  const { cssi_hasAssessment } = props;

  const assessments = Array.isArray(cssi_hasAssessment) ? cssi_hasAssessment : [cssi_hasAssessment];

  if (assessments.length === 0) {
    return <div className="boldText">{translate('noDataMessage')}</div>;
  }

  return (
    <div className="cssi-container">
      {assessments.map(
        ({
          iri,
          cssi_description,
          cssi_rockType,
          cssi_assessedBy,
          cssi_assessmentDate,
          cssi_rockCoatingNotationNotes,
          cssi_naturalProcessType,
          cssi_siteSettingScore,
          cssi_weaknessScore,
          cssi_largeErosionScore,
          cssi_smallErosionScore,
          cssi_rockCoatingsScore,
          cssi_totalAssessmentScore,
          cssi_otherConcernsScore,
          cssi_grandTotalAssessmentScore,
          cssi_hasRockCoatingNotation,
        }) => {
          const rockCoatingNotations = Array.isArray(cssi_hasRockCoatingNotation)
            ? cssi_hasRockCoatingNotation
            : [cssi_hasRockCoatingNotation];
          const rockTypes = Array.isArray(cssi_rockType) ? cssi_rockType : [cssi_rockType];

          return (
            <div key={iri} className="assessment-container">
              {cssi_description && (
                <div>
                  <span className="boldText">{translate('descriptionFieldTitle')}</span> {cssi_description}
                </div>
              )}
              {cssi_rockType && (
                <div>
                  <span className="boldText">ROCK TYPE:</span> {startCaseList(rockTypes)}
                </div>
              )}
              {cssi_rockCoatingNotationNotes && (
                <div>
                  <span className="boldText">ROCK COATING NOTES:</span> {cssi_rockCoatingNotationNotes}
                </div>
              )}
              {rockCoatingNotations && (
                <ul>
                  {' '}
                  {rockCoatingNotations.map((n) =>
                    Object.entries(n).map(([k, v]) => (
                      <li key={uniqueId('notation')}>
                        {startCaseTerm(k)}: {v}
                      </li>
                    )),
                  )}
                </ul>
              )}
              {cssi_naturalProcessType && (
                <div>
                  <span className="boldText">NATURAL PROCESS TYPE:</span> {startCaseList(cssi_naturalProcessType)}
                </div>
              )}

              <div className="boldText">SCORES (lower is better):</div>
              {cssi_siteSettingScore >= 0 && (
                <div>
                  <span className="boldText">SITE SETTING:</span> {cssi_siteSettingScore}
                </div>
              )}
              {cssi_weaknessScore >= 0 && (
                <div>
                  <span className="boldText">ROCK WEAKNESS:</span> {cssi_weaknessScore}
                </div>
              )}
              {cssi_largeErosionScore >= 0 && (
                <div>
                  <span className="boldText">LARGE EROSION EVENTS:</span> {cssi_largeErosionScore}
                </div>
              )}
              {cssi_smallErosionScore >= 0 && (
                <div>
                  <span className="boldText">SMALL EROSION EVENTS:</span> {cssi_smallErosionScore}
                </div>
              )}
              {cssi_rockCoatingsScore >= 0 && (
                <div>
                  <span className="boldText">ROCK COATINGS:</span> {cssi_rockCoatingsScore}
                </div>
              )}
              {cssi_totalAssessmentScore >= 0 && (
                <div>
                  <span className="boldText">TOTAL:</span> {cssi_totalAssessmentScore}
                </div>
              )}
              {cssi_otherConcernsScore >= 0 && (
                <div>
                  <span className="boldText">OTHER CONCERNS:</span> {cssi_otherConcernsScore}
                </div>
              )}
              {cssi_grandTotalAssessmentScore >= 0 && (
                <div>
                  <span className="boldText">GRAND TOTAL:</span> {cssi_grandTotalAssessmentScore}
                </div>
              )}

              <div>
                <span className="boldText">ASSESSED ON</span> {new Date(cssi_assessmentDate).toLocaleDateString()} by{' '}
                {cssi_assessedBy.foaf_givenName} {cssi_assessedBy.foaf_familyName}{' '}
                {cssi_assessedBy.foaf_mbox && <a href={cssi_assessedBy.foaf_mbox}>(email)</a>}
              </div>
              <hr />
            </div>
          );
        },
      )}
    </div>
  );
};

CSSIComponent.propTypes = {
  cssi_hasAssessment: PropTypes.arrayOf(
    PropTypes.shape({
      iri: PropTypes.string,
      cssi_description: PropTypes.string,
      cssi_rockType: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      cssi_assessedBy: PropTypes.shape({
        foaf_givenName: PropTypes.string,
        foaf_familyName: PropTypes.string,
        foaf_mbox: PropTypes.string,
      }),
      cssi_assessmentDate: PropTypes.string,
      cssi_rockCoatingNotationNotes: PropTypes.string,
      cssi_naturalProcessType: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      cssi_siteSettingScore: PropTypes.number,
      cssi_weaknessScore: PropTypes.number,
      cssi_largeErosionScore: PropTypes.number,
      cssi_smallErosionScore: PropTypes.number,
      cssi_rockCoatingsScore: PropTypes.number,
      cssi_totalAssessmentScore: PropTypes.number,
      cssi_otherConcernsScore: PropTypes.number,
      cssi_grandTotalAssessmentScore: PropTypes.number,
      cssi_hasRockCoatingNotation: PropTypes.arrayOf(PropTypes.object),
    }),
  ),
};

CSSIComponent.defaultProps = {
  cssi_hasAssessment: [],
};

export default CSSIComponent;
