import classNames from "classnames/bind";

import styles from './PerkTable.module.scss'
import PerkRow from "./PerkRow";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { useEffect, useState } from "react";


const cx = classNames.bind(styles)

function PerkTable({onPerkTableChange}) {
    const listPerkDefault = [
        {
            title: 'Bộ trang phục thể thao',
            price: 50,
            type: 'A',
            qtyClaimed: '20/24',
            est: 'May 2024',
            isChecked: false
        },
        {
            title: 'Bộ trang phục thể thao',
            price: 50,
            type: '',
            qtyClaimed: '20/24',
            est: 'May 2024',
            isChecked: false
        },
        {
            title: 'Bộ trang phục thể thao',
            price: 50,
            type: '',
            qtyClaimed: '20/24',
            est: 'May 2024',
            isChecked: false
        },
        {
            title: 'Bộ trang phục thể thao',
            price: 50,
            type: '',
            qtyClaimed: '20/24',
            est: 'May 2024',
            isChecked: false
        }
    ]
    const [listPerk,setListPerk] = useState([...listPerkDefault]);
    const [isCheckAll,setCheckAll] = useState(false) 

    
    const handleClickCheckALl = () => {
        setCheckAll(prev => !prev);
        setListPerk(prev => {
            const nextState = [...prev].map((item,index) => {
                    return {...item, isChecked: !isCheckAll}
            })
            return nextState;
        })
    }
    const handleSetChecked = (indexChange,checked) => {
        setListPerk(prev => {
            const nextState = [...prev].map((item,index) => {
                if (index===indexChange) {
                    return {...item, isChecked: checked}
                }
                else return {...item}
            })  
            return nextState;
        })
    }
    useEffect(()=> {
        const checkAll = listPerk.every(item => item.isChecked === true);
        setCheckAll(checkAll)
  
        onPerkTableChange([...listPerk])

    },[listPerk])
    
    return (
        <div className={cx('wrapper')}>
            <table>
                <thead>
                    <tr>
                        <th className={cx('checkbox')}>
                            <span onClick={handleClickCheckALl}>
                                {
                                    !isCheckAll ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                                }
                            </span>
                        </th>
                        <th className={cx('title')}>TITLE</th>
                        <th className={cx('price')}>PRICE</th>
                        <th className={cx('type')}>TYPE</th>
                        <th className={cx('quantity')}>QTY CLAIMED</th>
                        <th className={cx('est')}>EST. DELIVERY</th>
                        <th className={cx('action')}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listPerk.map((item, index) => {
                            return <PerkRow key={index} perk={item} index={index} setChecked={handleSetChecked}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default PerkTable;