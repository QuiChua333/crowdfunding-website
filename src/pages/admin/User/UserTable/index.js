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
            isVerify: false,
            isActive: true,
            isChecked: false,
        },
        {
            id: '2',
            name: 'Huỳnh Ngọc quí',
            email: '21520417@gm.uit.edu.vn',
            isVerify: true,
            isActive: true,
            isChecked: false,
        },
        {
            id: '3',
            name: 'Lê Quang Nhân',
            email: '21520412@gm.uit.edu.vn',
            isVerify: true,
            isActive: false,
            isChecked: false,
        },
        {
            id: '4',
            name: 'Nguyễn Văn Phát',
            email: 'phat@gm.uit.edu.vn',
            isVerify: false,
            isActive: false,
            isChecked: false,
        }
    ];
    const [listUser, setListUser] = useState([...listUserDefault]);
    const [isCheckAll, setCheckAll] = useState(false);

    const handleClickCheckALl = () => {
        setCheckAll((prev) => !prev);
        setListUser((prev) => {
            const nextState = [...prev].map((item, index) => {
                return { ...item, isChecked: !isCheckAll };
            });
            return nextState;
        });
    };
    const handleSetChecked = (indexChange, checked) => {
        setListUser((prev) => {
            const nextState = [...prev].map((item, index) => {
                if (index === indexChange) {
                    return { ...item, isChecked: checked };
                } else return { ...item };
            });
            return nextState;
        });
    };
    useEffect(() => {
        const checkAll = listUser.every((item) => item.isChecked === true);
        setCheckAll(checkAll);
    }, [listUser]);



  return (
    <div className={cx('wrapper')}>
            <table>
                <thead>
                    <th className={cx('checkbox')}>
                        <span onClick={handleClickCheckALl}>
                            {!isCheckAll ? (
                                <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} />
                            ) : (
                                <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                            )}
                        </span>
                    </th>
                    <th>HỌ VÀ TÊN</th>
                    <th>ĐỊA CHỈ EMAIL</th>
                    <th>THÔNG TIN XÁC MINH</th>
                    <th>TRẠNG THÁI HOẠT ĐỘNG</th>
                    <th></th>
                </thead>
                <tbody>
                    {listUser.map((item, index) => {
                        return <UserRow key={index} item={item} index={index} setChecked={handleSetChecked} />;
                    })}
                </tbody>
            </table>
        </div>
  )
}

export default UserTable