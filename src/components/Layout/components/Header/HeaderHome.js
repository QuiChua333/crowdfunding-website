import classNames from 'classnames/bind';
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";
import styles from './HeaderHome.module.scss'
import DropDown from './Dropdown';
import axios from "axios";
import baseURL from "~/utils/baseURL";
const cx = classNames.bind(styles);
// Component dùng chung
function Header2() {
    const [header, setHeader] = useState(false);
    const [activeExplore, setActiveExplore] = useState(false)
    useEffect(() => {
        const changeBackgroundHeader = () => {
            if (window.scrollY >= 40) {
                setHeader(true)
            } else {
                setHeader(false)
            }
        }
        window.addEventListener('scroll', changeBackgroundHeader);

        return () => {
            window.removeEventListener('scroll', changeBackgroundHeader);
        }
    }, []);
    const [listFieldGrouByCategory, setListFieldGrouByCategory] = useState([])
    const getListCategory = async () => {
        try {
            const res = await axios.get(`${baseURL}/field/getFieldGroupByCategory`)
            setListFieldGrouByCategory(res.data.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getListCategory()
    }, [])
    return (
        <header className={cx('wrapper', {
            'active': header,
            'activeDropdown': activeExplore
        })}>
            <div className={cx('inner')}>

                <div className={cx('group')}>
                    <div className={cx('button-search')}>
                        <a href='/explore'><AiOutlineSearch className={cx('icon-search')} /></a>
                    </div>


                    <ul className={cx('nav-list')}>
                        <li onClick={() => setActiveExplore(prev => !prev)} className={cx('explore')}><a>Khám phá <FaAngleDown className={cx('icon', { active: activeExplore })} /></a></li>
                        <li><a href='#'>Về chúng tôi</a></li>
                    </ul>

                </div>

                <div className={cx('logo')}>
                    <Link to='/' className={cx('icon-logo')}>GIVE - FUN</Link>
                </div>
                <div className={cx('group')}>
                    <ul className={cx('nav-list')}>
                        <li><a href='/start-a-campaign'>Tạo chiến dịch</a></li>
                        <li className={cx('sign-in')}><a href='/login'>Đăng nhập</a></li>
                        <li><a href='/sign-up'>Đăng ký</a></li>

                    </ul>
                </div>


            </div>
            {activeExplore &&
                <DropDown active={activeExplore} activeHeader={header} listFieldGrouByCategory={listFieldGrouByCategory} />
            }
        </header>
    );
}

export default Header2;