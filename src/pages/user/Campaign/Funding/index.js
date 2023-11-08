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

function TeamCampaign() {
    const [isCheckRoleEditing, setCheckRoleEditng] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <SidebarCampaign current={6} />
            <div style={{ flex: '1' }}>

                <HeaderPage isFixed={false} />

                <div className={cx('content')}>
                    <div className={cx('controlBar')}>
                        <div className={cx('controlBar-container')}>
                            <div className={cx('controlBar-content')}>
                                Campaign / Funding
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
                                Campaign Goal Amount & Currency <span className={cx('entreField-required')}>*</span>

                            </div>
                            <div className={cx('entreField-subHeader')}>
                                How much money would you like to raise for this campaign? A minimum goal of 500 in your currency is required. For help on choosing a goal amount, see this article. Make sure you keep in mind our fees and your reserved funds.
                            </div>

                            <div className={cx('entreField')}>
                                <div className={cx('inputCurrencyField')} style={{ width: '100%' }}>
                                    <span className={cx('inputCurrencyField-symbol')}>$</span>
                                    <input placeholder={"20000"} type="text" maxlength="50" className={cx('itext-field', 'inputCurrencyField-input')} />
                                    <span className={cx('inputCurrencyField-isoCode')}>VNĐ</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>

                        </div>

                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Funds Recipient Verification

                            </div>
                            <div className={cx('entreField-subHeader')}>
                                The campaign owner must be verified to launch the campaign. ID verification will be done securely with a third party and creates a more trusted platform for you and your backers.
                            </div>

                            <div className={cx('entreField')}>
                                <a href="#" className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }} >VERIFY YOUR ID</a>
                            </div>

                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>

                        </div>

                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Bank Information

                            </div>
                            <div className={cx('entreField-subHeader')}>
                                Fill out your bank account information. We’ll only be able to send you funds if you’ve raised more than 100 in your currency after fees. Learn more about payouts.
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Account Number <span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    Enter the account number where you want the funds deposited.
                                </div>
                                <input type="text" className={cx('itext-field')} placeholder="000000000000"/>
          

                                <div className={cx('entreField-subLabel')} style={{marginTop: '16px'}}>
                                Retype account number.
                                </div>
                                <input type="text" className={cx('itext-field')} placeholder="000000000000"/>
                         
                            </div>
                            <div className={cx('entreField')}>
                                <a href="#" className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }} >SAVE BANK INFORMATION</a>
                            </div>

                            {/* <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div> */}
                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                <a href="#" className={cx('btn', 'btn-ok')} >SAVE & CONTINUE</a>
                            </div>

                        </div>

                    </div>
                </div>

                <Footer />


            </div>

        </div>
    );
}

export default TeamCampaign;