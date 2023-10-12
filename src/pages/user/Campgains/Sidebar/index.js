import classNames from "classnames/bind";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";


import styles from './Sidebar.module.scss'
import { current } from "@reduxjs/toolkit";

const cx = classNames.bind(styles);

function SidebarCampaign({current}) {

    const [downEditor,setDownEditor] = useState(false);

    const handleClickSection = function (event) {
        event.preventDefault();
        setDownEditor(!downEditor)
    }
    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('campaignInfo')}>
                    <div className={cx('campaignPhase')}>
                        <span>Draft Campaign</span>
                    </div>

                    <div className={cx('campaignTitle')}>
                    My Campaign Title
                    </div>
                </div>

                <div className={cx('navItems')}>
                    <div className={cx('navItem')}>
                        <a href="#" className={cx('navItem-link')}>
                            <div>
                                Preview Campaign
                            </div>
                        </a>
                    </div>
                    <div className={cx('navSection')}>
                        <a href="#" className={cx('navSection-title')} onClick={handleClickSection}>
                            <div>
                                Campaign Editor
                            </div>
                            {!downEditor && <FaAngleDown  className={cx('icon','icon-down')}/>}
                            {downEditor && <FaAngleUp  className={cx('icon','icon-up')}/>}


                        </a>

                        {
                            downEditor &&
                            <div className={cx('navSection-children')}>
                            <div className={cx('navItem--child', 'navItem', {
                                'navItem--current': current ===1
                            })}>
                                <a href="#" className={cx('navItem-link')}>
                                    <div>
                                        1. Basics
                                    </div>
                                </a>
                            </div>
                            <div className={cx('navItem--child','navItem', {
                                'navItem--current': current ===2
                            })}>
                                <a href="#" className={cx('navItem-link')}>
                                    <div>
                                        2. Content
                                    </div>
                                </a>
                            </div>
                            <div className={cx('navItem--child','navItem', {
                                'navItem--current': current ===3
                            })}>
                                <a href="#" className={cx('navItem-link')}>
                                    <div>
                                        3. Perks
                                    </div>
                                </a>
                            </div>
                        </div>
                        }
                    </div>

                    <div className={cx('navItem')}>
                        <a href="#" className={cx('navItem-link')}>
                            <div>
                                QQQ
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );



}

export default SidebarCampaign;