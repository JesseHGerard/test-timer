import React from 'react';
import '../style.css';

const TimeDisplay = props => (
  <div className="flex-container">
    <div className="number-box cyan">
      <h2 className="bold-number cyan no-select">
        { props.displayTime }
      </h2>
    </div>
    <p className="cyan">{ props.displayUnits }</p>
  </div>
)

export default TimeDisplay;
