import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Profile.module.scss';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import defaultAvatar from '~/assets/images/defaultAvt.png';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { IoMdMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { useSelector } from 'react-redux';
import baseURL from "~/utils/baseURL";
import customAxios from '~/utils/customAxios'
const cx = classNames.bind(styles);

function ProfilePersonal() {
    const { id } = useParams()
    const [user,setUser] = useState({})
    const currentUser = useSelector(state => state.user.currentUser)
    const [showModalCampaigns, setShowModalCampaigns] = useState(false);
    const [showModalComments, setShowModalComments] = useState(false);
    const [showModalContributes, setShowModalContributes] = useState(false);

    const handleShowModalOverCampaigns = () => {
        setShowModalCampaigns(true);
    };
    const handleShowModalOutCampaigns = () => {
        setShowModalCampaigns(false);
    };
    const handleShowModalOverComments = () => {
        setShowModalComments(true);
    };
    const handleShowModalOutComments = () => {
        setShowModalComments(false);
    };
    const handleShowModalOverContributes = () => {
        setShowModalContributes(true);
    };
    const handleShowModalOutContributes = () => {
        setShowModalContributes(false);
    };
    const getInfoUser = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/user/getInfoUser/${id}`)
            setUser(res.data.data)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getInfoUser()
    },[])
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
                        <a href={`/individuals/${id}/profile`} className={cx('tab', 'active')}>
                            Hồ sơ
                        </a>
                        <a href={`/individuals/${id}/campaigns`} className={cx('tab')}>
                            Chiến dịch
                        </a>
                        {
                            currentUser._id && currentUser._id === id &&
                            <a href={`/individuals/${id}/contributions`} className={cx('tab')}>
                            Đóng góp của tôi
                            </a>
                        }
                    </div>

                    <div className={cx('container-body-profile')}>
                        <img className={cx('avatar')} src={defaultAvatar} alt="img" />
                        <div className={cx('container-middle')}>
                            <span className={cx('title-profile')}>Giới thiệu</span>
                            <p className={cx('des-profile')}>
                                Tôi hiện là một sinh viên năm 3 tại trường đại học Công Nghệ Thông Tin - UIT, tôi và một
                                người bạn cộng sự của tôi đang ấp ủ xây dựng một dự án gây quỹ cộng đồng trên nền tảng
                                givefun.com. Mục đích của dự án là mang lại giá trị hỗ trợ cho việc mua những cơ sở vật
                                chất phục vụ cho việc dạy lập trình cho các bạn học sinh có ước mơ làm việc trong nghành
                                IT tại Việt Nam.
                            </p>
                        </div>
                        <div className={cx('container-final')}>
                            <span className={cx('title-profile')}>Về bản thân tôi</span>
                            <div className={cx('container-me')}>
                                <div className={cx('container-campaigns')}>
                                    <span className={cx('quantity-campaigns')}>0</span>
                                    <span className={cx('title-campaigns')}>Chiến dịch</span>
                                    <BsFillQuestionCircleFill
                                        onMouseOver={handleShowModalOverCampaigns}
                                        onMouseOut={handleShowModalOutCampaigns}
                                        className={cx('icon-campaigns')}
                                    />
                                    {showModalCampaigns && (
                                        <div className={cx('modal-hover')}>
                                            Từ khi bắt đầu cho đến khi về đích, đã có điều gì đó xảy ra đối với niềm đam
                                            mê kinh doanh, liên quan đến mục đích hoặc sáng tạo của bạn.
                                        </div>
                                    )}
                                </div>
                                <div className={cx('container-campaigns')}>
                                    <span className={cx('quantity-campaigns')}>0</span>
                                    <span className={cx('title-campaigns')}>Tương tác</span>
                                    <BsFillQuestionCircleFill
                                        onMouseOver={handleShowModalOverComments}
                                        onMouseOut={handleShowModalOutComments}
                                        className={cx('icon-campaigns')}
                                    />
                                    {showModalComments && (
                                        <div className={cx('modal-hover')}>
                                            Tương tác là tên của trò chơi khi nói đến huy động vốn từ cộng đồng. Chia sẻ
                                            suy nghĩ của bạn về các chiến dịch có thể giúp ích cho các nhà vận động và
                                            củng cố cộng đồng GiveFun.
                                        </div>
                                    )}
                                </div>
                                <div className={cx('container-campaigns')}>
                                    <span className={cx('quantity-campaigns')}>0</span>
                                    <span className={cx('title-campaigns')}>Đóng góp</span>
                                    <BsFillQuestionCircleFill
                                        onMouseOver={handleShowModalOverContributes}
                                        onMouseOut={handleShowModalOutContributes}
                                        className={cx('icon-campaigns')}
                                    />
                                    {showModalContributes && (
                                        <div className={cx('modal-hover')}>
                                            Cho dù bạn đã đóng góp ít hay nhiều, con số này biểu thị số lần bạn đã giúp
                                            hỗ trợ ý tưởng, dự án hoặc mục tiêu của người khác.
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{ height: '1.5px', backgroundColor: '#ccc', marginTop: '25px' }}></div>
                            <div style={{ marginTop: '30px' }}>
                                <span className={cx('title-profile')}>Xác minh</span>
                                <div style={{ display: 'flex', flexDirection: 'column', border: '10px solid #E1E1E1', marginTop: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#6a6a6a', margin: '5px 10px' }}>
                                        <IoMdMail style={{ fontSize: '20px' }} />
                                        <span style={{ marginLeft: '10px', fontWeight: '500' }}>Email Verified</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#6a6a6a', margin: '5px 10px' }}>
                                        <FaFacebook style={{ fontSize: '20px' }} />
                                        <span style={{ marginLeft: '10px', fontWeight: '500' }}>516 friends</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePersonal;
