import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';

const cx = classNames.bind(styles);


function Contributes() {
  return (
    <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <a className={cx('nav-item', 'active')}>
                    <span>
                        <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
                        View Profile
                    </span>
                </a>
                <a className={cx('nav-item')}>
                    <span>
                        {' '}
                        <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
                        Edit Profile & Settings
                    </span>
                </a>
            </div>

            <div className={cx('body')}>
                <h1 className={cx('header-name')}>Phan Trọng Tính</h1>

                <div className={cx('content')}>
                <div className={cx('tabpanel')}>
                        <Link to="/individuals/:id/profile" className={cx('tab')}>
                            Profile
                        </Link>
                        <Link to="/individuals/:id/campaigns" className={cx('tab')}>
                            Campaigns
                        </Link>
                        <Link to="/individuals/:id/contributions" className={cx('tab', 'active')}>
                            Contributions
                        </Link>
                    </div>

                    <div className={cx('container-body-profile')}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h2 style={{fontWeight: '600', fontSize: '24px'}}>Những đóng góp của tôi</h2>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div className={cx('header-table')}>
                                    
                                </div>
                                <div className={cx('body-table')}>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Contributes