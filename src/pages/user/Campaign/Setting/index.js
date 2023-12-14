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

const cx = classNames.bind(styles);

function SettingCampaign() {
    const [isCheckRoleEditing, setCheckRoleEditng] = useState(false);
    const { id } = useParams();
    const [campagin, setCampaign] = useState({})

    const getCampaign = async () => {
        try {
            const res = await axios.get(`${baseURL}/campaign/getCampaignById/${id}`)
            let infoBasic = {
                id: res.data.data._id,
                title: res.data.data.title || '',
                cardImage: res.data.data.cardImage || { url: '', public_id: '' },
                status: res.data.data.status,
            }
            setCampaign({ ...infoBasic })


        } catch (error) {

        }
    }
    useEffect(() => {
        getCampaign()
    }, [])
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
                                    Chiến dịch / Cài đặt
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
                                    <label onClick={() => setCheckRoleEditng(prev => !prev)} style={{ display: 'flex', alignItems: 'center', margin: '16px 0', marginLeft: '-2px' }}>
                                        <span >
                                            {
                                                !isCheckRoleEditing ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                                            }
                                        </span>
                                        <span style={{ marginLeft: '8px' }}>Chọn InDemand</span>
                                    </label>
                                </div>
    
                                <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                    <a href="#" className={cx('btn', 'btn-ok')} >TỔNG QUAN & RA MẮT CHIẾN DỊCH</a>
                                </div>
    
                            </div>
    
    
    
                        </div>
                    </div>
                </div>
    
            </div>
            <Footer />
       </>
    );
}

export default SettingCampaign;