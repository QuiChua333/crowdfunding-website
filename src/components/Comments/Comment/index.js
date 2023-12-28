import React, { useState, useEffect } from 'react'
import CommentDisplay from '../CommentDisplay'
import customAxios from '~/utils/customAxios'
import baseURL from '~/utils/baseURL'
import { useDispatch } from 'react-redux'
import { setLoading } from '~/redux/slides/GlobalApp'
const Comments = ({ campaign, comments, setListComments }) => {
    const [commentsOrigin, setCommentsOrigin] = useState([])
    const [showComments, setShowComments] = useState([])
    const [next, setNext] = useState(2)
    const dispatch = useDispatch()
    const [replyComments, setReplyComments] = useState([])

    useEffect(() => {
        const newCm = comments.filter(cm => !cm.reply)
        setCommentsOrigin(newCm)
        setShowComments(newCm.slice(newCm.length - next))
    }, [comments, next])

    useEffect(() => {
        const newRep = comments.filter(cm => cm.reply)
        setReplyComments(newRep)
    }, [comments])
    const handleRemoveComment = async (comment) => {
        dispatch(setLoading(true))
        try {
            const deleteArr = [...comments.filter(cm => cm.reply === comment._id), comment]
            for (let i = 0; i < deleteArr.length; i++) {
                const res = await customAxios.delete(`${baseURL}/comment/deleteComment/${deleteArr[i]._id}`)
            }
            setListComments(prev => [...prev].filter(cm => !deleteArr.find(da => cm._id === da._id)))
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setLoading(false))
        }

    }
    return (
        <div className="comments">
            {
                showComments.map((comment, index) => (
                    <CommentDisplay key={index} comment={comment} campaign={campaign} setListComments={setListComments}
                        handleRemoveComment={handleRemoveComment}
                        replyCm={replyComments.filter(item => item.reply === comment._id)} />
                ))
            }

            {
                commentsOrigin.length - next > 0
                    ? <div 
                        style={{ cursor: 'pointer', color: '#65676b', padding: '8px', borderTop: '1px solid #eee' }}
                        onClick={() => setNext(next + 10)}>
                        Xem thêm bình luận...
                    </div>

                    : commentsOrigin.length > 2 &&
                    <div 
                  style={{ cursor: 'pointer', color: 'crimson', padding: '8px', borderTop: '1px solid #ccc' }}
                        onClick={() => setNext(2)}>
                        Ẩn bình luận...
                    </div>
            }
        </div>
    )
}

export default Comments
