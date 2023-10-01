import classNames from 'classnames/bind';
import styles from './Header.module.scss'
const cx = classNames.bind(styles);
// Component dùng chung
function Header() {
    return ( 
        <div className={cx('wrapper')}>
            
        </div>
    );
}

export default Header;