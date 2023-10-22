import classNames from "classnames/bind";
import SidebarCampaign from "../../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import ModalItem from "./ModalItem";
// import { HiCamera } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
// import { IoCloseSharp } from "react-icons/io5";
import { useRef, useEffect, useState } from "react";
// import { FaAngleDown } from "react-icons/fa";
// import { AiFillQuestionCircle } from "react-icons/ai";
// import { useState } from "react";





import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'



const cx = classNames.bind(styles);


function NewPerk() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <SidebarCampaign current={3} />
            <div style={{ flex: '1' }}>

                <HeaderPage isFixed={false} />

                <div className={cx('content')}>
                    <div className={cx('controlBar')}>
                        <div className={cx('controlBar-container')}>
                            <div className={cx('controlBar-content')}>
                                Perks / Create Perk
                            </div>
                            <div className={cx('controlBar-controls')}>
                                <a href="#" className={cx('controls-save')}>Cancel</a>
                                <a href="#" className={cx('controls-launch')}>Save</a>
                            </div>
                        </div>
                        <div className={cx('controlBar-loadingBar')}>

                        </div>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Perk Details
                            </div>
                            <div className={cx('entreField-subHeader')}>
                                Perks are incentives offered to backers in exchange for their support. Make sure your perks are not
                                prohibited.
                                Learn more about perks in the help center.
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Visibility</label>
                                <div className={cx('entreField-subLabel')}>
                                    You can change the visibility of your perks at any time. Change the visibility to hidden if you’re working on a perk that is not ready or if you no longer want backers to claim it.
                                </div>
                                <div style={{ marginTop: '16px' }}>
                                    <label className={cx('inputRadioGroup-radio')}>
                                        <input type="radio" value={'VSBL'} name="perkVisibility" checked/>
                                        <span className={cx('inputRadioGroup-radio-button')}></span>
                                        <span className={cx('inputRadioGroup-radio-label')}>
                                            <strong>Visible. </strong> <span>Perk is available to claim</span>
                                        </span>
                                    </label>

                                    <label className={cx('inputRadioGroup-radio')}>
                                        <input type="radio" value={'INVS'} name="perkVisibility" />
                                        <span className={cx('inputRadioGroup-radio-button')}></span>
                                        <span className={cx('inputRadioGroup-radio-label')}>
                                            <strong>Hidden. </strong> <span>Perk is not available to claim</span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Price<span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    Set an amount that you want to collect from backers who claim this perk. This amount should represent how much you want to receive for all the items included in this perk.
                                </div>
                                <div className={cx('inputCurrencyField')}>
                                    <span className={cx('inputCurrencyField-symbol')}>$</span>
                                    <input type="text" maxlength="50" className={cx('itext-field', 'inputCurrencyField-input')} />
                                    <span className={cx('inputCurrencyField-isoCode')}>USD</span>
                                </div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Title <span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    The title for your perk is what will appear on your campaign page and throughout Indiegogo. Create a title that best describes the contents of what this perk is offering.
                                </div>
                                <input type="text" className={cx('itext-field')} />
                                <div className={cx('entreField-validationLabel')}>50</div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Included Items <span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    Add the items included in this perk. Items could be physical, digital, experiences, or even just a thank you. Specify item quantity and add additional items to create bundles.
                                </div>
                                <div onClick={() => setShowModal(true)} style={{ padding: '16px 0', cursor: 'pointer' }}>
                                    <span style={{ padding: '5px 8px', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginRight: '12px' }}><MdEdit /></span>
                                    <span style={{ color: '#7a69b3', fontWeight: '500', letterSpacing: '1px' }}>ADD ITEM</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>

                            </div>

                        </div>
                    </div>
                </div>

                <Footer />


            </div>
            {
                showModal && <ModalItem setShowModal={setShowModal}/>
            }


        </div>
    );
}

export default NewPerk;