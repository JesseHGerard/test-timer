import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import * as actions from './actions';
import './style.css'
import SetPage from './components/set-page';
import TestPage from './components/test-page';
import IntroPage from './components/intro-page';
import StartPage from './components/start-page';

class App extends Component {

  startCountDown = () => {
    return <StartPage />;
  }

  render() {
    const props = this.props;
    console.log(props.startPage);
    return (
      <div>
        <SetPage />
        { props.startPage ? this.startCountDown() : null }
        <ReactCSSTransitionGroup
          transitionName="in-left"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }
          component='div'
          className='transition-container'
        >
          { props.testPage ? <TestPage key='testPage' /> : null }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnter={ false }
          transitionLeaveTimeout={ 500 }
        >
          { props.introPage ? <IntroPage key='introPage' /> : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  componentDidMount() {
    setTimeout( () => {
      this.props.dispatch(
        actions.removeIntroPage()
      );
    }, 2000);
  }
};

const mapStateToProps = state => ({
  testPage: state.testPage,
  introPage: state.introPage,
  startPage: state.startPage
})

export default connect(mapStateToProps)(App)
