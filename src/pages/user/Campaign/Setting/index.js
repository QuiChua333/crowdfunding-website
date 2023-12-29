import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";
import { TiCancel } from "react-icons/ti";

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
import { useDispatch, useSelector } from "react-redux";
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
                owner: res.data.data.owner || '',
                team: res.data.data.team || []
            }
            setCampaign({ ...infoBasic })
            setCampaignState({ ...infoBasic })


        } catch (error) {

        }
    }
    useEffect(() => {
        getCampaign()
    }, [])
    // const handleClickSaveContinue = async () => {
    //     const body = { ...campaginState }
    //     const id = body.id;
    //     delete body.id
    //     delete body.status
    //     delete body.title
    //     delete body.cardImage
    //     delete body.owner;
    //     dispatch(setLoading(true))
    //     try {
    //         const res = await customAxios.patch(`${baseURL}/campaign/editCampaign/${id}`, body)
    //         dispatch(setLoading(false))

    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }
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
    const [isEditAll, setEditAll] = useState(null);
    const currentUser = useSelector(state => state.user.currentUser)
    useEffect(() => {
        if (JSON.stringify(campagin) !== '{}') {
            let edit = false
            if (currentUser.isAdmin) edit = true
            else {
                if (campagin.owner?._id === currentUser._id) edit = true
                if (campagin.team?.some(x => { return x.user === currentUser._id && x.isAccepted === true && x.canEdit === true})) {
                    edit = true
                }
            }
            if (edit === true) {
                setShowErrorDelete(false)
            }
            else {
                setContentError('Bạn không có quyền chỉnh sửa lúc này!')
                setShowErrorDelete(true)
            }
            setEditAll(edit)
        }
    }, [campagin])
    const [showErrorDelete, setShowErrorDelete] = useState(false)
    const [contentError, setContentError] = useState('')
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

                    <div className={cx('content')} style={{ pointerEvents: !isEditAll && 'none' }}>
                        <div className={cx('controlBar')}>
                            <div className={cx('controlBar-container')}>
                                <div className={cx('controlBar-content')}>
                                    Chiến dịch / Cài đặt
                                </div>

                            </div>
                            {
                                showErrorDelete &&
                                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ff324b', paddingLeft: '40px', height: '80px' }}>
                                    <span style={{ color: '#fff' }}><TiCancel style={{ color: '#fff', fontSize: '48px' }} />  {contentError}</span>
                                </div>
                            }


                        </div>
                        <div className={cx('body')}>



                            <div className={cx('entreSection')}>
                                <div className={cx('entreField-header')}>
                                    Cài đặt

                                </div>
                                <div className={cx('entreField-subHeader')}>
                                    Phát hành chiến dịch của bạn tại đây!
                                </div>
                                <div className={cx('entreField-subHeader')}>
                                    Lưu ý: Bạn phải đạt ít nhất 70% mục tiêu gây quỹ thì chiến dịch của bạn mới được xem là thành công!
                                </div>




                            </div>

                            <div className={cx('entreSection')}>


                                {
                                    campagin.status === 'Bản nháp'&&
                                    <div style={{ marginTop: '60px', borderBottom: '1px solid #C8C8C8', paddingBottom: '30px', textAlign: 'left' }}>
                                        <a onClick={handleClickLaunchCampaign} className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }} >PHÁT HÀNH CHIẾN DỊCH</a>
                                    </div>
                                }
                                {
                                    campagin.status === 'Đang tạm ngưng'&&
                                    <div style={{ marginTop: '60px', borderBottom: '1px solid #C8C8C8', paddingBottom: '30px', textAlign: 'left' }}>
                                        <a onClick={handleClickLaunchCampaign} className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }} >CHIẾN DỊCH ĐANG BỊ TẠM NGƯNG</a>
                                    </div>
                                }
                                {
                                    campagin.status === 'Đang gây quỹ'&&
                                    <div style={{ marginTop: '60px', borderBottom: '1px solid #C8C8C8', paddingBottom: '30px', textAlign: 'left' }}>
                                        <a  className={cx('btn', 'btn-ok')} style={{ marginLeft: '0' }} >CHIẾN DỊCH ĐÃ PHÁT HÀNH</a>
                                    </div>
                                }
                                {
                                    campagin.status === 'Đã kết thúc'&&
                                    <div style={{ marginTop: '60px', borderBottom: '1px solid #C8C8C8', paddingBottom: '30px', textAlign: 'left' }}>
                                        <a  className={cx('btn')} style={{ marginLeft: '0', background: '#a8a8a8', color: '#fff' }} >CHIẾN DỊCH ĐÃ KẾT THÚC</a>
                                    </div>
                                }

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