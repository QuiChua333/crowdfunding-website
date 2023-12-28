import React, { useState, useEffect } from 'react'
import CommentCard from '../CommentCard'

const CommentDisplay = ({comment, replyCm, campaign, setListComments, handleRemoveComment}) => {
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(1)

    useEffect(() => {
        setShowRep(replyCm.slice(replyCm.length - next))
    },[replyCm, next])

    return (
        <div className="comment_display">
            <CommentCard comment={comment} campaign={campaign} commentId={comment._id} setListComments={setListComments}
            handleRemoveComment={handleRemoveComment}>
                <div style={{paddingLeft: '16px'}}>
                    {
                        showRep.map((item, index) => (
                            item.reply &&
                            <CommentCard
                            handleRemoveComment={handleRemoveComment}
                            key={index}
                            comment={item}
                            campaign={campaign}
                            commentId={comment._id}
                            setListComments={setListComments}
                             />
                        ))
                    }

                    {
                        replyCm.length - next > 0
                        ? <div style={{cursor: 'pointer', color: 'crimson'}}
                        onClick={() => setNext(next + 10)}>
                            See more comments...
                        </div>

                        : replyCm.length > 1 &&
                        <div style={{cursor: 'pointer', color: 'crimson'}}
                        onClick={() => setNext(1)}>
                            Hide comments...
                        </div>
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay
