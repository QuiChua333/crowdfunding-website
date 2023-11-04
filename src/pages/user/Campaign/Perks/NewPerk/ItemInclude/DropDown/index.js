import classNames from "classnames/bind";
import styles from './DropDown.module.scss'
import { useEffect, useState } from "react";
const cx = classNames.bind(styles)

function DropDown({ listItemInclude, onClickItem, index, setOpenModalItem, setOptionEdit }) {
     const [listItemIncludeName, setListItemIncludeName] = useState([]);
     useEffect(() => {
          setListItemIncludeName(prev => {
               const nextState = [...listItemInclude].map((item, index) => {
                    return item.itemName;
               })
               return nextState;
          })
     }, [])
     const handleClickItem = (item) => {
          onClickItem(item, index)
     }
     return (
          <div className={cx('wrapper')}>
               {
                    listItemIncludeName.map((item, index) => {
                         return <div onClick={() => onClickItem({ ...listItemInclude[index] })} className={cx('item')} key={index}>
                              {item}
                         </div>
                    })
               }

               <div style={{padding: '20px 0', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center'}}>
                    <div onClick={() => {setOptionEdit({type:'update', index: index});setOpenModalItem(true)}} className={cx('btn','btn-ok')}>CREATE NEW ITEM</div>
               </div>

          </div>
     );
}

export default DropDown;