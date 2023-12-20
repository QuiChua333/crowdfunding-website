import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";
import Footer from "~/components/Layout/components/Footer";
import images from "~/assets/images";
import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemTable from "./ItemTable";
import { useParams } from "react-router-dom";
import customAxios from '~/utils/customAxios'

import baseURL from "~/utils/baseURL";

const cx = classNames.bind(styles);


function ItemsCampaign() {
    const { id } = useParams();
    const [isHasItem, setHasItem] = useState(true);
    const [campagin, setCampaign] = useState({})
    const [listItems,setListItems] = useState()
    const getCampaign = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/campaign/getCampaignById/${id}`)
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
    const getItemsByCampaignContainPerk = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/item/getItemsByCampaignContainPerk/${id}`)

            setListItems(res.data.data || [])
        } catch (error) {

        }
    }
    useEffect(() => {
        getCampaign()
        getItemsByCampaignContainPerk();
    }, [])
    return (
        <>
            <div className={cx('wrapper')}>
            <SidebarCampaign current={4}
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
                                    Chiến dịch / Vật phẩm
                                </div>
                               
                            </div>
                  
                        </div>
                        <div className={cx('body')}>

                            {/* Khi có item */}
                            {
                                listItems?.length > 0 &&
                                <div>
                                    <div className={cx('entreSection')} style={{ width: '80%' }}>
                                        <div className={cx('entreField-header')}>
                                            Vật phẩm
                                        </div>
                                        <div className={cx('entreField-subHeader')}>
                                        Bạn đang cung cấp những gì trong các đặc quyền được yêu cầu bởi những người ủng hộ? 
                                        </div>

                                    </div>
                                    <div className={cx('perkTable-action')}>
                                        <div>

                                        <div style={{ display: 'inline-block' }}>
                                                <Link to={`/campaigns/${id}/edit/items/new`} className={cx('btn', 'btn-ok')} style={{marginLeft: '0'}}>TẠO MỚI VẬT PHẨM</Link>
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{ marginTop: '40px' }}>
                                        <ItemTable listItems={listItems}/>
                                    </div>

                                </div>
                            }
                            {
                                listItems?.length === 0 &&
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ width: '580px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '24px', fontWeight: '400', marginTop: '32px' }}>Xem tất cả các vật phẩm của bạn và quản lý chúng ở đây. </div>
                                        <div style={{ marginTop: '12px' }}>
                                            <span>Vật phẩm là những gì bạn cung cấp cho người ủng hộ khi họ yêu cầu đặc quyền.</span>
                                        </div>
                                        <img src={images.no_item} style={{ width: '600', height: '200px', objectFit: 'cover', marginTop: '32px' }} />

                                        <div style={{ marginTop: '40px' }}>Bạn chưa có bất kỳ vật phẩm nào.</div>
                                        <div style={{ fontSize: '14px', color: '#a8a8a8' }}>Hãy chuyển đến trang đặc quyền để tạo đặc quyền trước rồi thêm các vật phẩm vào.</div>
                                        <img src={images.arrow} style={{ width: '40px', height: '60px', objectFit: 'cover', marginTop: '32px' }} />

                                        <div style={{ marginTop: '40px' }}>
                                            <a href="/campaigns/:id/edit/perks/table" className={cx('btn', 'btn-ok')} style={{ fontSize: '16px' }} >ĐI ĐẾN TRANG ĐẶC QUYỀN </a>
                                        </div>


                                    </div>


                                </div>
                            }




                        </div>
                    </div>
                    <Footer />


                </div>

            </div>

    
        </>
    );
}

export default ItemsCampaign;