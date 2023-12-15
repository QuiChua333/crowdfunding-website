import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import Search from '~/pages/admin/components/Search/index.js';
const cx = classNames.bind(styles);

function Contributes() {
    const [textSearch, setTextSearch] = useState('');
    useEffect(() => {
        console.log(textSearch);
    }, [textSearch]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <Link to={'/individuals/:id/profile'} className={cx('nav-item', 'active')}>
                    <span>
                        <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
                        View Profile
                    </span>
                </Link>
                <Link to={`/individuals/:id/edit/profile`} className={cx('nav-item')}>
                    <span>
                        {' '}
                        <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
                        Edit Profile & Settings
                    </span>
                </Link>
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
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <h2 style={{ fontWeight: '600', fontSize: '24px' }}>Những đóng góp của tôi</h2>
                            <div style={{ width: '40%', marginTop: '20px' }}>
                                <Search className={cx('search')} handleChangeInput={(value) => setTextSearch(value)} />
                            </div>
                            <table className={cx('table-campaigns')}>
                                <thead>
                                    <th>Ngày</th>
                                    <th>Chiến dịch</th>
                                    <th>Tổng tiền</th>
                                    <th>Quà tặng</th>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5, 6, 7].map((item) => {
                                        return (
                                            <tr>
                                                <td>11/12/2023</td>
                                                <td>DỰ ÁN XÂY 1200 BIỆT THỰ ĐỂ NUÔI 1200 CON GÀ CON</td>
                                                <td>50.000.000 đ</td>
                                                <td>Điện thoại thông tminh cải tiên ip19</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contributes;
