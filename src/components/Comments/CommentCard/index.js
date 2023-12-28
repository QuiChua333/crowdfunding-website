import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import classNames from 'classnames/bind'
import LikeButton from '../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import CommentMenu from '../CommentMenu'
import customAxios from '~/utils/customAxios'
import InputComment from '../InputComment'
import styles from '../comment.module.scss'
import { setLoading } from '~/redux/slides/GlobalApp'
import baseURL from '~/utils/baseURL'
const cx = classNames.bind(styles)
const CommentCard = ({ children, comment, campaign, commentId, setListComments, handleRemoveComment}) => {
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    console.log(comment)
    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)

    const [onEdit, setOnEdit] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const [onReply, setOnReply] = useState(false)


    useEffect(() => {
        setContent(comment.content)
        setIsLike(false)
        setOnReply(false)
        if (comment.likes.find(like => like._id === currentUser._id)) {
            setIsLike(true)
        }
    }, [comment, currentUser._id])

    const handleUpdate = async() => {
        if(comment.content !== content){
            dispatch(setLoading(true))
            try {
                const res = await customAxios.patch(`${baseURL}/comment/updateComment/${comment._id}`,{content})
                setListComments(prev => [...prev].map(item => {
                    if (item._id === comment._id) {
                        return {
                            ...item,
                            content
                        }
                    }
                    else return item
                }))
                setOnEdit(false)
                dispatch(setLoading(false))
            } catch (error) {
                dispatch(setLoading(false))
            }
         
        }else{
            setOnEdit(false)
        }
    }


    const handleLike = async () => {
        if(loadLike) return;
        setLoadLike(true)

        try {
            const res = await customAxios.patch(`${baseURL}/comment/likeComment/${comment._id}`,{})

            setListComments(prev => [...prev].map(item => {
                if (item._id === comment._id) {
                    return {...item, likes: [...item.likes, currentUser]}
                }
                else return item
            }))
            setLoadLike(false)
        } catch (error) {
            
        }
        
    }

    const handleUnLike = async () => {
        if(loadLike) return;
        setLoadLike(true)

        try {
            const res = await customAxios.patch(`${baseURL}/comment/unLikeComment/${comment._id}`,{})

            setListComments(prev => [...prev].map(item => {
                if (item._id === comment._id) {
                    return {...item, likes: [...item.likes].filter(i => i._id !== currentUser._id)}
                }
                else return item
            }))
            setLoadLike(false)
        } catch (error) {
            
        }
    }


    const handleReply = () => {
        if(onReply) return setOnReply(false)
        setOnReply({...comment, commentId})
    }

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }

    return (
        <div className={cx('comment_card')} style={styleCard}>
            <Link to={`/individuals/${comment.user._id}/profile`} style={{ display: 'flex', color: '#212121' }}>
                <img src={comment.user.avatar?.url} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} />
                <h6 style={{ margin: '0 4px' }}>{comment.user.fullName}</h6>
            </Link>

            <div className={cx('comment_content')}>
                <div
                    style={{
                        filter: 'invert(0)',
                        color: '#111',
                        flex: '1'
                    }}>
                    {
                        onEdit
                            ? <textarea rows="5" value={content}
                                onChange={e => setContent(e.target.value)} />

                            : <div>
                                {
                                    comment.tag && comment.tag._id !== comment.user._id &&
                                    <Link to={`/profile/${comment.tag._id}`} style={{ marginRight: '4px' }}>
                                        @{comment.tag.fullName}
                                    </Link>
                                }
                                <span>
                                    {
                                        content.length < 100 ? content :
                                            readMore ? content + ' ' : content.slice(0, 100) + '....'
                                    }
                                </span>
                                {
                                    content.length > 100 &&
                                    <span className={cx('readMore')} onClick={() => setReadMore(!readMore)}>
                                        {readMore ? 'Hide content' : 'Read more'}
                                    </span>
                                }
                            </div>
                    }


                    <div style={{ cursor: 'pointer' }}>
                        <small className="text-muted mr-3">
                            {moment(comment.createdAt).fromNow()}
                        </small>

                        <small className="font-weight-bold mr-3">
                            {comment.likes.length} likes
                        </small>

                        {
                            onEdit
                                ? <>
                                    <small className="font-weight-bold mr-3"
                                        onClick={handleUpdate}>
                                        update
                                    </small>
                                    <small className="font-weight-bold mr-3"
                                        onClick={() => setOnEdit(false)}>
                                        cancel
                                    </small>
                                </>

                                : <small className="font-weight-bold mr-3"
                                    onClick={handleReply}>
                                    {onReply ? 'cancel' : 'reply'}
                                </small>
                        }

                    </div>

                </div>



                <div className={cx('action')}>
                    <CommentMenu campaign={campaign} comment={comment} setOnEdit={setOnEdit} handleRemoveComment={handleRemoveComment} />
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                </div>
            </div>

            {
                onReply &&
                <InputComment onReply={onReply} setOnReply={setOnReply} campaign={campaign} setListComments={setListComments}>
                    <Link to={`/profile/${onReply.user._id}`} style={{marginRight: '4px'}}>
                        @{onReply.user.fullName}:
                    </Link>
                </InputComment>
            }

            {children}
        </div>
    )
}

export default CommentCard
