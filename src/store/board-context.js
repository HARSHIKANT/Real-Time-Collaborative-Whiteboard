import { createContext } from "react";

const boardContext = createContext({
    activeToolItem: "",
    elements: [],
    boardMouseDownHandler: () => {},
    changeToolHandler: () => {},
    boardMouseMoveHandler: () => {}
})

export default boardContext;