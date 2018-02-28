import React from 'react';
import '../style.css';

const QuestionDisplay = props => (
  <div className="flex-container">
    <div className="number-box magenta">
      <h2 className="bold-number magenta no-select">
        { props.questionCount }
      </h2>
    </div>
    <p className="magenta">questions</p>
  </div>
)

export default QuestionDisplay;
