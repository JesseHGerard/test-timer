import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.css';
import * as actions from '../actions';
import * as resumeButton from '../images/play.svg';
import * as resetButton from '../images/reset.svg';
import * as pauseButton from '../images/pause.svg';

class TestButtons extends Component {

  handlePauseClick = event => {
    this.props.dispatch(
      actions.pauseButton()
    );
  }

  handleResumeClick = event => {
    this.props.dispatch(
      actions.resumeButton(this.props.timeRemaining)
    );
  }

  handleResetClick = event => {
    this.props.dispatch(
      actions.resetButton()
    );
  }

  render() {
    const props = this.props;

    const reset = (
      <img
        src={ resetButton }
        onClick={ this.handleResetClick }
        alt="reset"
        className="button-timer"
      />
    );

    const resume = (
      <img
        src={ resumeButton }
        onClick={ this.handleResumeClick }
        alt="reset"
        className="button-timer"
      />
    );

    const pause = (
      <img
        src={ pauseButton }
        onClick={ this.handlePauseClick }
        alt="pause"
        className="button-timer"
      />
    );

    return (
      <div className="flex-container row">
        { props.running ? pause : reset }
        { !props.running && props.timeRemaining > 0 ? resume : null }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  running: state.running,
  timeRemaining: state.timeRemaining,
  state: state
});


export default connect(mapStateToProps)(TestButtons)
