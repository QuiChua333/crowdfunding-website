
import classNames from "classnames/bind";
import styles from './ItemCampaign.module.scss'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles);

function ItemCampaign({item}) {
    const {id} = useParams()
    const [showDropDown,setShowDropDown] = useState(false)
    const dropdownElement = useRef()
    const currentUser = useSelector(state => state.user.currentUser)
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownElement.current && !dropdownElement.current.contains(event.target)) {
                setShowDropDown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownElement]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('campaign')}>
                <img src={item.cardImage?.url} />
                <div className={cx('campaign-info')}>
                    <div className={cx('campaign-title-wrapper')}>
                        <h2 className={cx('campaign-title')}>
                            {item.title}   </h2> <span className={cx({banNhap: item.status==='Bản nháp',
                             choXacNhan: item.status==='Chờ xác nhận'})}>  {item.status}</span>
                    </div>
                    <span className={cx('campaign-author')}>
                        by <a>{item.owner?.fullName}</a></span>

                    <p className={cx('campaign-tagline')}>
                        {item.fullName}</p>
                    <span className={cx('campaign-id')}>
                        Campaign ID: {item._id?.substring(10)}</span>
                </div>
            </div>
            <div>
               {
                 currentUser._id && (item.team?.some(x=> { return x.user === currentUser._id && x.isAccepted === true }) || item.owner?._id === currentUser._id) &&
                <div onClick={() => setShowDropDown(prev => !prev)} className={cx('action')} ref={dropdownElement}>
                    <span>Action </span>
                    {
                        !showDropDown &&
                        <FaAngleDown />
                    }
                    {
                        showDropDown &&
                        <FaAngleUp />
                    }

                    <div className={cx('action-dropdown', {show: showDropDown})}>
                        {
                            currentUser._id && (item.owner?._id === currentUser._id || item.team?.some(x => x.user===currentUser._id && x.canEdit === true)) &&
                            <a href="/campaigns/:id/edit/basic">Edit Campaign</a>
                        }
                        <div style={{height: '1px', background: '#ccc'}}></div>
                        {
                            currentUser._id && item.owner?._id === currentUser._id && 
                            <a>Delete Campaign</a>
                        }
                      
                        <div style={{height: '1px', background: '#ccc'}}></div>
                        <a>View contributions</a>
                    </div>
                </div>
               }
            </div>
        </div>
    );
}

export default ItemCampaign;