import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Link } from "react-router-dom";


import styles from './AdminSidebar.module.scss'

const cx = classNames.bind(styles);

function AdminSidebar({setTitle}) {

    const [indexActive, setIndexActive] = useState(1);
    useEffect(() => {
        console.log(indexActive)
    }, [indexActive])

    useEffect(() => {
        console.log('render')
    })

    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('campaignInfo')}>
                    <div className={cx('campaignPhase')}>
                        <span>Welcome to admin page</span>
                    </div>

                </div>

                <div className={cx('navItems')}>

                    <div className={cx('navSection')}>
                        <a className={cx('navSection-title')}>
                            <div>
                                Chức năng
                            </div>
                            <FaAngleDown className={cx('icon', 'icon-down')} />


                        </a>


                        <div className={cx('navSection-children')}>
                            <Link to="/admin/campaigns"   onClick={() => {setIndexActive(1); setTitle('Quản lý dự án')}} className={cx('navItem--child', 'navItem', {
                                'navItem--current': indexActive === 1
                            })}>
                                <div className={cx('navItem-link')}>
                                    <div>
                                        1. Dự án
                                    </div>
                                </div>
                            </Link>
                            <Link to="/admin/users"  onClick={() => {setIndexActive(2); setTitle('Quản lý thông tin người dùng')}} className={cx('navItem--child', 'navItem', {
                                'navItem--current': indexActive === 2
                            })}>
                                <div className={cx('navItem-link')}>
                                    <div>
                                        2. Người dùng
                                    </div>
                                </div>
                            </Link>
                            <Link  to="/admin/verify-campaign" onClick={() => {setIndexActive(3); setTitle('Quản lý xét duyệt dự án')}} className={cx('navItem--child', 'navItem', {
                                'navItem--current': indexActive === 3
                            })}>
                                <div className={cx('navItem-link')}>
                                    <div>
                                        3. Xét duyệt dự án
                                    </div>
                                </div>
                            </Link>
                            <Link to="/admin/progress-contribute" onClick={() => {setIndexActive(4); setTitle('Quán lý tiến độ và đóng góp dự án')}} className={cx('navItem--child', 'navItem', {
                                'navItem--current': indexActive === 4
                            })}>
                                <div  className={cx('navItem-link')}>
                                    <div>
                                        4. Tiến độ và đóng góp
                                    </div>
                                </div>
                            </Link>
                            <Link to="/admin/complaint"  onClick={() => {setIndexActive(5); setTitle('Quản lý báo cáo vi phạm dự án')}} className={cx('navItem--child', 'navItem', {
                                'navItem--current': indexActive === 5
                            })}>
                                <div  className={cx('navItem-link')}>
                                    <div>
                                        5. Báo cáo vi phạm
                                    </div>
                                </div>
                            </Link>

                        </div>

                    </div>

                    <div className={cx('navItem')}>
                        <a href="/" className={cx('navItem-link')}>
                            <div>
                                Về trang chủ
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );



}

export default AdminSidebar;