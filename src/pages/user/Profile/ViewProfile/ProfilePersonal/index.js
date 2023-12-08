import React from 'react'
import classNames from "classnames/bind";
import styles from '../../Profile.module.scss'
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import defaultAvatar from '~/assets/images/defaultAvt.png'
const cx = classNames.bind(styles);


function ProfilePersonal() {
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
                <h1 className={cx('header-name')}>Phan Trọng Tính</h1>

                <div className={cx('content')}>
                    <div className={cx('tabpanel')}>
                        <Link to='/individuals/:id' className={cx('tab', 'active')}>
                            Profile
                        </Link>
                        <Link to='#' className={cx('tab')}>
                            Campaigns
                        </Link>
                        <Link to='/individuals/:id/contributions' className={cx('tab')}>
                            Contributions
                        </Link>
                    </div>

                    <div style={{ marginTop: '32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                        <img style={{width: '460px', height: '285px'}} src={defaultAvatar} alt="img"/>
                        <div style={{width: '40%', textAlign: 'justify'}}>
                            <span>Giới thiệu</span>
                            <p>Tôi hiện là một sinh viên năm 3 tại trường đại học Công Nghệ Thông Tin - UIT, tôi và một người 
                                bạn cộng sự của tôi đang ấp ủ xây dựng một dự án gây quỹ cộng đồng trên nền tảng givefun.com. Mục 
                                đích của dự án là mang lại giá trị hỗ trợ cho việc mua những cơ sở vật chất phục vụ cho việc dạy lập
                                trình cho các bạn học sinh có ước mơ làm việc trong nghành IT tại Việt Nam.
                            </p>
                        </div>
                        <div>
                            <div>
                                <span>Về bản thân tô</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ProfilePersonal