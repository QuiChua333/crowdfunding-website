import classNames from "classnames/bind";

import styles from './Dropdown.module.scss'
const cx = classNames.bind(styles)

function DropDown({ menu, onClickItem, index, campaign}) {
    const handleClickItem = (item) => {
        onClickItem(item,index)
    }
    return (
        <div className={cx('wrapper')}>
           <div className={cx('action')} onClick={() => window.location.href = `/campaigns/${campaign.id}/edit/basic`}>
                Xem và chỉnh sửa dự án
           </div>
           <div className={cx('action')}>
                Tạm ngưng dự án
           </div>
           <div style={{height: '1px', background: '#ccc'}}></div>
           <div className={cx('action','action-delete')}>
                Xóa dự án
           </div>
        </div>
    );
}

export default DropDown;