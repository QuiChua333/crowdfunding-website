import classNames from "classnames/bind";

import styles from './ItemTable.module.scss'
import { useEffect, useState } from "react";
import ItemRow from "./ItemRow";


const cx = classNames.bind(styles)

function ItemTable() {
    const listItemDefault = [
        {
            itemName: 'Bộ trang phục thể thao',
            listOption: [
                {
                    name: 'Size',
                    value: ['S','M','L']
                }
            ],
            associatedPerks: 'Perk1'
        },
        {
            itemName: 'Bộ trang phục thể thao',
            listOption: [
                {
                    name: 'Size',
                    value: ['S','M','L']
                },
                {
                    name: 'Color',
                    value: ['Red','Blue','Yellow','Pink','Backkkkk']
                },
                {
                    name: 'Size',
                    value: ['S','M','L']
                }

            ],
            associatedPerks: 'Perk1'
        },
        {
            itemName: 'Bộ trang phục thể thao',
            listOption: [
                {
                    name: 'Size',
                    value: ['S','M','L']
                }
            ],
            associatedPerks: 'Perk1'
        }
        
    ]
    const [listItem,setListItem] = useState([...listItemDefault]);

    
    
    
    return (
        <div className={cx('wrapper')}>
            <table>
                <thead>
                    <tr>
                       
                        <th className={cx('name')}>Item Name</th>
                        <th className={cx('option')}>Item Options</th>
                        <th className={cx('associated')}>Associated Perks</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {
                        listItem.map((item, index) => {
                            return <ItemRow key={index} item={item} index={index}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ItemTable;