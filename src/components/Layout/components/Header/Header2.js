import classNames from 'classnames/bind';
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header2.module.scss'
const cx = classNames.bind(styles);
// Component dùng chung
function Header2() {
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
        <header className={cx('wrapper', {
            'active': header
        })}>
            <div className={cx('inner')}>

                <div className={cx('group')}>
                    <div  className={cx('button-search')}>
                        <AiOutlineSearch className={cx('icon-search')} />
                    </div>

               
                        <ul className={cx('nav-list')}>
                            <li><a href='#'>How it works</a></li>
                            <li><a href='#'>Sign in</a></li>
                        </ul>
                   
                </div>

                <div className={cx('logo')}>
                    <Link to='/' className={cx('icon-logo')}>GIVE - FUN</Link>
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

export default Header2;