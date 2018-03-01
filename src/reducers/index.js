const initialState = {
  timeLimitStr: '15', // string, test time as set by user
  timeLimit: 15, // number, pased from user input
  endTime: null, // number, date in milliseconds
  displayTime: null, // number or string, minutes or seconds
  displayUnits: 'minutes', // string
  timeRemaining: 1, // number, milliseconds
  timePerQuestion: null, // number, milliseconds
  totalQuestionsStr: '50', // string, set by user
  totalQuestions: 50, // number, pased from user input
  questionCount: 0, // number, counts up to total
  running: true, // bool, timer is running
  ended: false, // bool, timer has ended
  introPage: true, // bool, show
  startPage: false, // bool, show
  testPage: false, // bool, show
  saveLocal: false, // bool
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {

    case 'INPUT_QUESTION_QUANT':
      return {
        ...state,
        ...payload
      };

    case 'INPUT_TIME_QUANT':
      return {
        ...state,
        ...payload
      };

    case 'START':
      return {
        ...state,
        ...payload,
        running: true,
        testPage: true,
        questionCount: 1,
        saveLocal: true
      };

    case 'UPDATE_DISPLAY':
      return {
        ...state,
        ...payload
      }

    case 'PAUSE':
      return {
        ...state,
        running: false,
        saveLocal: true
      };

    case 'RESUME':
      return {
        ...state,
        ...payload,
        running: true,
        saveLocal: true
      };

    case 'RESET':
      return {
        ...state,
        running: false,
        testPage: false,
        saveLocal: true
      };

    case 'GET_LOCAL_STATE':
      return {
        ...state,
        ...payload,
        introPage: true,
        startPage: false,
        saveLocal: false
      }

    case 'SAVE_LOCAL_COMPLETE':
      return {
        ...state,
        saveLocal: false
      }

    case 'REMOVE_INTRO_PAGE':
      return {
        ...state,
        introPage: false
      }

    case 'START_COUNTDOWN':
      return {
        ...state,
        startPage: true
      }

    case 'REMOVE_START_PAGE':
      return {
        ...state,
        startPage: false
      }

    default:
      return state;
  }
}

export default reducer;
