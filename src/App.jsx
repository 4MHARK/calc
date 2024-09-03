import { useReducer } from 'react';
import './App.css';

const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: state.currentOperand.length < 10 ? state.currentOperand + payload.digit : state.currentOperand,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === '') return state;
      if (state.previousOperand !== '') {
        return {
          ...state,
          previousOperand: eval(`${state.previousOperand}${state.operation}${state.currentOperand}`),
          currentOperand: '',
          operation: payload.operation,
        };
      }
      return {
        ...state,
        previousOperand: state.currentOperand,
        currentOperand: '',
        operation: payload.operation,
      };
    case ACTIONS.CLEAR:
      return {
        previousOperand: '',
        currentOperand: '',
        operation: '',
      };
    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (state.operation === '' || state.currentOperand === '' || state.previousOperand === '') return state;
      return {
        ...state,
        previousOperand: '',
        currentOperand: eval(`${state.previousOperand}${state.operation}${state.currentOperand}`).toString(),
        operation: '',
      };
    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {
    currentOperand: '',
    previousOperand: '',
    operation: '',
  });

  const handleDigit = (digit) => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
  const handleOperation = (operation) => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
  const handleClear = () => dispatch({ type: ACTIONS.CLEAR });
  const handleDeleteDigit = () => dispatch({ type: ACTIONS.DELETE_DIGIT });
  const handleEvaluate = () => dispatch({ type: ACTIONS.EVALUATE });

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand} {operation}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>
      <button onClick={handleClear} className='span-two'>AC</button>
      <button onClick={handleDeleteDigit}>DEL</button>
      <button onClick={() => handleOperation('/')}>/</button>
      <button onClick={() => handleDigit('7')}>7</button>
      <button onClick={() => handleDigit('8')}>8</button>
      <button onClick={() => handleDigit('9')}>9</button>
      <button onClick={() => handleOperation('*')}>*</button>
      <button onClick={() => handleDigit('4')}>4</button>
      <button onClick={() => handleDigit('5')}>5</button>
      <button onClick={() => handleDigit('6')}>6</button>
      <button onClick={() => handleOperation('-')}>-</button>
      <button onClick={() => handleDigit('1')}>1</button>
      <button onClick={() => handleDigit('2')}>2</button>
      <button onClick={() => handleDigit('3')}>3</button>
      <button onClick={() => handleOperation('+')}>+</button>
      <button onClick={() => handleDigit('0')}>0</button>
      <button onClick={() => handleDigit('.')}>.</button>
      <button onClick={handleEvaluate} className='span-two'>=</button>
    </div>
  );
}

export default App;
