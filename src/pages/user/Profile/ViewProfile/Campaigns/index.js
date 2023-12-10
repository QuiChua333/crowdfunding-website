import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import defaultAvatar from '~/assets/images/defaultAvt.png';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCampaign from './ItemCampaign';
const cx = classNames.bind(styles);
function ViewCampaigns() {
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
                        <Link to="/individuals/:id/campaigns" className={cx('tab', 'active')}>
                            Campaigns
                        </Link>
                        <Link to="/individuals/:id/contributions" className={cx('tab')}>
                            Contributions
                        </Link>
                    </div>

                    <div style={{ marginTop: '32px' }}>
                        <div style={{ fontSize: '24px', fontWeight: '500', lineHeight: '35px', marginBottom: '16px' }}>
                            Dự án của tôi
                        </div>
                        {[1, 2, 3].map((item, index) => {
                            return <ItemCampaign />;
                        })}
                        <div className={cx('show-more')}>
                            <span>Show more</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '32px' }}>
                        <div style={{ fontSize: '24px', fontWeight: '500', lineHeight: '35px', marginBottom: '16px' }}>
                            Dự án tôi là thành viên
                        </div>
                        {[1, 2, 3].map((item, index) => {
                            return <ItemCampaign />;
                        })}
                        <div className={cx('show-more')}>
                            <span>Show more</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCampaigns;
