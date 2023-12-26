import React from 'react'
import classNames from 'classnames/bind';
import styles from './UserTable.module.scss';
import { IoSquareOutline, IoCheckboxSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import UserRow from './UserRow';
const cx = classNames.bind(styles)

function UserTable({allUsers, handleStatusUser}) {

    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        setListUser(allUsers);
    }, [allUsers])

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
                    {listUser?.map((item, index) => {
                        return <UserRow key={index} user={item} index={index} handleStatusUser={handleStatusUser}/>;
                    })}
                </tbody>
            </table>
        </div>
  )
}

export default UserTable