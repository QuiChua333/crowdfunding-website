import classNames from 'classnames/bind';
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import styles from './HeaderHome.module.scss'
import DropDown from './Dropdown';
import baseURL from "~/utils/baseURL";
import customAxios from '~/utils/customAxios'
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '~/redux/slides/User';
const cx = classNames.bind(styles);
// Component dùng chung
function Header2() {
    const dispatch = useDispatch()
    const [showDropdownUser, setShowDropdownUser] = useState(false)
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
    const boxFilterElement = useRef();
    useEffect(() => {
        function handleClickOutside(event) {
            if (boxFilterElement.current && !boxFilterElement.current.contains(event.target)) {
                setShowDropdownUser(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [boxFilterElement]);
    const [listFieldGrouByCategory, setListFieldGrouByCategory] = useState([])
    const getListCategory = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/field/getFieldGroupByCategory`)
            setListFieldGrouByCategory(res.data.data)
        } catch (error) {

        }
    }
    const [user, setUser] = useState({})
    const getUser = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/user/getInfoCurrentUser`)
            setUser(res.data.data)
            dispatch(setCurrentUser(res.data.data))
        } catch (error) {

        }
    }
    useEffect(() => {
        getListCategory()
        const token = localStorage.getItem('accessToken') || false
        if (token) {
            getUser()
        }
    }, [])
    useEffect(() => {
        console.log(user)
    }, [user])
    const handleClickLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/'
    }
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


                    <div className={cx('nav-list')}>
                        <div onClick={() => setActiveExplore(prev => !prev)} className={cx('explore')}><a>Khám phá <FaAngleDown className={cx('icon', { active: activeExplore })} /></a></div>
                        <div><a href='#'>Về chúng tôi</a></div>
                    </div>

                </div>

                <div className={cx('logo')}>
                    <Link to='/' className={cx('icon-logo')}>GIVE - FUN</Link>
                </div>
                <div className={cx('group')}>

                    <div className={cx('nav-list')}>
                        <div className={cx('create-campaign')}><a href={!user.isAdmin ? '/start-a-campaign' : '#'}>Tạo chiến dịch</a></div>
                        {
                            !user._id &&
                            <>
                                <div className={cx('sign-in')}><a href='/login'>Đăng nhập</a></div>
                                <div><a href='/sign-up'>Đăng ký</a></div>
                            </>
                        }
                        {
                            user._id &&
                            <div className={cx('user-section')} onClick={() => setShowDropdownUser(prev => !prev)} ref={boxFilterElement}>
                                <img className={cx('user-avatar')} src={user.avatar.url} />
                                <span className={cx('user-name')}>{user.fullName}  <FaAngleDown className={cx('icon', { active: showDropdownUser })} /></span>
                                {
                                    showDropdownUser &&
                                    <div className={cx('dropdownBoxFilter')}>
                                        {
                                            !user.isAdmin &&
                                            <>
                                                <span onClick={() => window.location.href = `/individuals/${user._id}/campaigns`}>Chiến dịch của tôi</span>
                                                <span onClick={() => window.location.href = `/individuals/${user._id}/contributions`}>Đóng góp của tôi</span>
                                                <span onClick={() => window.location.href = `/individuals/${user._id}/profile`}>Hồ sơ</span>
                                                <span onClick={() => window.location.href = `/individuals/${user._id}/edit/settings`}>Cài đặt</span>
                                            </>
                                        }
                                        {
                                            user.isAdmin &&
                                            <span onClick={() => window.location.href = `/admin`}>Đến trang quản lý</span>
                                        }
                                        <span onClick={handleClickLogout}>Đăng xuất</span>
                                    </div>
                                }
                            </div>
                        }
                    </div>

                </div>


            </div>
            {activeExplore &&
                <DropDown active={activeExplore} activeHeader={header} listFieldGrouByCategory={listFieldGrouByCategory} />
            }
        </header>
    );
}

export default Header2;