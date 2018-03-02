# Test:Timer

### [Live Website: https://jessehgerard.github.io/test-timer/](https://jessehgerard.github.io/test-timer/)

created by [Jesse Gerard](http://jessegerard.com/) (solo project)

### about this project
Inspired by my own experiences taking coding tests for potential employers, Test:Timer is a utility app that helps manage time while taking tests. Rather than measuring your progress in time, Test:Timer tells the user which question he or she should be on. The app reduces cognitive-overhead, helping to keep the user productive, on track and feeling confident. Wrapped in a [deceptively] simple UI, Test:Timer has robust timekeeping logic and state-management system (with Redux), that continues working offline (with browsers that support web workers), even when the browser window has been accidentally closed (using localStorage api).

#### key libraries and tech <br>

React <br>
Redux (w/ react-redux)<br>
React CSSTransitionGroup (animation)<br>
LocalStorage API<br>
Service Worker <br>
Git / Github <br>
Google Fonts <br>
CSS3 <br>
JavaScript ES6 <br>

### code
Since JavaScript time can drift, especially under high cpu loads, Test:Timer [keeps track of time](#time-keeping) by setting an end-time in state. Time-remaining is calculated by subtracting the current time from the end-time. Display updates are made with a game-style ["update" function](#update-function) that reflects changes made to state in React components.

#### Time Keeping
The updateDisplay action calculates time remaining and other state values, as well as determines how relevant information should be displayed for the user, before sending data to the Redux Reducer<br>
code below is quoted from: test-timer/actions/index.js

```
export const updateDisplay = state => {
  const calcTimeRemaining = endTime => {
    const difference = endTime - Date.now();
    if (difference > 0) {
      return difference;
    } else {
      return 0;
    }
  }
  const timeRemaining = calcTimeRemaining(state.endTime);
  const running = state.running && timeRemaining > 0;
  const questionCount = Math.ceil(state.totalQuestions - (timeRemaining / state.timePerQuestion));

  const calcDisplayTime = time => {
    switch (true) {
      // > 5 min
      case time > 285000:
        return [`${Math.ceil(time / 60000)}`, 'minutes'];

      // 5 - 1 min
      case time <= 285000 && time > 60000:
        const min = Math.floor(time / 60000);
        const sec = ('0' + Math.floor((time - (min * 60000)) / 15000) * 15).slice(-2);
        return [ `${min}:${sec}`, 'min : sec'];

      // < 2 min
      case time < 60000:
        return [`${Math.floor(time / 1000)}`, 'seconds'];

      default:
        console.log('UpdateDisplay calcDisplayTime default hit')
        return [`${time / 60000}`, 'minutes'];
    }
  }

  const timeAndUnits = calcDisplayTime(timeRemaining);
  const displayTime = timeAndUnits[0];
  const displayUnits = timeAndUnits[1];

  return {
    type: 'UPDATE_DISPLAY',
    payload: {
      timeRemaining,
      running,
      questionCount,
      displayTime,
      displayUnits,
    }
  }
}
```

#### Update Function
State changes made with Redux are reflected in the display, and saved to localStorage for retrieval on the users next visit, or accidental window close.

code below is quoted from: test-timer/components/test-page.js
```
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
```
