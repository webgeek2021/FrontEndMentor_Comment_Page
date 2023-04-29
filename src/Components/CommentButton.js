import React from 'react'
import { Image,Button } from 'react-bootstrap'
import iconPlus from "../images/icon-plus.svg";
import iconMinus from "../images/icon-minus.svg";

const CommentButton = (props) => {

  return (
    <div className='d-flex comment-btn'>
        <Button onClick={()=>props.handleButtonIncrement()}>
            <Image src={iconPlus} alt="plus icon" />
        </Button>
        <span>{props.count}</span>
        <Button onClick={()=>props.handleButtonDecrement()}>
            <Image src={iconMinus} alt="minus icon" />
        </Button>
    </div>
  )
}

export default CommentButton