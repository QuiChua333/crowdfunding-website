
import classNames from "classnames/bind";

import styles from '../PerkTable.module.scss'
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { PiDotsThreeBold } from "react-icons/pi";
import DropDown from "../DropDown";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const cx = classNames.bind(styles)
function PerkRow({ index , perk, setChecked }) {
    const [openDropDown, setOpenDropDown] = useState(false);
    const docElement = useRef(null)
    const navigate = useNavigate();
    const handleClickChecked = (e,index) => {
        e.stopPropagation()
        setChecked(index,!perk.isChecked)
    }
    const handleClickPerk = () => {
        navigate('/campaigns/:id/edit/perks/new')
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
        
            <tr onClick={handleClickPerk}>
                  {/* <Link to='/campaigns/:id/edit/perks/new' style={{position: 'relative', zIndex: '10'}}></Link> */}
                <td className={cx('checkbox')}>
                    <span onClick={(e) => handleClickChecked(e,index)}>
                        {
                            !perk.isChecked ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                        }
                    </span>
                </td>
                <td className={cx('title')}>{perk.title}</td>
                <td className={cx('price')}>$ {perk.price}</td>
                <td className={cx('type')}>
                    {perk.type &&
                        <span className={cx('featured')}>
                            FEATURED
                        </span>
                    }
                </td>
                <td className={cx('quantity')}>{perk.qtyClaimed}</td>
                <td className={cx('est')}>{perk.est}</td>
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

export default PerkRow;