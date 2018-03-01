import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.css';
import * as actions from '../actions';
import TestButtons from './test-buttons';
import TimeDisplay from './time-display';
import QuestionDisplay from './question-display';

class TestPage extends Component {

  render() {
    const props = this.props;
    let runningState = {
      backgroundColor: 'black',
      title: 'progress'
    }

    if (!props.running && props.timeRemaining > 0) {
      runningState.backgroundColor = 'rgb(80, 85, 91)';
      runningState.title = 'paused';
    } else if (!props.running && props.timeRemaining <= 0) {
      runningState.backgroundColor = 'rgb(109, 5, 5)';
      runningState.title = 'complete';
    } else {
      runningState.backgroundColor = 'black';
      runningState.title = 'progress';
    }

    return (

        <div
          className="page-move white"
          style={{
            backgroundColor: runningState.backgroundColor
          }}
        >
          <div className="flex-container no-wrap">
            <div className="flex-container">
              <p>{ runningState.title }</p>
            </div>
            <div className="flex-container">
              <QuestionDisplay questionCount={ props.questionCount }/>
              <TimeDisplay
                displayTime={ props.displayTime }
                displayUnits={ props.displayUnits }
              />
            </div>
          </div>
          <TestButtons />
        </div>

    );
  }

  updateDisplay = () => {
    if (this.props.running) {
      setTimeout( () => {
        this.props.dispatch(
          actions.updateDisplay(this.props.state)
        );
      }, 100);
    }

    if (this.props.saveLocal) {
      try {
        localStorage.setItem('state', JSON.stringify({ ...this.props.state }));
      }
      catch(error) {
        console.log(`setLocalState failed: ${error}`);
      }
      finally {
        this.props.dispatch(
          actions.saveLocalComplete()
        );
      }
    }
  }

  componentDidMount() {
    this.updateDisplay();
  }
  componentDidUpdate() {
    this.updateDisplay();
  }
}

const mapStateToProps = state => ({
  questionCount: state.questionCount,
  displayTime: state.displayTime,
  displayUnits: state.displayUnits,
  running: state.running,
  timeRemaining: state.timeRemaining,
  saveLocal: state.saveLocal,
  state: state
});


export default connect(mapStateToProps)(TestPage)
