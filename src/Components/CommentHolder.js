import React, { useContext } from 'react'
// import { data } from "../data"
import Comment from './Comment'
import AddCommentForm from './AddCommentForm'
import UserIcon from "../images/avatars/image-juliusomo.png";
import CustomHook from '../Hooks/CustomHook';
const CommentHolder = (props) => {

    const Data = React.useContext(CustomHook)
    console.log(Data)
    const comments = Data.commentData?.map((comment, index) => {
        return (
            <div className='holder'>
                <Comment
                    key={index}
                    comment={comment}
                />
                {comment.replies.length>0 &&
                <div className='reply_container'>
                    {comment.replies.map((reply, index) => {
                        return (

                            <Comment
                                key={index}
                                comment={reply}
                            />
                        )
                    })}
                </div>}
            </div>
        )
    })
    return (
        <div className='comment_holder_container'>
            {comments}

            <AddCommentForm
                profile = {UserIcon}
            />
        </div>
    )
}

export default CommentHolder