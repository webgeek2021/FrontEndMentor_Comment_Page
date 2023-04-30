import React, { useContext } from 'react'
import CommentButton from './CommentButton';
import Title from './Title';
import ReplyIcon from "../images/icon-reply.svg";
import { Button } from 'react-bootstrap';
import DeleteIcon from "../images/icon-delete.svg";
import EditIcon from "../images/icon-edit.svg";
import AddCommentForm from './AddCommentForm';
import DeleteModal from './DeleteModal';
import CustomHook from '../Hooks/CustomHook';
const Comment = (props) => {
    const [count, setCount] = React.useState(props.comment.score || 0)
    const [user,setUser] = React.useState(JSON.parse(localStorage.getItem("user")) || "")
    const [reply , setReply] = React.useState(false)

    const [deleteModal  , setDelete] = React.useState(false)
    const customHook = useContext(CustomHook)

    // console.log("CommentReply" , props.comment )
    const handleButtonIncrement = () => {
        // console.log("INCREMENT")
        setCount(prev => prev + 1)
    }
    const handleButtonDecrement = () => {
        setCount(prev => prev - 1)
    }
    const handleReply = ()=>{
        setReply(prev => !prev)
    }
    const handleClose = ()=>{
        setDelete(prev => !prev )
    }
    const handleDelete = (parentId ,childId) =>{
        // console.log("ParentId" , parentId)
        // console.log("ChildId" , childId)
        
        let comments = customHook.commentData
        let parentIndex = comments.findIndex((c)=>c.id === parentId)
        // console.log("COMMENTS",comments)
        // console.log("PARENTINDEX",comments[parentIndex])
        if(parentIndex !== -1){
            let childs = comments[parentIndex].replies.filter((c) => c.id !== childId)
            // console.log("CHILDS",childs)
            comments[parentIndex].replies = childs

            localStorage.setItem("Comments",JSON.stringify(comments))
            // console.log("AFTER DELETE" , comments)
            customHook.setCommentData(comments)

            setDelete(prev => !prev)

        }

        
    }
    return (
        <>
        <div className='comment_containar'>
            <CommentButton
                handleButtonIncrement={handleButtonIncrement}
                handleButtonDecrement={handleButtonDecrement}
                count={count}
            />
            <div className='content-container'>
                <Title
                    userImage={props.comment.user.image.png}
                    username={props.comment.user.username}
                    createdAt={props.comment.createdAt}
                    label = {props.comment.user.username === user.userName ? "You" : ""}
                />
                {
                    props.comment.replyingTo ?
                        <p className='content'>
                            <span className='replying_to'>@{props.comment.replyingTo}</span>
                            {props.comment.content}
                        </p>
                        :
                        <p className='content'>
                            {props.comment.content}
                        </p>
                }
            </div>
            {
                props.comment.user.username === user.userName ? 
                <div className='user_btn_section'>
                    <Button className='delete_btn' onClick={handleClose}>
                        <img src={DeleteIcon} alt='Delete button' />
                        <span>Delete</span>
                    </Button>
                    <Button className='edit_btn'>
                        <img src={EditIcon} alt='edit button' />
                        <span>Edit</span>
                    </Button>
                </div>
            :

                    <Button className='reply_btn' onClick={handleReply}>
                        <img src={ReplyIcon} alt='reply button' />
                        <span>Reply</span>
                    </Button>
            }

        </div>
        {
            reply && 
            <AddCommentForm 
                replyTo = {props.comment.user.username}
                replyId = {props.comment.replyId}
                id = {props.comment.id}
                setReply = {setReply}
            />

        }
        {
            deleteModal && 
            <DeleteModal 
                show={deleteModal}
                handleClose = {setDelete}
                handleDelete = {handleDelete}
                parentId = {props.comment.replyId}
                childId = {props.comment.id}
            />
        }
        </>
    )
}

export default Comment