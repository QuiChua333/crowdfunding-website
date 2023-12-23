import classNames from "classnames/bind";

import styles from './Dropdown.module.scss'
const cx = classNames.bind(styles)

function DropDown({ menu, onClickItem, index }) {
    const handleClickItem = (item) => {
        onClickItem(item,index)
    }
    return (
        <div className={cx('wrapper')}>
           <div className={cx('action')}>
                Xem thành viên
           </div>
           <div style={{height: '1px', background: '#ccc'}}></div>
           <div className={cx('action','action-delete')}>
                Báo cáo vi phạm
           </div>
        </div>
    );
}

export default DropDown;