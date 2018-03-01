import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.css';
import * as actions from '../actions';
import * as playBlack from '../images/play-black.svg';

class SetPage extends Component {

  handleQuestionChange = event => {
    this.props.dispatch(
      actions.inputQuestionQuant(event.target.value)
    );
  }

  handleTimeChange = event => {
    this.props.dispatch(
      actions.inputTimeQuant(event.target.value)
    );
  }

  handleStartClick = () => {
    this.props.dispatch(
      actions.startCountDown()
    );
    setTimeout( () => {
      this.props.dispatch(
        actions.startButton(this.props.timeLimit, this.props.totalQuestions)
      );
      setTimeout( () => {
        this.props.dispatch(
          actions.removeStartPage()
        );
      }, 800);
    }, 4000);
  }

  render() {
    const props = this.props;

    return (
      <div className="App page">
        <div className="flex-container no-wrap">
          <div className="flex-container">
            <p className="">set quantities</p>
          </div>
          <div className="flex-container">
            <div className="flex-container">
              <div className="number-box magenta">
                <input
                  type="number"
                  className="bold-number magenta"
                  value={ props.totalQuestionsStr }
                  onChange={ this.handleQuestionChange }
                >
                </input>
              </div>
              <p className="magenta">questions</p>
            </div>
            <div className="flex-container">
              <div className="number-box cyan">
                <input
                  type="number"
                  className="bold-number cyan"
                  value={ props.timeLimitStr }
                  onChange={ this.handleTimeChange }
                >
                </input>
              </div>
              <p className="cyan">minutes</p>
            </div>
          </div>
        </div>
        <div className="flex-container row">
          <img
            src={ playBlack }
            onClick={ this.handleStartClick }
            className="button-timer"
            alt="Start Test"
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    try {
      const localState = JSON.parse(localStorage.getItem('state'));
      this.props.dispatch(
        actions.getlocalState(localState)
      );
    }
    catch(error) {
      console.log('No Local State Availabe');
    }
  }

}

const mapStateToProps = state => ({
  totalQuestions: state.totalQuestions,
  totalQuestionsStr: state.totalQuestionsStr,
  timeLimit: state.timeLimit,
  timeLimitStr: state.timeLimitStr,
  state: state
});


export default connect(mapStateToProps)(SetPage)
