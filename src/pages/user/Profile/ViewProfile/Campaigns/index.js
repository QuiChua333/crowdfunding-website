import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import defaultAvatar from '~/assets/images/defaultAvt.png';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import baseURL from "~/utils/baseURL";
import customAxios from '~/utils/customAxios'
import ItemCampaign from './ItemCampaign';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function ViewCampaigns() {
    const [isHasCampaign, setHasCampaign] = useState(false)
    const [isHasCampaignMember, setHasCampaignMember] = useState(false)
    const currentUser = useSelector(state => state.user.currentUser)
    const { id } = useParams()
    const [campaignsOfUser, setCampaignOfUser] = useState([])
    const [user, setUser] = useState({})
    const getCampaigns = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/campaign/getCampaignsOfUserId/${id}`)
            setCampaignOfUser(res.data.data)
        } catch (error) {

        }
    }
    const getInfoUser = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/user/getInfoUser/${id}`)
            setUser(res.data.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getCampaigns()
        getInfoUser()
    }, [])
    return (
        <div className={cx('wrapper')}>
            {
                currentUser._id === id &&
                <div className={cx('navbar')}>
                    <a href={`/individuals/${id}/profile`} className={cx('nav-item', 'active')}>
                        <span>
                            <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
                            Xem hồ sơ
                        </span>
                    </a>
                    <a href={`/individuals/${id}/edit/profile`} className={cx('nav-item')}>
                        <span>
                            {' '}
                            <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
                            Chỉnh sửa hồ sơ & Cài đặt
                        </span>
                    </a>
                </div>
            }

            <div className={cx('body')}>
                <h1 className={cx('header-name')}>{user.fullName}</h1>

                <div className={cx('content')}>
                    <div className={cx('tabpanel')}>
                        <a href={`/individuals/${id}/profile`} className={cx('tab')}>
                            Hồ sơ
                        </a>
                        <a href={`/individuals/${id}/campaigns`} className={cx('tab', 'active')}>
                            Chiến dịch
                        </a>
                        {
                            currentUser._id && currentUser._id === id &&
                            <a href={`/individuals/${id}/contributions`} className={cx('tab')}>
                                Đóng góp của tôi
                            </a>
                        }
                    </div>

                    <div style={{ marginTop: '32px' }}>
                        <div style={{ fontSize: '24px', fontWeight: '500', lineHeight: '35px', marginBottom: '16px' }}>
                            Dự án là chủ sở hữu
                        </div>
                        {campaignsOfUser.map((item, index) => {
                            if ((currentUser._id && (item.team?.some(x => { return x.user === currentUser._id && x.isAccepted === true }) || item.owner?._id === currentUser._id)) || item.status === 'Đang gây quỹ') {
                                if (!isHasCampaign) setHasCampaign(true)
                                return <ItemCampaign key={index} item={item} />
                            }

                            else return <></>
                        })}
                        {
                            !isHasCampaign && <p>
                                Hiện người này chưa có chiến dịch nào được công khai!</p>
                        }

                    </div>
                    {
                        currentUser._id && currentUser._id === id &&
                        <div style={{ marginTop: '32px' }}>
                            <div style={{ fontSize: '24px', fontWeight: '500', lineHeight: '35px', marginBottom: '16px' }}>
                                Dự án là thành viên
                            </div>

                            {
                                campaignsOfUser.map((item, index) => {
                                    if ((currentUser._id && (item.team?.some(x => { return x.user === currentUser._id && x.isAccepted === true })))) {
                                        if (!isHasCampaignMember) setHasCampaignMember(true)
                                        return <ItemCampaign key={index} item={item} />
                                    }

                                    else return <></>
                                })
                            }
                            {
                                !isHasCampaignMember && <p>
                                    Bạn hiện chưa là thành viên của chiến dịch nào!</p>
                            }


                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default ViewCampaigns;
