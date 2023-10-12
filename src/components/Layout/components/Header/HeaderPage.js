import classNames from 'classnames/bind';
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './HeaderHome.module.scss'
const cx = classNames.bind(styles);
// Component dùng chung
function Header({isFixed}) {
    const [header, setHeader] = useState(false);
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

    return (
        <header className={cx('wrapper','active')} style={{position: isFixed? 'fixed' : 'relative'}}>
            <div className={cx('inner')}>

                <div className={cx('group')}>
                    <div  className={cx('button-search')}>
                        <a href='/explore/all'><AiOutlineSearch className={cx('icon-search')} /></a>
                    </div>

               
                        <ul className={cx('nav-list')}>
                            <li><a href='#'>How it works</a></li>
                            <li><a href='#'>Sign in</a></li>
                        </ul>
                   
                </div>

                <div className={cx('logo')}>
                    <a href='/' className={cx('icon-logo')}>GIVE - FUN</a>
                </div>
                <div className={cx('group')}>
                    <ul className={cx('nav-list')}>
                        <li><a href='#'>How it works</a></li>
                        <li><a href='#'>Sign up</a></li>
                        <li><a href='#'>Sign in</a></li>
                    </ul>
                </div>


            </div>

        </header>
    );
}

export default Header;