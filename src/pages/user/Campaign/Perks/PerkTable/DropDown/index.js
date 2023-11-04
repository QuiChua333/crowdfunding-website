import classNames from "classnames/bind";

import styles from './DropDown.module.scss'
const cx = classNames.bind(styles)

function DropDown({ menu, onClickItem, index }) {
    const handleClickItem = (item) => {
        onClickItem(item,index)
    }
    return (
        <div className={cx('wrapper')}>
           <div className={cx('action')}>
                Duplicate Perk
           </div>
           <div className={cx('action')}>
                Set as featured perk
           </div>
           <div className={cx('action')}>
                Duplicate Perk
           </div>
           <div style={{height: '1px', background: '#ccc'}}></div>
           <div className={cx('action','action-delete')}>
                Delete perk
           </div>
        </div>
    );
}

export default DropDown;