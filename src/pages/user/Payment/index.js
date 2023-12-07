import classNames from "classnames/bind";
import styles from './Payment.module.scss'
import { IoChevronBack } from "react-icons/io5";
import { AiFillLock } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";


import DropDown from "../Campaign/Perks/NewPerk/ItemShipping/DropDown";
import ItemPayment from "./ItemPayment";
import Footer from "~/components/Layout/components/Footer";



const cx = classNames.bind(styles);

function Payment() {
    const [showLocation, setShowLocation] = useState(false);
    const [showLocationShipFee, setShowLocationShipFee] = useState(false);
    const [showLocationShipFee0, setShowLocationShipFee0] = useState(false);
    const [location, setLocation] = useState('');
    const [locationShipFee, setLocationShipFee] = useState('');
    const [isAcceptRule, setAcceptRule] = useState(false);
    const listLocation = ['Việt Nam', 'Hàn Quốc', 'Nhật Bản', 'Việt Nam', 'Hàn Quốc', 'Nhật Bản', 'Việt Nam', 'Hàn Quốc', 'Nhật Bản']
    const listLocationShipFee = ['United States (+$10)', 'United States (+$10)']
    const element0 = useRef(null)
    const element1 = useRef(null)
    const element2 = useRef(null)
    useEffect(() => {
        function handleClickOutside(event) {
            if (element0.current && !element0.current.contains(event.target)) {
                setShowLocationShipFee0(false);
            }
        
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [element0]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (element1.current && !element1.current.contains(event.target)) {
                setShowLocation(false);
            }
        
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [element1]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (element2.current && !element2.current.contains(event.target)) {
                setShowLocationShipFee(false);
            }

        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [element2]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <a className={cx('logo')}>INDIEGOGO</a>
            </div>

            <div style={{ margin: '32px 200px 160px 260px', display: 'flex' }}>
                <div className={cx('payment-info')}>
                    <div className={cx('payment-backIcon')}>
                        <span><IoChevronBack style={{ fontSize: '24px', fontWeight: 'bold' }} /> </span> Back
                    </div>
                    <div style={{ color: '#6a6a6a', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>YOU'RE CONTRIBUTING TO</div>
                    <div style={{ fontSize: '24px', fontWeight: '600' }}>
                        Neakasa M1: Open-Top Self-Cleaning Cat Litter Box
                    </div>

                    <div className={cx('user-info')}>
                        <img className={cx('user-img')} src="https://c3.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_40,g_center,q_auto:best,dpr_1.3,f_auto,h_40/rxs9ldiorhnxnj5p25mf"></img>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className={cx('user-name')}>Neakasa</div>
                            <span className={cx('user-detail')}>1 Campaign | SANTA MONICA, United States</span>
                        </div>
                    </div>

                    <div className={cx('my-user-info')}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'inline-block', fontWeight: '700' }}>Ngọc Quí Huỳnh</div>
                            <div style={{ display: 'inline-block' }}>quichua333@gmail.com</div>
                        </div>
                        <div className={cx('my-user-logout')}>
                            Log out
                        </div>
                    </div>

                    <div className={cx('shipping-address')}>
                        <div className={cx('title')}>
                            Shipping address
                        </div>
                        <div className={cx('entreField')}>
                            <label className={cx('entreField-label')}>Full name <span className={cx('entreField-required')}>*</span></label>

                            <input type="text" className={cx('itext-field')} />

                        </div>
                        <div className={cx('entreField')}>
                            <label className={cx('entreField-label')}>Country <span className={cx('entreField-required')}>*</span></label>

                            <div onClick={() => setShowLocationShipFee0(prev => !prev)} style={{ position: 'relative' }} ref={element0} >
                                <input   value={locationShipFee} type="text" className={cx('itext-field')} style={{ marginTop: '8px' }} />
                                {
                                    showLocationShipFee0 &&
                                    <div className={cx('dropdown-outer')}>
                                        <DropDown listItem={listLocationShipFee} onClickItem={location => setLocationShipFee(location)} />
                                    </div>
                                }
                            </div>

                        </div>
                        <div className={cx('entreField')}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: '1' }}>
                                    <label className={cx('entreField-label')}>Street address<span className={cx('entreField-required')}> *</span></label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} />
                                </div>
                                <div style={{ flex: '1' }}>
                                    <label className={cx('entreField-label')}>Address line 2 (optional)</label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('entreField')}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: '1' }}>
                                    <label className={cx('entreField-label')}>City<span className={cx('entreField-required')}> *</span></label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} />
                                </div>
                                <div style={{ flex: '1' }}>

                                </div>
                            </div>
                        </div>
                        <div className={cx('entreField')}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: '1' }}>
                                    <label className={cx('entreField-label')}>Postal code<span className={cx('entreField-required')}> *</span></label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} />
                                </div>
                                <div style={{ flex: '1' }}>
                                    <label className={cx('entreField-label')}>Phone number<span className={cx('entreField-required')}> *</span></label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('shipping-address')}>
                        <div className={cx('title')} style={{ display: 'flex', alignItems: 'center' }}>
                            Secure payments <AiFillLock style={{ marginLeft: '8px', color: '#1e76d5' }} />
                        </div>

                        <div className={cx('entreField')}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: '6' }}>
                                    <label className={cx('entreField-label')}>Số thẻ</label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} placeholder="1234 1234 1234 1234" />
                                </div>
                                <div style={{ flex: '3' }}>
                                    <label className={cx('entreField-label')}>Ngày hết hạn</label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} placeholder="MM / YY" />
                                </div>
                                <div style={{ flex: '3' }}>
                                    <label className={cx('entreField-label')}>CVC</label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} placeholder="CVC" />
                                </div>
                            </div>
                        </div>
                        <div className={cx('entreField')}>
                            <label className={cx('entreField-label')}>Quốc gia <span className={cx('entreField-required')}>*</span></label>

                            <div className={cx('entreField-select')}>
                                <a className={cx('entreDropdown-select', 'itext-field', {
                                    borderInput: showLocation
                                })} onClick={() => setShowLocation(prev => !prev)} ref={element1}>
                                    <span>
                                        {location || 'Select location'}
                                    </span>

                                    <FaAngleDown className={cx('icon', 'icon-down')} />
                                    {
                                        showLocation &&
                                        <div className={cx('dropdown-outer')} style={{ top: '-8px', transform: 'translateY(-100%)' }}>
                                            <DropDown listItem={listLocation} onClickItem={location => setLocation(location)} />
                                        </div>
                                    }

                                </a>

                            </div>

                        </div>

                    </div>
                </div>
                <div className={cx('payment-summary')}>
                    <div className={cx('shipping-address')}>
                        <div className={cx('title')}>
                            Contribution summary
                        </div>

                        <div style={{ marginTop: '32px' }}>
                            {
                                [1, 2, 3].map((item, index) => {
                                    return <ItemPayment key={index} />
                                })
                            }
                        </div>

                        <div className={cx('separate')}></div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '16px' }}>
                            <span>Subtotal</span>
                            <span>$349</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '16px', marginTop: '6px' }}>
                            <span>Shipping</span>
                            <span>$10</span>
                        </div>

                        <div onClick={() => setShowLocationShipFee(prev => !prev)} style={{ position: 'relative' }} ref={element2}>
                            <input   value={locationShipFee} type="text" className={cx('itext-field')} style={{ marginTop: '8px' }} />
                            {
                                showLocationShipFee &&
                                <div className={cx('dropdown-outer')}>
                                    <DropDown listItem={listLocationShipFee} onClickItem={location => setLocationShipFee(location)} />
                                </div>
                            }
                        </div>

                        <div style={{ fontSize: '20px', fontWeight: '600', margin: '32px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>Total</span>
                            <span>$429 USD</span>
                        </div>

                        <div style={{ padding: '16px', marginTop: '24px', border: '1px solid #c8c8c8', borderRadius: '2px' }}>
                            <div style={{ fontWeight: '700', fontSize: '14px' }}>
                                Crowdfunding is not shopping.
                            </div>
                            <p style={{ fontSize: '11px', lineHeight: '1.5', margin: '11px 0' }}>
                                Your contribution is a way to support an entrepreneur, but does not guarantee that you will receive a perk.
                            </p>
                            <p style={{ fontSize: '11px', lineHeight: '1.5', marginTop: '11px' }}>Any
                                refunds
                                after
                                November 17, 2023
                                are the responsibility of the campaign owner,
                                Neakasa
                                , at their discretion.</p>
                        </div>

                        <label onClick={() => setAcceptRule(prev => !prev)} style={{ display: 'flex', alignItems: 'center', margin: '24px 0', marginLeft: '-2px' }}>
                            <span >
                                {
                                    !isAcceptRule ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                                }
                            </span>
                            <span style={{ marginLeft: '8px', color: '#777', fontSize: '13px' }}>I agree to the Terms of Use and have read and understand the Privacy Policy</span>
                        </label>

                        <div className={cx('btn-payment')} style={{
                            fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', color: 'white', backgroundColor: '#e51075', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', letterSpacing: '1px'
                        }}>
                            Submit Payment
                        </div>
                    </div>
                </div>
            </div>
            <Footer />


        </div>
    );
}

export default Payment;