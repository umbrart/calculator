import React from "react";
import { ACTIONS } from "./App";

export default function operationButton ({dispatch, operation}){
    return (
        <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}> {operation} </button>
    )
}


/*ENTENDER POR QUE OS SIMBOLOS DE OPERACAO SUMIRAM 

RESOLVIDO: 
    as props 'dispatch' e 'operation' estavam sendo passadas como parâmetros da função, e não como tipagens { x, y }

*/