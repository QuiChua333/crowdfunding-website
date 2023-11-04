import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import { FaAngleDown } from "react-icons/fa";
import PerkTable from "./PerkTable";

import images from "~/assets/images";




import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { useState } from "react";
import { Link } from "react-router-dom";


const cx = classNames.bind(styles);


function PerksCampaign() {
    const [isHasPerk, setHasPerk] = useState(true);
    const [enableBulkAction, setBulkAction] = useState(false);
    const [numberSelected, setNumberSelected] = useState(0)
    const [isOpenDropdownBulkAction, setOpenDropdownBulkAction] = useState(false)
    const handlePerkChange = (listPerk) => {
        const check = listPerk.some(item => item.isChecked === true);
        setBulkAction(check)
        const num = listPerk.reduce((acc, item) => {
            if (item.isChecked) return acc + 1;
            else return acc + 0;
        }, 0);
        setNumberSelected(num)
    }
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
                                <a href="#" className={cx('btn', 'btn-cancel')}>Save Campaign</a>
                                <a href="#" className={cx('btn', 'btn-ok')}>Review & Launch</a>
                            </div>
                        </div>
                        <div className={cx('controlBar-loadingBar')}>

                        </div>
                    </div>
                    <div className={cx('body')}>

                        {/* Khi chưa có perk */}
                        {
                            isHasPerk &&
                            <div>
                                <div className={cx('entreSection')}>
                                    <div className={cx('entreField-header')}>
                                        Perks
                                    </div>
                                    <div className={cx('entreField-subHeader')}>
                                        Perks are incentives offered to backers in exchange for their support. There are
                                        different types of perks
                                        you create. Learn more about perks in the help center.
                                    </div>

                                </div>
                                <div className={cx('perkTable-action')}>
                                    <div>
                                        <span ><strong style={{display: 'inline-block', minWidth: '12px'}}>{numberSelected}</strong> perks selected</span>
                                        <div style={{ display: 'inline-block', marginLeft: '24px', position: 'relative' }}>
                                            <a onClick={(e) => { e.preventDefault(); setOpenDropdownBulkAction(prev => !prev) }} href="#" className={cx('btn', 'btn-ok', {
                                                disabled: !enableBulkAction
                                            })} >BULK ACTION <FaAngleDown style={{ fontSize: '18px', marginLeft: '4px' }} />
                                            </a>


                                            {
                                                isOpenDropdownBulkAction &&
                                                <div className={cx('dropdown')} style={{ left: '16px' }}>
                                                    <div className={cx('action')}>
                                                        Set Up Add-ons
                                                    </div>
                                                    
                                                    <div className={cx('action','action-delete')}>
                                                        Delete perk
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ display: 'inline-block', marginLeft: '24px' }}>
                                            <Link to="/campaigns/:id/edit/perks/new" className={cx('btn', 'btn-ok')} >CREATE NEW PERK</Link>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '40px' }}>
                                    <PerkTable onPerkTableChange={handlePerkChange} />
                                </div>

                            </div>
                        }
                        {
                            !isHasPerk &&
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: '580px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px' }}>You haven't created any perks yet </div>
                                    <div style={{ marginTop: '12px' }}>
                                        <span>Perks are incentives offered to backers in exchange for their support. You may edit your perk details until the perk is claimed. Visit the Help Center to learn about different kinds of perks you can offer.</span>
                                    </div>
                                    <img src={images.no_perk} style={{ width: '600', height: '270px', objectFit: 'cover', marginTop: '32px' }} />

                                    <div style={{ marginTop: '40px' }}>Let's get started</div>
                                    <div style={{ fontSize: '14px', color: '#a8a8a8' }}>Create your perks here.</div>
                                    <img src={images.arrow} style={{ width: '40px', height: '60px', objectFit: 'cover', marginTop: '32px' }} />

                                    <div style={{ marginTop: '40px' }}>
                                        <a href="/campaigns/:id/edit/perks/new" className={cx('btn', 'btn-ok')} style={{ fontSize: '16px' }} >CREATE NEW PERK </a>
                                    </div>


                                </div>


                            </div>
                        }



                        {/* Footer */}
                        {
                            !isHasPerk &&
                            <div style={{ marginTop: '60px', marginBottom: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                <a href="#" className={cx('btn', 'btn-ok')} >CONTINUE</a>
                            </div>
                        }

                        {
                            isHasPerk &&
                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                <a href="#" className={cx('btn', 'btn-ok')} >SAVE & CONTINUE</a>
                            </div>
                        }
                    </div>
                </div>

                <Footer />


            </div>

        </div>
    );
}

export default PerksCampaign;