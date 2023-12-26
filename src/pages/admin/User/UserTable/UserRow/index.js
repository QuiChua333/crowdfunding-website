import React from 'react';

import classNames from 'classnames/bind';
import styles from './UserRow.module.scss';
import { IoSquareOutline, IoCheckboxSharp } from 'react-icons/io5';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from '../Dropdown';
import { useRef, useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function UserRow({ index, item }) {
    const [openDropDown, setOpenDropDown] = useState(false);
    const docElement = useRef(null);
   
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
            <td>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img className={cx('avatar')} src="https://png.pngtree.com/png-clipart/20190629/original/pngtree-vector-administration-icon-png-image_4090499.jpg" alt="avt" />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '10px',
                            alignItems: 'flex-start',
                        }}
                    >
                        <span style={{ fontSize: '14px' }}>{item.name}</span>
                        <span style={{ fontSize: '10px', fontStyle: 'italic' }}>{item.email}</span>
                    </div>
                </div>
            </td>
            <td>{item.phone}</td>
            <td>096203012684</td>
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
