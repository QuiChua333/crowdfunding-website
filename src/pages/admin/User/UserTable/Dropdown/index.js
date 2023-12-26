import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
const cx = classNames.bind(styles);

function DropDown({ item, onClickItem, index }) {
    const handleClickItem = (item) => {
        onClickItem(item, index);
    };
    return (
        <div>
            {item.isVerify && item.isActive && (
                <div className={cx('wrapper')}>
                    <div className={cx('action', 'action-delete')}>Khóa tài khoản</div>
                </div>
            )}

            {item.isVerify === false && item.isActive && (
                <div className={cx('wrapper')}>
                    <div className={cx('action')}>Xác minh tài khoản</div>
                    <div style={{ height: '1px', background: '#ccc' }}></div>
                    <div className={cx('action', 'action-delete')}>Khóa tài khoản</div>
                </div>
            )}

            {item.isVerify && item.isActive === false && (
                <div className={cx('wrapper')}>
                    <div className={cx('action', 'action-active')}>Kích hoạt lại</div>
                </div>
            )}

            {item.isVerify === false && item.isActive === false && (
                <div className={cx('wrapper')}>
                    <div className={cx('action')}>Xác minh tài khoản</div>
                    <div style={{ height: '1px', background: '#ccc' }}></div>
                    <div className={cx('action', 'action-active')}>Kích hoạt lại</div>
                </div>
            )}
        </div>
    );
}

export default DropDown;
