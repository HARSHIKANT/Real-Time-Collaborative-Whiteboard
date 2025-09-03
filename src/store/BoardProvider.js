import React, { useReducer } from 'react'
import boardContext from './board-context'
import { TOOL_ITEMS } from  "../constants.js"
import rough from "roughjs/bin/rough"

const gen = rough.generator();
const boardReducer = (state,action) => {
    switch (action.type) {
        case "CHANGE_TOOL":
          return { 
            ...state,
            activeToolItem: action.payload.tool
           };
        case "DRAW_DOWN": 
           const { clientX, clientY } = action.payload;
           const newElement = {
            id: state.elements.length,
            x1: clientX,
            y1: clientY,
            x2: clientX,
            y2: clientY,
            roughEle: gen.line(clientX,clientY,clientX,clientY),
           };
           const prevElements = state.elements;
           return {
            ...state,
            elements: [...prevElements,newElement]
           };
        case "DRAW_MOVE":
            const newElements = [...state.elements];
            const index = state.elements.length-1;
            newElements[index].x2 = clientX;
            newElements[index].y2 = clientY;
            newElements[index].roughEle = gen.line(
                newElements[index].x1,
                newElements[index].y1,
                clientX,
                clientY,
            );
            return{
                ...state,
                elements: newElements,
            }

        default:
            return state;
    }
};

const initialBoardState = {
    activeToolItem: TOOL_ITEMS.LINE,
    elements: [],
};

function BoardProvider({children}) {
    const [boardState, dispatchBoardAction] = useReducer(
        boardReducer,
        initialBoardState
    )

    const changeToolHandler = (tool) => {
        dispatchBoardAction({type: "CHANGE_TOOL", paylaod: {
            tool,
        }})
    };

    const boardMouseDownHandler = (event) =>{
        const { clientX, clientY } = event;
        
        dispatchBoardAction({
            type: "DRAW_DOWN",
            payload: {
                clientX,
                clientY,
            },
        })
    };

    const boardMouseMoveHandler = (event) =>{
        const { clientX, clientY } = event;
        
        dispatchBoardAction({
            type: "DRAW_MOVE",
            payload: {
                clientX,
                clientY,
            },
        })
    };

    const boardContextValue = {
        activeToolItem: boardState.activeToolItem,
        elements: boardState.elements,
        changeToolHandler,
        boardMouseDownHandler,
        boardMouseMoveHandler,
    };

  return (
    <boardContext.Provider value = {boardContextValue}>
        {children}
    </boardContext.Provider>
  )
}

export default BoardProvider;