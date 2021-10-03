import React from 'react';
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
