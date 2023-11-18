import classNames from "classnames/bind";

import styles from './DropDown.module.scss'
const cx = classNames.bind(styles)

function DropDown({ listItem, onClickItem, index, style }) {

     const handleClickItem = (item) => {
          onClickItem(item, index)
     }
     return (
          <div className={cx('wrapper')} style={style}>
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