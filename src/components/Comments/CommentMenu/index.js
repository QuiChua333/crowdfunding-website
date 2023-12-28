import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'
// import { deleteComment } from '../../../redux/actions/commentAction'
import { BsThreeDotsVertical } from "react-icons/bs";
const CommentMenu = ({ campaign, comment, setOnEdit, handleRemoveComment }) => {
    const currentUser = useSelector(state => state.user.currentUser)
    // const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    console.log('day la menu',campaign.owner)
    const handleRemove = () => {
        if(campaign.owner._id === currentUser._id || comment.user._id === currentUser._id){
            handleRemoveComment(comment)
        }
    }

    const MenuItem = () => {
        return (
            <>
                <div>

                </div>
                <div  onClick={() => setOnEdit(true)}>
                    <span >Edit</span> 
                </div>
                <div  onClick={handleRemove}>
                    <span>Remove</span> 
                </div>
            </>
        )
    }


    return (
        <div>
            {
                (campaign.owner._id === currentUser._id || comment.user._id === currentUser._id) &&
                <div >
                    <span >
                        <BsThreeDotsVertical />
                    </span>

                    <div >
                        {
                            campaign.owner._id === currentUser._id
                                ? comment.user._id === currentUser._id
                                    ? MenuItem()
                                    : <div onClick={handleRemove}>
                                        <span>Remove</span>
                                    </div>
                                : comment.user._id === currentUser._id && MenuItem()
                        }
                    </div>

                </div>
            }

        </div>
    )
}

export default CommentMenu
