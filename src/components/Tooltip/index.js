import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

export default function ToolTip({ children, id, title }) {
  return (
    <>
      <div data-tip data-for={id}>
        {title}
      </div>
      <ReactTooltip place='bottom' type='dark' effect='solid' id={id}>
        {children}
      </ReactTooltip>
    </>
  );
}

ToolTip.defaultProps = null;

ToolTip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func])
    .isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
};
