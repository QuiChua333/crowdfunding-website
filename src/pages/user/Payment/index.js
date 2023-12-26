import classNames from "classnames/bind";
import styles from './Payment.module.scss'
import { IoChevronBack } from "react-icons/io5";
import { AiFillLock } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import axios from "axios";
import customAxios from '~/utils/customAxios'
import DropDown from "../Campaign/Perks/NewPerk/ItemShipping/DropDown";
import ItemPayment from "./ItemPayment";
import Footer from "~/components/Layout/components/Footer";
import { useSelector } from "react-redux";
import baseURL from "~/utils/baseURL";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import formatMoney from "~/utils/formatMoney";
import PaymentModal from "./PaymentModal";


const cx = classNames.bind(styles);

function Payment() {
    const [currentUser, setCurrentUser] = useState({})
    const navigate = useNavigate()
    const lct = useLocation()
    const payment = lct.state
    const { id } = useParams()
    const [campaign, setCampaign] = useState({})
    const [showLocation, setShowLocation] = useState(false);
    const [listLocationShip, setListLocationShip] = useState([])
    const [shipFee, setShipFee] = useState(0)
    const [location, setLocation] = useState('');
    const [isAcceptRule, setAcceptRule] = useState(false);
    const element = useRef(null)
    const [showPaymentModal,setShowPaymentModal] = useState(false)
    const [contribution,setContribution] = useState({
        shippingInfo: {

        },
        campaign: id,
        perks: payment.listPerkPayment.map(item => {
            const newItem = {...item}
            delete newItem.listShippingFee;
            delete newItem.perkImage;
            return newItem
        })
    })
    useEffect(() => {
        function handleClickOutside(event) {
            if (element.current && !element.current.contains(event.target)) {
                setShowLocation(false);
            }

        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [element]);

    const getUser = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/user/getInfoCurrentUser`)
            setCurrentUser(res.data.data)
        } catch (error) {

        }
    }
    const getInfoCampaign = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/campaign/getCampaignById/${id}`)
            setCampaign(res.data.data)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    const getListLocationShip = async () => {
        try {
            const res = await axios.get('https://provinces.open-api.vn/api/p');
            setListLocationShip(res.data.map(item => item.name));
        } catch (error) {

        }
    }
    useEffect(() => {
        getInfoCampaign()
        getListLocationShip();
        const token = localStorage.getItem('accessToken') || false
        if (token) {
            getUser()
        }
    }, [])
    useEffect(() => {
        let max = 0;
        if (location) {
            for (let i = 0; i < payment.listPerkPayment.length; i++) {
                const perk = payment.listPerkPayment[i]
                let fee = perk.listShippingFee.find(x => x.location === location)?.fee || 0
                if (!fee) {
                    fee = perk.listShippingFee.find(x => x.location === 'Các tỉnh thành còn lại' || x.location === 'Tất cả các tỉnh thành')?.fee
                }
                max = fee > max ? fee : max
            }
            setShipFee(max)
            setContribution(prev => ({
                ...prev,
                shippingInfo: {
                    ...prev.shippingInfo,
                    province: location
                }
            }))
        }
        
    }, [location])
    useEffect(() => {
        setContribution(prev => ({...prev,
        money: payment.total + shipFee}))
    },[shipFee])
    const handleChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setContribution(prev => ({
            ...prev,
            shippingInfo: {
                ...prev.shippingInfo,
                [name]: value
            }
        }))
    }
    useEffect(() => {
        console.log(contribution)
    },[contribution])

    const handlePaymentMethod =  (method) => {
        if (method === 'momo') {
            momoMethod()
        }
    }
    const momoMethod = async () => {
        try {
            contribution.user = currentUser._id;
            const res = await customAxios.post(`${baseURL}/contribution/paymentMomo/handle`,contribution)
            window.location.href = res.data.data
        } catch (error) {
            
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <a className={cx('logo')}>GIVEFUN</a>
            </div>

            <div className={cx('inner')}>
                <div className={cx('payment-info')}>
                    <div className={cx('payment-backIcon')} onClick={() => navigate(-1)}>
                        <span><IoChevronBack style={{ fontSize: '24px', fontWeight: 'bold' }} /> </span> Back
                    </div>
                    <div style={{ color: '#6a6a6a', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>BẠN ĐANG ĐÓNG GÓP CHO</div>
                    <div style={{ fontSize: '24px', fontWeight: '600' }}>
                        {campaign.title}
                    </div>

                    <div className={cx('user-info')}>
                        <img className={cx('user-img')} src={campaign.owner?.avatar?.url}></img>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className={cx('user-name')}>{campaign.owner?.fullName}</div>
                            <span className={cx('user-detail')}>1 Campaign | <span style={{ textTransform: 'uppercase' }}>{campaign.owner?.address?.province}</span>{campaign.owner?.address?.district && ', ' + campaign.owner?.address?.district}</span>
                        </div>
                    </div>

                    <div className={cx('my-user-info')}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'inline-block', fontWeight: '700' }}>{currentUser.fullName}</div>
                            <div style={{ display: 'inline-block' }}>{currentUser.email}</div>
                        </div>
                        <div className={cx('my-user-logout')}>
                            Đăng xuất
                        </div>
                    </div>

                    <div className={cx('shipping-address')}>
                        <div className={cx('title')}>
                            Địa chỉ nhận hàng
                        </div>
                        <div className={cx('entreField')}>
                            <label className={cx('entreField-label')}>Họ và tên <span className={cx('entreField-required')}>*</span></label>

                            <input type="text" className={cx('itext-field')} name="fullName" value={contribution.shippingInfo?.fullName} onChange={handleChangeInput}/>

                        </div>


                        <div className={cx('entreField')}>
                            <label className={cx('entreField-label')}>Tỉnh / Thành phố <span className={cx('entreField-required')}>*</span></label>

                            <div className={cx('entreField-select')}>
                                <a className={cx('entreDropdown-select', 'itext-field', {
                                    borderInput: showLocation
                                })} onClick={() => setShowLocation(prev => !prev)} ref={element}>
                                    <span>
                                        {contribution.shippingInfo?.province || 'Chọn Tỉnh / Thành phố'}
                                    </span>

                                    <FaAngleDown className={cx('icon', 'icon-down')} />
                                    {
                                        showLocation &&
                                        <div className={cx('dropdown-outer')} style={{ top: '-8px', transform: 'translateY(-100%)' }}>
                                            <DropDown listItem={listLocationShip} onClickItem={(item) => setLocation(item)} listLocationShipChoosen={[contribution.shippingInfo?.province]} />
                                        </div>
                                    }

                                </a>

                            </div>

                        </div>


                        <div className={cx('entreField')}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: '1' }}>
                                    <label className={cx('entreField-label')}>Quận / Huyện<span className={cx('entreField-required')}> *</span></label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} name="district" value={contribution.shippingInfo?.district} onChange={handleChangeInput}/>
                                </div>
                                <div style={{ flex: '1' }}>
                                    <label className={cx('entreField-label')}>Xã / Phường<span className={cx('entreField-required')}> *</span></label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} name="ward" value={contribution.shippingInfo?.ward} onChange={handleChangeInput}/>
                                </div>
                            </div>
                        </div>
                        <div className={cx('entreField')}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: '1' }}>
                                    <label className={cx('entreField-label')}>Chi tiết địa chỉ<span className={cx('entreField-required')}> *</span></label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} name="detail" value={contribution.shippingInfo?.detail} onChange={handleChangeInput}/>
                                </div>
                                <div style={{ flex: '1' }}>
                                    <label className={cx('entreField-label')}>Số điện thoại<span className={cx('entreField-required')}> *</span></label>
                                    <input type="text" maxLength="50" className={cx('itext-field')} name="phoneNumber" value={contribution.shippingInfo?.phoneNumber} onChange={handleChangeInput}/>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className={cx('payment-summary')}>
                    <div className={cx('shipping-address')}>
                        <div className={cx('title')}>
                            Tóm tắt đóng góp
                        </div>

                        <div style={{ marginTop: '32px' }}>

                            {
                                payment.listPerkPayment.map((item, index) => {
                                    return <ItemPayment item={item} key={index} />
                                })

                            }
                        </div>

                        <div className={cx('separate')}></div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '16px' }}>
                            <span>Tiền đặc quyền</span>
                            <span>{formatMoney(payment.total)}VNĐ</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '16px', marginTop: '6px' }}>
                            <span>Tiền ship</span>
                            <span>{formatMoney(shipFee)}VNĐ</span>
                        </div>



                        <div style={{ fontSize: '20px', fontWeight: '600', margin: '32px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>Tổng tiền</span>
                            <span>{formatMoney(payment.total + shipFee)}VNĐ</span>
                        </div>

                        <div style={{ padding: '16px', marginTop: '24px', border: '1px solid #c8c8c8', borderRadius: '2px' }}>
                            <div style={{ fontWeight: '700', fontSize: '14px' }}>
                                Give Fun không phải là nơi mua sắm.
                            </div>
                            <p style={{ fontSize: '11px', lineHeight: '1.5', margin: '11px 0' }}>
                                Đóng góp của bạn là một cách để hỗ trợ một cá nhân/tổ chức là chủ sở hữu chiến dịch nhưng không đảm bảo rằng bạn sẽ nhận được phần thưởng.
                            </p>
                           
                        </div>

                        <label onClick={() => setAcceptRule(prev => !prev)} style={{ display: 'flex', alignItems: 'center', margin: '24px 0', marginLeft: '-2px' }}>
                            <span >
                                {
                                    !isAcceptRule ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                                }
                            </span>
                            <span style={{ marginLeft: '8px', color: '#777', fontSize: '13px' }}>Tôi đồng ý với Điều khoản sử dụng và đã đọc và hiểu Chính sách quyền riêng tư</span>
                        </label>

                        <div onClick={() => setShowPaymentModal(true)} className={cx('btn-payment')} style={{
                            fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', color: 'white', backgroundColor: '#e51075', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', letterSpacing: '1px'
                        }}>
                            Thanh Toán
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        {
            showPaymentModal &&
            <PaymentModal setShowPaymentModal={setShowPaymentModal} handlePaymentMethod={handlePaymentMethod}/>
        }
        </div>
    );
}

export default Payment;