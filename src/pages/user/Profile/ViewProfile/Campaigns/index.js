import classNames from "classnames/bind";
import styles from '../../Profile.module.scss'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import defaultAvatar from '~/assets/images/defaultAvt.png'
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ItemCampaign from "./ItemCampaign";
const cx = classNames.bind(styles);
function ViewCampaigns() {
   
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <a className={cx('nav-item', 'active')}>
                    <span><MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />View Profile</span>
                </a>
                <a className={cx('nav-item')}>
                    <span> <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />Edit Profile & Settings</span>
                </a>
            </div>

            <div className={cx('body')}>
                <h1 className={cx('header-name')}>Huỳnh Ngọc Quí</h1>

                <div className={cx('content')}>
                    <div className={cx('tabpanel')}>
                        <Link to='/individuals/:id' className={cx('tab')}>
                            Profile
                        </Link>
                        <Link to='#' className={cx('tab', 'active')}>
                            Campaigns
                        </Link>
                        <Link to='/individuals/:id/contributions' className={cx('tab')}>
                        Contributions
                        </Link>
                    </div>

                   <div style={{marginTop: '32px'}}>
                        {
                            [1,2,3].map((item,index) => {
                                return <ItemCampaign />
                            })
                        }
                   </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCampaigns;