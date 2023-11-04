import classNames from "classnames/bind";

import styles from './DropDown.module.scss'
const cx = classNames.bind(styles)

function DropDown({ listItem, onClickItem, index }) {

     const handleClickItem = (item) => {
          onClickItem(item, index)
     }
     return (
          <div className={cx('wrapper')}>
               {
                    listItem.map((item, index) => {
                         return <div onClick={() => onClickItem(item)} className={cx('item')} key={index}>
                              {item}
                         </div>
                    })
               }
               
          </div>
     );
}

export default DropDown;