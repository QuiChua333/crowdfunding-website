import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import customAxios from '~/utils/customAxios'

import images from "~/assets/images";




import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import baseURL from "~/utils/baseURL";
import { useDispatch } from "react-redux";
import { setLoading } from "~/redux/slides/GlobalApp";
const cx = classNames.bind(styles);

function SettingCampaign() {
    const { id } = useParams();
    const dispatch = useDispatch(); 
    const [campaginState, setCampaignState] = useState({})

    const [campagin, setCampaign] = useState({})

    const getCampaign = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/campaign/getCampaignById/${id}`)
            let infoBasic = {
                id: res.data.data._id,
                title: res.data.data.title || '',
                cardImage: res.data.data.cardImage || { url: '', public_id: '' },
                status: res.data.data.status,
                isIndemand: res.data.data.isIndemand || false,
            }
            setCampaign({ ...infoBasic })
            setCampaignState({ ...infoBasic })


        } catch (error) {

        }
    }
    useEffect(() => {
        getCampaign()
    }, [])
    const handleClickSaveContinue = async () => {
        const body = { ...campaginState }
        const id = body.id;
        delete body.id
        delete body.status
        delete body.title
        delete body.cardImage
        dispatch(setLoading(true))
        try {
            const res = await customAxios.patch(`${baseURL}/campaign/editCampaign/${id}`, body)
            dispatch(setLoading(false))

        } catch (error) {
            console.log(error.message)
        }
    }
    const handleClickLaunchCampaign = async () => {
        dispatch(setLoading(true))
        try {
            const res = await customAxios.patch(`${baseURL}/campaign/launchCampaign/${id}`)
            dispatch(setLoading(false))
            window.location.href = `/individuals/${res.data.data.owner}/campaigns`

        } catch (error) {
            console.log(error.message)
        }
    }
    return (
       <>
            <div className={cx('wrapper')}>
                 <SidebarCampaign current={7}
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
                                    Chiến dịch / Cài đặt
                                </div>
                               
                            </div>
                   
                        </div>
                        <div className={cx('body')}>
    
    
    
                            <div className={cx('entreSection')}>
                                <div className={cx('entreField-header')}>
                                    Cài đặt
    
                                </div>
                                <div className={cx('entreField-subHeader')}>
                                Chúng tôi cung cấp cho bạn các tính năng bổ sung có thể giúp củng cố chiến dịch của bạn. Định cấu hình cài đặt chiến dịch tùy chọn bên dưới.
                                </div>
    
    
                                <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>
    
                            </div>
    
                            <div className={cx('entreSection')}>
                                <div className={cx('entreField-header')}>
                                    InDemand
    
                                </div>
                                <div className={cx('entreField-subHeader')}>
                                InDemand giúp chủ chiến dịch có thể tiếp tục gây quỹ sau khi chiến dịch của họ kết thúc. Với InDemand, bạn có thể chấp nhận đóng góp sau khi chiến dịch kết thúc, phát triển cộng đồng và tiếp cận đối tượng mới, đồng thời được hiển thị liên tục trên nền tảng Indiegogo. Các chiến dịch InDemand trên nền tảng huy động được số tiền trung bình nhiều hơn 123% so với giai đoạn cấp vốn ban đầu. Tìm hiểu thêm
                                </div>
    
                                <div className={cx('entreField')}>
                                    <label onClick={() => setCampaignState(prev => ({...prev, isIndemand: !prev.isIndemand}))} style={{ display: 'flex', alignItems: 'center', margin: '16px 0', marginLeft: '-2px' }}>
                                        <span >
                                            {
                                                !campaginState.isIndemand ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                                            }
                                        </span>
                                        <span style={{ marginLeft: '8px' }}>Chọn InDemand</span>
                                    </label>
                                </div>
                                <div className={cx('entreField')}>
                                    <a onClick={handleClickSaveContinue} className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }} >LƯU CHIẾN DỊCH</a>
                                </div>
    
                                <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                    <a onClick={handleClickLaunchCampaign} className={cx('btn', 'btn-ok')} >PHÁT HÀNH CHIẾN DỊCH</a>
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

export default SettingCampaign;