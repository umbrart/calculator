import { useReducer, useState } from 'react';
import DigitButton from './digitButton';
import OperationButton from './operationButton';
import './styles.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}


/*PREVIOUS E CURRENT OPERAND 

Tratam das 2 <divs> que ficam no topo da calculadora.

/            x + / <div previous.operand>
/              y / <div current.operand>


*/


function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0"){
        /*se  foi digitado 0 e o operando já vale 0 então retorna o state atual, ou seja "0"*/
        return state
      } 

      if (payload.digit === "," && state.currentOperand.includes(",")){
        /*previne de adicionar mais de uma virgula ao operando */
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

  case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null){
        /*se o operando está vazio e mesmo assim clicar em uma operação o retorno é o proprio state que está vazio */
        return state
      }

      if(state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation, 
          previousOperand: state.currentOperand,  /*o <previousOperand> recebe o valor de <CurrentOperand>, ele "sobe"*/
          currentOperand: null, /*depois que o valor de <currentOperand> sobe para <previousOperand>, o valor de <currentOperand> é esvaziado para que receba um novo input do usuario*/

          /*pega o valor do CurrentOperand e passa para o PreviousOperand*/
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),  
        operation: payload.operation,
        currentOperand: null
      }

  case ACTIONS.CLEAR:
    return {}
    /*'return{}' simplesmente esvazia */
  }
}

function evaluate({currentOperand, previousOperand, operation}){
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return ""
}


function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer,{})

  
/*REDUCER:
  agrupa várias funções que modificam o state em um só bloco utilizando a função 'switch', invés de ter várias funções de state soltas.

  DISPATCH:
  função que é convocada para atualizar o state
*/


  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand} {operation}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button>DEL</button>
      <OperationButton operation={"÷"} dispatch={dispatch}></OperationButton>
      <DigitButton digit={"1"} dispatch={dispatch}></DigitButton>
      <DigitButton digit={"2"} dispatch={dispatch}></DigitButton>
      <DigitButton digit={"3"} dispatch={dispatch}></DigitButton>
      <OperationButton operation={"*"} dispatch={dispatch}></OperationButton>
      <DigitButton digit={"4"} dispatch={dispatch}></DigitButton>
      <DigitButton digit={"5"} dispatch={dispatch}></DigitButton>
      <DigitButton digit={"6"} dispatch={dispatch}></DigitButton>
      <OperationButton operation={"+"} dispatch={dispatch}></OperationButton>
      <DigitButton digit={"7"} dispatch={dispatch}></DigitButton>
      <DigitButton digit={"8"} dispatch={dispatch}></DigitButton>
      <DigitButton digit={"9"} dispatch={dispatch}></DigitButton>
      <OperationButton operation={"-"} dispatch={dispatch}></OperationButton>
      <DigitButton digit={","} dispatch={dispatch}></DigitButton>
      <DigitButton digit={"0"} dispatch={dispatch}></DigitButton>
      <button className='span-two'>=</button>
    </div>
    
  );
}

export default App;
