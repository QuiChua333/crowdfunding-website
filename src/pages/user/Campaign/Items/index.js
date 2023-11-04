import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import { FaAngleDown } from "react-icons/fa";

import images from "~/assets/images";




import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { useState } from "react";
import { Link } from "react-router-dom";
import ItemTable from "./ItemTable";


const cx = classNames.bind(styles);


function ItemsCampaign() {
    const [isHasItem, setHasItem] = useState(true);
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
            <SidebarCampaign current={4} />
            <div style={{ flex: '1' }}>

                <HeaderPage isFixed={false} />

                <div className={cx('content')}>
                    <div className={cx('controlBar')}>
                        <div className={cx('controlBar-container')}>
                            <div className={cx('controlBar-content')}>
                                Campaign / Items
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

                        {/* Khi có item */}
                        {
                            isHasItem &&
                            <div>
                                <div className={cx('entreSection')} style={{width: '80%'}}>
                                    <div className={cx('entreField-header')}>
                                        Items
                                    </div>
                                    <div className={cx('entreField-subHeader')}>
                                    What are you offering to backers who claim this perk? You'll be able to track fulfillment and collect details from backers about the items included in this perk.
                                    </div>

                                </div>
                                <div className={cx('perkTable-action')}>
                                    <div>
                                    
                                        <div>
                                            <Link to='/campaigns/:id/edit/items/new'  className={cx('btn', 'btn-ok')} style={{fontSize: '16px', marginLeft: '0'}} >CREATE NEW ITEM 
                                            </Link>

                                        </div>
                                    </div>

                                </div>
                                <div style={{ marginTop: '40px' }}>
                                    <ItemTable  />
                                </div>

                            </div>
                        }
                        {
                            !isHasItem &&
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: '580px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '400', marginTop: '32px' }}>See all your items and manage them here. </div>
                                    <div style={{ marginTop: '12px' }}>
                                        <span>Items are what you offer to backers when they claim perks.</span>
                                    </div>
                                    <img src={images.no_item} style={{ width: '600', height: '200px', objectFit: 'cover', marginTop: '32px' }} />

                                    <div style={{ marginTop: '40px' }}>You don't have any items yet.</div>
                                    <div style={{ fontSize: '14px', color: '#a8a8a8' }}>Go to the perks page to create a perk first and then include items.</div>
                                    <img src={images.arrow} style={{ width: '40px', height: '60px', objectFit: 'cover', marginTop: '32px' }} />

                                    <div style={{ marginTop: '40px' }}>
                                        <a href="/campaigns/:id/edit/perks/table" className={cx('btn', 'btn-ok')} style={{ fontSize: '16px' }} >GO TO PERKS PAGE </a>
                                    </div>


                                </div>


                            </div>
                        }




                    </div>
                </div>

                <Footer />


            </div>

        </div>
    );
}

export default ItemsCampaign;