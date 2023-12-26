import React from 'react'
import classNames from 'classnames/bind';
import styles from './UserTable.module.scss';
import { IoSquareOutline, IoCheckboxSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import UserRow from './UserRow';
const cx = classNames.bind(styles)

function UserTable() {

    const listUserDefault = [
        {
            id: '1',
            name: 'Phan Trọng Tính',
            email: '21522683@gm.uit.edu.vn',
            phone: '0379361210',
            isVerify: false,
            isActive: true,
        },
        {
            id: '2',
            name: 'Huỳnh Ngọc quí',
            email: '21520417@gm.uit.edu.vn',
            phone: '0379361210',
            isVerify: true,
            isActive: true,
        },
        {
            id: '3',
            name: 'Lê Quang Nhân',
            email: '21520412@gm.uit.edu.vn',
            phone: '0379361210',
            isVerify: true,
            isActive: false,
        },
        {
            id: '4',
            name: 'Nguyễn Văn Phát',
            email: 'phat@gm.uit.edu.vn',
            phone: '0379361210',
            isVerify: false,
            isActive: false,
        }
    ];
    const [listUser, setListUser] = useState([...listUserDefault]);
   

  return (
    <div className={cx('wrapper')}>
            <table>
                <thead>
                    <th>NGƯỜI DÙNG</th>
                    <th>ĐIỆN THOẠI</th>
                    <th>CĂN CƯỚC</th>
                    <th>THÔNG TIN XÁC MINH</th>
                    <th>TRẠNG THÁI HOẠT ĐỘNG</th>
                    <th></th>
                </thead>
                <tbody>
                    {listUser.map((item, index) => {
                        return <UserRow key={index} item={item} index={index}/>;
                    })}
                </tbody>
            </table>
        </div>
  )
}

export default UserTable