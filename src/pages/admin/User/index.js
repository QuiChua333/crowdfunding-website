import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useState } from 'react';
import UserTable from './UserTable';
import Filter from '../components/Filter';
import Search from '../components/Search';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
const cx = classNames.bind(styles);

function UserManagement() {
    const [isOpenDropdownAction, setOpenDropdownAction] = useState(false);
    const handleClickItemFilterVerify = (item) => {
        console.log(item);
    };
    const handleClickItemFilterActive = (item) => {
        console.log(item);
    };
    const handleChangeSearchInput = (value) => {
        console.log(value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('table-action')}>
                <div style={{ maxWidth: '600px', width: '500px' }}>
                    <Search handleChangeInput={handleChangeSearchInput} />
                </div>
                <div style={{ display: 'flex', gap: '30px' }}>
                    <Filter
                        listConditions={['Tất cả', 'Đã xác minh', 'Chưa xác minh']}
                        handleClickItem={handleClickItemFilterVerify}
                    />
                    <Filter
                        listConditions={['Tất cả', 'Đang hoạt động', 'Đã bị khóa']}
                        handleClickItem={handleClickItemFilterActive}
                    />
                </div>
            </div>
            <div style={{ marginTop: '40px' }}>
                <div className={cx('table-wrapper')}>
                    <UserTable />
                </div>

                <div className={cx('pagination-wrapper')}>
                    <div className={cx('pagination')}>
                        <span className={cx('icon')}>
                            <FaAngleLeft style={{ color: '#7a69b3' }} />
                        </span>
                        <span className={cx('curent')}>1 của 10</span>
                        <span className={cx('icon')}>
                            <FaAngleRight style={{ color: '#7a69b3' }} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserManagement;
