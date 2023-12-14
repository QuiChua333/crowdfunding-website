
import classNames from "classnames/bind";
import styles from '../ComplaintTable.module.scss'
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { PiDotsThreeBold } from "react-icons/pi";
import DropDown from "../Dropdown";
import { useRef, useState, useEffect } from "react";



const cx = classNames.bind(styles)
function ComplaintRow({ index , item, setChecked }) {

    const [openDropDown, setOpenDropDown] = useState(false);
    const docElement = useRef(null)
    const handleClickChecked = (e,index) => {
        e.stopPropagation()
        setChecked(index,!item.isChecked)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (docElement.current && !docElement.current.contains(event.target)) {
                setOpenDropDown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [docElement]);

    return (   
            <tr>
                <td className={cx('checkbox')}>
                    <span onClick={(e) => handleClickChecked(e,index)}>
                        {
                            !item.isChecked ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                        }
                    </span>
                </td>
                <td style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '300px'}}>{item.title}</td>
                <td>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img className={cx('avatar')} src={item.user.avatar} alt="avt"/>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', alignItems: 'flex-start'}}>
                            <span style={{fontSize: '17px'}}>{item.user.name}</span>
                            <span style={{fontSize: '10px', fontStyle: 'italic'}}>{item.user.email}</span>
                        </div>
                    </div>
                </td>
                <td>{item.date}</td>
                <td>Chưa phản hồi</td>
                <td className={cx('action')}>
                    <div className={cx('action-doc')} onClick={(e) => {e.stopPropagation();setOpenDropDown(prev => !prev)}} ref={docElement}>
                        <PiDotsThreeBold style={{ fontSize: '20px', color: '#7a69b3' }} />
                        <div className={cx('dropdown-wrapper')} style={{ display: openDropDown && 'block' }}>
                            <DropDown />
                        </div>
                    </div>
                </td>
            </tr>
     
    );
}

export default ComplaintRow;