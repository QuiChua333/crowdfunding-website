import classNames from 'classnames/bind';
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss'
const cx = classNames.bind(styles);
// Component dùng chung
function Header() {
    const [header, setHeader] = useState(false);
    const [searchBox, setSearchBox] = useState(false);

    const handleSearch = () => {
        setSearchBox(!searchBox);
    }

    const changeBackgroundHeader = () => {
        if (window.scrollY >=460) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }
    window.addEventListener('scroll', changeBackgroundHeader);
    return ( 
        <header className={cx('wrapper', {
            'active': header
        })}>
          <div className={cx('group1')}>
            <Link to='/' className={cx('logo')}>GIVE - FUN</Link>
            <div onClick={handleSearch}>
                    <AiOutlineSearch className={cx('icon-search')}/>
            </div>
          </div>
          <div className={cx('group2')}>
            <div className={cx('search')}>
               
            </div>
                <ul className={cx('nav-list')}>
                    <li><a href='#'>HOME</a></li>
                    <li><a href='#'>ABOUT</a></li>
                    <li><a href='#'>PAGE</a></li>
                    <li><a href='#'>CONTACT</a></li>   
                </ul>
            </div>
             <div className={cx('search-box', {
                'active': searchBox
             })}>
                <span>
                    <AiOutlineSearch className={cx('icon-search')}/>
                </span>
                <input type='text' placeholder='Search here....'/>
                <span onClick={handleSearch}>
                    <AiOutlineClose className={cx('icon-close-search')}/>
                </span>
            </div>

            
        </header>
    );
}

export default Header;