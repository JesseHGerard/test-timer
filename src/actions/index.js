// helper functions

const parseInput = input => {
  const parsed = parseFloat(input, 10);
  if (!Number.isNaN(parsed) && typeof parsed === 'number' && parsed > 0) {
    return  parsed;
  } else {
    console.log('User Input Failed Parse');
    return 0;
  }
}
//________________________________________________________

// ACTIONS

export const inputQuestionQuant = totalQuestionsStr => {
  const totalQuestions = parseInput(totalQuestionsStr);
  return {
    type: 'INPUT_QUESTION_QUANT',
    payload: {
      totalQuestionsStr,
      totalQuestions
    }
  };
}


export const inputTimeQuant = timeLimitStr => {
  const timeLimit = parseInput(timeLimitStr)
  return {
    type: 'INPUT_TIME_QUANT',
    payload: {
      timeLimitStr,
      timeLimit
    }
  };
}


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


export const startButton = (timeLimit, totalQuestions) => {
  const calcTimePerQuestion = (timeRemaining, totalQuestions) => {
    const quotient = timeRemaining / totalQuestions;
    if(quotient) {
      return quotient;
    } else {
      return 1;
    }
  }

  const timeRemaining = timeLimit * 60000;
  const endTime = Date.now() + timeRemaining;
  const timePerQuestion = calcTimePerQuestion(timeRemaining, totalQuestions);
  const payload = {
    timeRemaining,
    timePerQuestion,
    endTime
  };

  return {
    type: 'START',

    payload
  }
}


export const pauseButton = state => {

  return {
    type: 'PAUSE',
  }
}


export const resumeButton = timeRemaining => {
  const endTime = Date.now() + timeRemaining;
  return {
    type: 'RESUME',
    payload: {
      timeRemaining,
      endTime
    }
  }
}


export const resetButton = () => ({
  type: 'RESET',
})


export const getlocalState = localState => {
  const payload = localState;
  return {
    type: 'GET_LOCAL_STATE',
    payload
  };
}


export const saveLocalComplete = () => {
  return {
    type: 'SAVE_LOCAL_COMPLETE'
  }
}


export const removeIntroPage = () => {
  return {
    type: 'REMOVE_INTRO_PAGE'
  }
}


export const startCountDown = () => {
  return {
    type: 'START_COUNTDOWN'
  }
}


export const removeStartPage = () => {
  return {
    type: 'REMOVE_START_PAGE'
  }
}
