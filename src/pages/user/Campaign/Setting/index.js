import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";

import images from "~/assets/images";




import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { useState } from "react";
import { Link } from "react-router-dom";


const cx = classNames.bind(styles);

function SettingCampaign() {
    const [isCheckRoleEditing, setCheckRoleEditng] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <SidebarCampaign current={7} />
            <div style={{ flex: '1' }}>

                <HeaderPage isFixed={false} />

                <div className={cx('content')}>
                    <div className={cx('controlBar')}>
                        <div className={cx('controlBar-container')}>
                            <div className={cx('controlBar-content')}>
                                Campaign / Settings
                            </div>
                            <div className={cx('controlBar-controls')}>
                                <a href="#" className={cx('btn', 'btn-cancel')}>Save Campaign</a>
                                <a href="#" className={cx('btn', 'btn-ok')}>Review & Launch</a>
                            </div>
                        </div>
                        <div className={cx('controlBar-loadingBar')}>

                        </div>
                    </div>
                    <div className={cx('body')}>



                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Settings

                            </div>
                            <div className={cx('entreField-subHeader')}>
                                We provide additional features for you that can help bolster your campaign. Configure the optional campaign settings below.
                            </div>


                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>

                        </div>

                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                InDemand

                            </div>
                            <div className={cx('entreField-subHeader')}>
                                InDemand makes it easy for any successful campaigner to keep raising funds after their campaign ends. With InDemand, you can accept contributions after your campaign ends, grow your community and reach new audiences, and get ongoing exposure on the Indiegogo platform. On-platform InDemand campaigns raise on average 123% more funds than their initial funding phase. Learn more
                            </div>

                            <div className={cx('entreField')}>
                                <label onClick={() => setCheckRoleEditng(prev => !prev)} style={{ display: 'flex', alignItems: 'center', margin: '16px 0', marginLeft: '-2px' }}>
                                    <span >
                                        {
                                            !isCheckRoleEditing ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                                        }
                                    </span>
                                    <span style={{ marginLeft: '8px' }}>Opt into InDemand</span>
                                </label>
                            </div>

                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                <a href="#" className={cx('btn', 'btn-ok')} >REVIEW & LAUNCH</a>
                            </div>

                        </div>



                    </div>
                </div>

                <Footer />


            </div>

        </div>
    );
}

export default SettingCampaign;