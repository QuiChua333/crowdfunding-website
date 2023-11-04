import classNames from "classnames/bind";

import styles from './DropDown.module.scss'
import { useEffect, useState } from "react";
const cx = classNames.bind(styles)

function DropDown({ listItemInclude, onClickItem, index }) {
     const [listItemIncludeName,setListItemIncludeName] = useState([]);
     useEffect(() => {
          setListItemIncludeName(prev => {
               const nextState = [...listItemInclude].map((item,index) => {
                    return item.itemName;
               })
               return nextState;
          })
     },[])
     const handleClickItem = (item) => {
          onClickItem(item, index)
     }
     return (
          <div className={cx('wrapper')}>
               {
                    listItemIncludeName.map((item, index) => {
                         return <div onClick={() => onClickItem({...listItemInclude[index]})} className={cx('item')} key={index}>
                              {item}
                         </div>
                    })
               }
               
          </div>
     );
}

export default DropDown;