import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegHeart, FaHeart } from "react-icons/fa";

const LikeButton = ({isLike, handleLike, handleUnLike}) => {
    return (
        <>
            {
                isLike  
                ? <span onClick={handleUnLike}><FaHeart  style={{color: 'red'}}/></span>
                : 
                <span onClick={handleLike}><FaRegHeart  /></span>
            }
        </>
    )
}

export default LikeButton
