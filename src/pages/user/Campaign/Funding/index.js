import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";

import images from "~/assets/images";




import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseURL from "~/utils/baseURL";
import { useDispatch } from "react-redux";
import { setLoading } from "~/redux/slides/GlobalApp";
const cx = classNames.bind(styles);

function Funding() {
    const { id } = useParams();
    const dispatch = useDispatch(); 
    const [campagin, setCampaign] = useState({})
    const [campaginState, setCampaignState] = useState({})
    const handleChangeInputText = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setCampaignState(prev => ({...prev, [name]: value}))
    }
    const getCampaign = async () => {
        try {
            const res = await axios.get(`${baseURL}/campaign/getCampaignById/${id}`)
            let infoBasic = {
                id: res.data.data._id,
                title: res.data.data.title || '',
                cardImage: res.data.data.cardImage || { url: '', public_id: '' },
                status: res.data.data.status,
                goal: res.data.data.goal || '',
                momoNumber: res.data.data.momoNumber || '',
                momoNumberConfirm:  res.data.data.momoNumber || ''
            }
            setCampaign({ ...infoBasic })
            setCampaignState({ ...infoBasic })

        } catch (error) {

        }
    }
    useEffect(() => {
        getCampaign()
    }, [])
    useEffect(() => {
        console.log(campaginState)
    },[campaginState])
    const handleClickVerifyUser = async () => {
        try {
            const res = await axios.get(`${baseURL}/user/getLinkVerifyUser`);
            window.location.href = res.data.data
        } catch (error) {
            
        }
    }
    const handleClickSaveContinue = async () => {
        const body = { ...campaginState }
        const id = body.id;
        delete body.id
        delete body.status
        delete body.title
        delete body.cardImage
        dispatch(setLoading(true))
        try {
            const res = await axios.patch(`${baseURL}/campaign/editCampaign/${id}`, body)
            dispatch(setLoading(false))
            window.location.href = `/campaigns/${id}/edit/settings`
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>
            <div className={cx('wrapper')}>
                <SidebarCampaign current={6}
                    status={campagin.status}
                    title={campagin.title}
                    cardImage={campagin.cardImage?.url}
                    id={id}
                />
                <div style={{ flex: '1' }}>

                    <HeaderPage isFixed={false} />

                    <div className={cx('content')}>
                        <div className={cx('controlBar')}>
                            <div className={cx('controlBar-container')}>
                                <div className={cx('controlBar-content')}>
                                    Chiến dịch / Gây quỹ
                                </div>
                               
                            </div>

                        </div>
                        <div className={cx('body')}>



                            <div className={cx('entreSection')}>
                                <div className={cx('entreField-header')}>
                                    Số Tiền Mục Tiêu Của Chiến Dịch <span className={cx('entreField-required')}>*</span>

                                </div>
                                <div className={cx('entreField-subHeader')}>
                                    Bạn muốn quyên góp bao nhiêu tiền cho chiến dịch này? Yêu cầu số tiền mục tiêu tối thiểu là 10 triệu đồng.
                                </div>

                                <div className={cx('entreField')}>
                                    <div className={cx('inputCurrencyField')} style={{ width: '100%' }}>
                                        <span className={cx('inputCurrencyField-symbol')}>$</span>
                                        <input placeholder={"10000000"} type="text" maxlength="50" className={cx('itext-field', 'inputCurrencyField-input')} value={campaginState.goal} onChange={handleChangeInputText} name="goal"/>
                                        <span className={cx('inputCurrencyField-isoCode')}>VNĐ</span>
                                    </div>
                                </div>

                                <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>

                            </div>

                            <div className={cx('entreSection')}>
                                <div className={cx('entreField-header')}>
                                    Xác minh người nhận tiền

                                </div>
                                <div className={cx('entreField-subHeader')}>
                                    Chủ sở hữu chiến dịch phải được xác minh để khởi động chiến dịch. Việc xác minh ID sẽ được thực hiện một cách an toàn với bên thứ ba và tạo ra một nền tảng đáng tin cậy hơn cho bạn và những người ủng hộ bạn.
                                </div>

                                <div className={cx('entreField')}>
                                    <a onClick={handleClickVerifyUser} className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }} >XÁC MINH ID CỦA BẠN</a>
                                </div>

                                <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>

                            </div>

                            <div className={cx('entreSection')}>
                                <div className={cx('entreField-header')}>
                                    Thông Tin Ngân Hàng

                                </div>
                                <div className={cx('entreField-subHeader')}>
                                    Điền thông tin tài khoản ngân hàng của bạn. Chúng tôi sẽ chỉ có thể gửi tiền cho bạn nếu bạn đã huy động được tối thiểu 4 triệu đồng.
                                </div>

                                <div className={cx('entreField')}>
                                    <label className={cx('entreField-label')}>Số tài khoản <span className={cx('entreField-required')}>*</span></label>
                                    <div className={cx('entreField-subLabel')}>
                                        Nhập số tài khoản mà bạn muốn nhận tiền. Hãy đảm bảo số tài khoản thật chính xác, nếu không chúng tôi sẽ không thể chuyển tiền cho bạn.
                                    </div>
                                    <input type="text" className={cx('itext-field')} placeholder="000000000000" value={campaginState.momoNumber} onChange={handleChangeInputText} name="momoNumber"/>


                                    <div className={cx('entreField-subLabel')} style={{ marginTop: '16px' }}>
                                        Nhập lại số tài khoản.
                                    </div>
                                    <input type="text" className={cx('itext-field')} placeholder="000000000000" value={campaginState.momoNumberConfirm} onChange={handleChangeInputText} name="momoNumberConfirm"/>

                                </div>
                                <div className={cx('entreField')}>
                                    <a href="#" className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }} >LƯU THÔNG TIN NGÂN HÀNG</a>
                                </div>

                                {/* <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div> */}
                                <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                    <a onClick={handleClickSaveContinue} className={cx('btn', 'btn-ok')} >LƯU VÀ TIẾP TỤC</a>
                                </div>

                            </div>

                        </div>
                    </div>
                    <Footer />
                </div>

            </div>
 
        </>
    );
}

export default Funding;