import React from 'react'
import { Button, Image } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import UserIcon from "../images/avatars/image-juliusomo.png";
import CustomHook from '../Hooks/CustomHook';
const AddCommentForm = (props) => {
  const [comment, setComment] = React.useState("")
  const user = JSON.parse(localStorage.getItem("user"))
  const CommentContext = React.useContext(CustomHook)
  console.log("USER",user.userName)
  const handleComment = (e) => {
    console.log(e.target.value)
    if (e.target.value) {
      setComment(e.target.value)
    }
  }
  
  const handleReply = (i) =>{
    let comments = JSON.parse(localStorage.getItem("Comments"))
    let childIndex = comments.findIndex((c)=> c.id === i)

    const obj  = {
      id : nanoid(),
      content : comment ,
      replyingTo : props.replyTo,
      replyId : comments[childIndex].id,
      score : 0,
      replies : [],
      createdAt : "1 days ago",
      user : {
        "image" : {
          "png" : UserIcon,
        },
        username : user.userName
      }
    }
    console.log("OBJ",obj)
    comments[childIndex].replies.push(obj)
    // console.log("CHILD",childIndex)
    // let final_comments = comments.filter((c)=>c.id !== i)

    // final_comments.push(child)

    localStorage.setItem("Comments" , JSON.stringify(comments))
    CommentContext.setCommentData(comments)
    console.log("Comments",comments)

    props.setReply()
  }
  return (
    <div className='d-flex flex-column-reverse flex-md-row add-comment-form'>
      <Image src={UserIcon} alt='profile image' className='userImage' />
      
        <textarea
          rows={10}
          placeholder='Add a comment..'
          onChange={handleComment}
          value={comment}
          className='comment-input'
        />
      <Button className='send_btn' onClick={()=>handleReply(props.replyId || props.id)}>SEND</Button>
    </div>
  )
}

export default AddCommentForm