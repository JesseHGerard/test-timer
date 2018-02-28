import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import './style.css'
import SetPage from './components/set-page';
import TestPage from './components/test-page';


class App extends Component {

  render() {
    const props = this.props;

    return (
      <div>
        <SetPage />
        <ReactCSSTransitionGroup
          transitionName="in-left"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }
          component='div'
          className='transition-container'
        >
          { props.testPage ? <TestPage key='testPage' /> : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  testPage: state.testPage
})

export default connect(mapStateToProps)(App)
