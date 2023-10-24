import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
// import { HiCamera } from "react-icons/hi";
// import { MdEdit } from "react-icons/md";
// import { IoCloseSharp } from "react-icons/io5";
// import { useRef, useEffect } from "react";
// import { FaAngleDown } from "react-icons/fa";
// import { AiFillQuestionCircle } from "react-icons/ai";
// import { useState } from "react";

import images from "~/assets/images";



import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'


const cx = classNames.bind(styles);


function PerksCampaign() {
    return (
        <div className={cx('wrapper')}>
            <SidebarCampaign current={3} />
            <div style={{ flex: '1' }}>

                <HeaderPage isFixed={false} />

                <div className={cx('content')}>
                    <div className={cx('controlBar')}>
                        <div className={cx('controlBar-container')}>
                            <div className={cx('controlBar-content')}>
                                Campaign / Perks
                            </div>
                            <div className={cx('controlBar-controls')}>
                                <a href="#" className={cx('btn','btn-cancel')}>Save Campaign</a>
                                <a href="#" className={cx('btn','btn-ok')}>Review & Launch</a>
                            </div>
                        </div>
                        <div className={cx('controlBar-loadingBar')}>

                        </div>
                    </div>
                    <div className={cx('body')}>

                        {/* Khi chưa có perk */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: '580px', textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px' }}>You haven't created any perks yet </div>
                                <div style={{ marginTop: '12px' }}>
                                    <span>Perks are incentives offered to backers in exchange for their support. You may edit your perk details until the perk is claimed. Visit the Help Center to learn about different kinds of perks you can offer.</span>
                                </div>
                                <img src={images.no_perk} style={{ width: '600', height: '270px', objectFit: 'cover', marginTop: '32px' }} />

                                <div style={{ marginTop: '40px' }}>Let's get started</div>

                                <div style={{ marginTop: '40px' }}>
                                    <a href="/campaigns/:id/edit/perks/new" className={cx('btn','btn-ok')} style={{fontSize: '16px'}} >CREATE NEW PERK</a>
                                </div>

                                
                            </div>

                          
                        </div>
                        <div style={{ marginTop: '60px',  marginBottom: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                <a href="#" className={cx('btn','btn-ok')} >CONTINUE</a>
                            </div>
                    </div>
                </div>

                <Footer />


            </div>
         
        </div>
    );
}

export default PerksCampaign;