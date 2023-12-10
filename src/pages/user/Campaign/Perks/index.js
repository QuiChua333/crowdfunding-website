import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import { FaAngleDown } from "react-icons/fa";
import PerkTable from "./PerkTable";

import images from "~/assets/images";




import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseURL from "~/utils/baseURL";
import { setLoading } from "~/redux/slides/GlobalApp";
import { useDispatch } from "react-redux";


const cx = classNames.bind(styles);


function PerksCampaign() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [campagin, setCampaign] = useState({})
    const [listPerks, setListPerks] = useState([]);
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
    const getPerksByCampaignId = async () => {
        try {
            const res = await axios.get(`${baseURL}/perk/getPerksByCampaignId/${id}`)
            setListPerks(res.data.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getCampaign()
        getPerksByCampaignId()
    }, [])
    return (
        <div>
            <div className={cx('wrapper')}>
                <SidebarCampaign current={3}
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
                                    Chiến dịch / Đặc quyền
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
                                listPerks.length > 0 &&
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
                                            <span ><strong style={{ display: 'inline-block', minWidth: '12px' }}>{numberSelected}</strong> perks selected</span>
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

                                                        <div className={cx('action', 'action-delete')}>
                                                            Delete perk
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>

                                        <div>
                                            <div style={{ display: 'inline-block', marginLeft: '24px' }}>
                                                <Link to={`/campaigns/${id}/edit/perks/new`} className={cx('btn', 'btn-ok')} >CREATE NEW PERK</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '40px' }}>
                                        <PerkTable onPerkTableChange={handlePerkChange} />
                                    </div>

                                </div>
                            }
                            {
                                listPerks.length === 0 &&
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ width: '800px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '24px', fontWeight: '600', marginTop: '32px' }}>Bạn chưa tạo bất kỳ đặc quyền nào </div>
                                        <div style={{ marginTop: '12px' }}>
                                            <span>Đặc quyền là những ưu đãi được cung cấp cho những người ủng hộ để đổi lấy sự hỗ trợ của họ. Chúng tôi nhận thấy rằng các chiến dịch cung cấp đặc quyền kiếm được nhiều tiền hơn 143% so với những chiến dịch không cung cấp đặc quyền. Đặc quyền giúp bạn thu hút lượng khán giả lớn hơn, khiến mọi người cảm thấy được đánh giá cao hơn vì những đóng góp của họ và giúp bạn quảng bá về chiến dịch của mình.</span>
                                        </div>
                                        <img src={images.no_perk} style={{ width: '600', height: '270px', objectFit: 'cover', marginTop: '32px' }} />

                                        <div style={{ marginTop: '40px' }}>Bắt đầu nào!</div>
                                        <div style={{ fontSize: '14px', color: '#a8a8a8' }}>Tạo đặc quyền của bạn ở đây.</div>
                                        <img src={images.arrow} style={{ width: '40px', height: '60px', objectFit: 'cover', marginTop: '32px' }} />

                                        <div style={{ marginTop: '40px' }}>
                                            <Link to={`/campaigns/${id}/edit/perks/new`} className={cx('btn', 'btn-ok')} style={{ fontSize: '16px' }} >TẠO ĐẶC QUYỀN </Link>
                                        </div>


                                    </div>


                                </div>
                            }



                            {/* Footer */}
                            {
                                listPerks.length === 0 &&
                                <div style={{ marginTop: '60px', marginBottom: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                    <a href="#" className={cx('btn', 'btn-ok')} >TIẾP TỤC</a>
                                </div>
                            }

                            {
                                listPerks.length > 0 &&
                                <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                    <a href="#" className={cx('btn', 'btn-ok')} >SAVE & CONTINUE</a>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PerksCampaign;