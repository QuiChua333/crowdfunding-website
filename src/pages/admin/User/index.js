import classNames from "classnames/bind";
import styles from './User.module.scss'
const cx = classNames.bind(styles)
function UserManagement() {
    return (
        <div className={cx('wrapper')}>
        quản lý đàn em cho tốt vào
        </div>
    );
}

export default UserManagement;