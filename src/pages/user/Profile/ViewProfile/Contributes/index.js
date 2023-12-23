import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import Search from '~/pages/admin/components/Search/index.js';
import formatMoney from '~/utils/formatMoney';
import Filter from '~/pages/admin/components/Filter';
const cx = classNames.bind(styles);

function Contributes() {
    const [textSearch, setTextSearch] = useState('');
    useEffect(() => {
        console.log(textSearch);
    }, [textSearch]);
    const handleClickItemFilter = (item) => {
        console.log(item)
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <a className={cx('nav-item', 'active')}>
                    <span>
                        <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
                        Xem hồ sơ cá nhân
                    </span>
                </a>
                <a className={cx('nav-item')}>
                    <span>
                        {' '}
                        <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
                        Chỉnh sửa hồ sơ & Cài đặt
                    </span>
                </a>
            </div>

            <div className={cx('body')}>
                <h1 className={cx('header-name')}>Phan Trọng Tính</h1>

                <div className={cx('content')}>
                    <div className={cx('tabpanel')}>
                        <Link to="/individuals/:id/profile" className={cx('tab')}>
                            Hồ sơ
                        </Link>
                        <Link to="/individuals/:id/campaigns" className={cx('tab')}>
                            Chiến dịch
                        </Link>
                        <Link to="/individuals/:id/contributions" className={cx('tab', 'active')}>
                            Đóng góp
                        </Link>
                    </div>

                    <div className={cx('container-body-profile')}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <h2 style={{ fontWeight: '600', fontSize: '24px' }}>Những đóng góp của tôi</h2>
                            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                <div style={{ width: '50%'}}>
                                    <Search className={cx('search')} handleChangeInput={(value) => setTextSearch(value)} />
                                    <div style={{marginTop: '10px'}}>Kết quả: 10</div>
                                </div>
                                <select style={{padding: '10px 30px', outline: 'none', border: '1.5px solid #c8c8c8'}}>
                                    <option selected value="All">Tất cả</option>
                                    <option value="Received">Đã nhận</option>
                                    <option value="UnReceived">Chưa nhận</option>
                                </select>
                            </div>
                            <table className={cx('table-campaigns')}>
                                <thead>
                                    <th>Ngày</th>
                                    <th>Chiến dịch</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Chi tiết</th>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5, 6, 7].map((item) => {
                                        return (
                                            <tr>
                                                <td>11/12/2023</td>
                                                <td>
                                                    <a href='/'>DỰ ÁN XÂY 1200 BIỆT THỰ ĐỂ NUÔI 1200 CON GÀ CON</a>
                                                </td>
                                                <td>{formatMoney(5000000)}</td>
                                                <td>Đã nhận</td>
                                                <td>
                                                    <div className={cx('btn-detail')}>Xem chi tiết</div>
                                                </td>
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
