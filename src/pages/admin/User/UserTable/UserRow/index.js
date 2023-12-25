import React from 'react';

import classNames from 'classnames/bind';
import styles from './UserRow.module.scss';
import { IoSquareOutline, IoCheckboxSharp } from 'react-icons/io5';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from '../Dropdown';
import { useRef, useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function UserRow({ index, item, setChecked }) {
    const [openDropDown, setOpenDropDown] = useState(false);
    const docElement = useRef(null);
    const handleClickChecked = (e, index) => {
        e.stopPropagation();
        setChecked(index, !item.isChecked);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (docElement.current && !docElement.current.contains(event.target)) {
                setOpenDropDown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [docElement]);

    return (
        <tr>
            <td className={cx('checkbox')}>
                <span onClick={(e) => handleClickChecked(e, index)}>
                    {!item.isChecked ? (
                        <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} />
                    ) : (
                        <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                    )}
                </span>
            </td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td style={{ width: '300px', textAlign: 'center' }}>
                {item.isVerify ? (
                    <div className={cx('verify')}>Đã xác minh</div>
                ) : (
                    <div className={cx('unverify')}>Chưa xác minh</div>
                )}
            </td>
            <td>
                {item.isActive ? (
                    <div className={cx('status-active')}>Đang hoạt động</div>
                ) : (
                    <div className={cx('status-unactive')}>Đang bị khóa</div>
                )}
            </td>
            <td className={cx('action')}>
                <div
                    className={cx('action-doc')}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropDown((prev) => !prev);
                    }}
                    ref={docElement}
                >
                    <PiDotsThreeBold style={{ fontSize: '20px', color: '#7a69b3' }} />
                    <div className={cx('dropdown-wrapper')} style={{ display: openDropDown && 'block' }}>
                        <DropDown item={item}/>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default UserRow;
