import classNames from "classnames/bind";

import styles from './DropDown.module.scss'
const cx = classNames.bind(styles)

function DropDown({ menu, onClickItem, index, perk }) {
     const handleClickItem = (item) => {
          onClickItem(item, index)
     }
     return (
          <div className={cx('wrapper')}>

               {
                    perk.isVisible && <div className={cx('action')}>
                         Đặt thành nổi bật
                    </div>
               }
               <div className={cx('action')}>
                    Chỉnh sửa đặc quyền
               </div>
               {
                    perk.isFeatured && <div className={cx('action')}>
                         Dừng làm nổi bật
                    </div>
               }
               <div style={{ height: '1px', background: '#ccc' }}></div>
               <div className={cx('action', 'action-delete')}>
                    Xóa đặc quyền
               </div>
          </div>
     );
}

export default DropDown;