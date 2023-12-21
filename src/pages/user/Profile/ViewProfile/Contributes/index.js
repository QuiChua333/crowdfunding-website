import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import Search from '~/pages/admin/components/Search/index.js';
import baseURL from "~/utils/baseURL";
import customAxios from '~/utils/customAxios'
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function Contributes() {
    const { id } = useParams()
    const [textSearch, setTextSearch] = useState('');
    const [user, setUser] = useState({})
    const currentUser = useSelector(state => state.user.currentUser)
    useEffect(() => {
        console.log(textSearch);
    }, [textSearch]);
    const getInfoUser = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/user/getInfoUser/${id}`)
            setUser(res.data.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getInfoUser()
    }, [])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <a href={`/individuals/${id}/profile`} className={cx('nav-item', 'active')}>
                    <span>
                        <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
                        Xem hồ sơ
                    </span>
                </a>
                <a href={`/individuals/${id}/edit/profile`} className={cx('nav-item')}>
                    <span>
                        {' '}
                        <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
                        Chỉnh sửa hồ sơ & Cài đặt
                    </span>
                </a>
            </div>

            <div className={cx('body')}>
                <h1 className={cx('header-name')}>{user.fullName}</h1>

                <div className={cx('content')}>
                    <div className={cx('tabpanel')}>
                        <a href={`/individuals/${id}/profile`} className={cx('tab')}>
                            Hồ sơ
                        </a>
                        <a href={`/individuals/${id}/campaigns`} className={cx('tab')}>
                            Chiến dịch
                        </a>
                        {
                            currentUser._id && currentUser._id === id &&
                            <a href={`/individuals/${id}/contributions`} className={cx('tab', 'active')}>
                                Đóng góp của tôi
                            </a>
                        }
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
