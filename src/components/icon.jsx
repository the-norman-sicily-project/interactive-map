import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ color, icon, size, translate, scale }) => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: color,
    },
  };

  return (
    <svg
      style={styles.svg}
      width={`${size}px`}
      height={`${size}px`}
      transform={`translate(${translate}) scale(${scale})`}
      viewBox="0 0 1024 1024"
    >
      <path style={styles.path} d={icon} />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  translate: PropTypes.string,
  scale: PropTypes.string,
};

Icon.defaultProps = {
  color: '#000000',
  scale: '1,1',
  translate: '',
  size: 55,
};

export default Icon;
