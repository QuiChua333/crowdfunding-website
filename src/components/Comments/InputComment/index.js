import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Icons from '../Icon'
import classNames from 'classnames/bind'
import styles from '../comment.module.scss'
import customAxios from '~/utils/customAxios'
import { useParams } from 'react-router-dom'
import baseURL from '~/utils/baseURL'
import { setLoading } from '~/redux/slides/GlobalApp'
const cx = classNames.bind(styles)
const InputComment = ({ children, setListComments, onReply, setOnReply }) => {
    const {id} = useParams()
    const [content, setContent] = useState('')
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    const handleSubmit =async  (e) => {
        e.preventDefault()
        if (!content.trim()) {
            if (setOnReply) return setOnReply(false);
            return;
        }

        setContent('')

        const newComment = {
            content,
            likes: [],
            user: currentUser,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user

        }
        const data = {...newComment, campaignId: id, postUserId: currentUser._id}
        dispatch(setLoading(true))
        try {
            const res = await customAxios.post(`${baseURL}/comment/createComment`,data)
            // console.log(res.data.data.newComment)
            console.log(res.data.data.newComment)
            setListComments(prev => ([...prev,res.data.data.newComment]))
            dispatch(setLoading(false))
            if(setOnReply) return setOnReply(false);
        } catch (error) {
            dispatch(setLoading(false))
        }

    }

    return (
        <div className={cx('wrapper')}>
            <form  className={cx('comment_input')} onSubmit={handleSubmit} >
                {children}
                <input type="text" placeholder="Add your comments..."
                    value={content} onChange={e => setContent(e.target.value)}
                    style={{
                        filter: 'invert(0)',
                        color: '#111',
                        background: 'rgba(0,0,0,.03)',
                    }} />

                <Icons setContent={setContent} content={content}  />

                <button type="submit"  className={cx('postBtn')}>
                    Post
                </button>
            </form>
        </div>
    )
}

export default InputComment
