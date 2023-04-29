import React from 'react'
import { Image } from 'react-bootstrap'
const Title = (props) => {
  return (
    <div className='d-flex align-items-center  title_container'>
        <Image src={props.userImage} alt="user image"/>
        <p className='username'>{props.username}</p>
        {props.label && <p className='user_label'>{props.label}</p>}
        <p className='date'>{props.createdAt}</p>
    </div>
  )
}

export default Title