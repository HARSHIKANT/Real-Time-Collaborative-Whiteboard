import React, { useState, useContext } from 'react'
import classes from "./index.module.css"
import cx from "classnames";
import {FaSlash,} from "react-icons/fa"
import { LuRectangleHorizontal } from 'react-icons/lu';
import { TOOL_ITEMS } from '../../constants';
import boardContext from '../../store/board-context';


function Toolbar() {
    const { activeToolItem, handleToolItemClick } = useContext(boardContext)
  return (
    <div className={classes.container}> 
        <div className={cx(classes.toolItem, {[classes.active]: activeToolItem === TOOL_ITEMS.LINE})} onClick={()=>handleToolItemClick("LINE")}><FaSlash/></div>
        <div className={cx(classes.toolItem, {[classes.active]: activeToolItem === TOOL_ITEMS.RECTANGLE})} onClick={()=>handleToolItemClick("RECTANGLE")}><LuRectangleHorizontal/></div>
    </div>
  )
}

export default Toolbar;