
import classNames from "classnames/bind";

import styles from '../ItemTable.module.scss'
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const cx = classNames.bind(styles)
function ItemRow({ index, item }) {
    const navigate = useNavigate();
    const [options, setOptions] = useState(() => {
        const str = item.listOption.map(i => {
            return (i.name + ' (' + i.value.join(', ') + ')')
        }).join(', ');
        return str;
    });
    const handleClickItem = () => {
        navigate('/campaigns/:id/edit/items/new')
    }

    return (

        <tr onClick={handleClickItem}>
            {/* <Link to='/campaigns/:id/edit/perks/new' style={{position: 'relative', zIndex: '10'}}></Link> */}

            <td className={cx('name')}>{item.itemName}</td>
            <td className={cx('option')}>{options} </td>
            <td className={cx('associated')}>{item.associatedPerks}</td>

        </tr>

    );
}

export default ItemRow;