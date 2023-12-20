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
const cx = classNames.bind(styles);
function ViewCampaigns() {
    console.log('campaign')
    const { id } = useParams()
    const [campaignsOfUser, setCampaignOfUser] = useState([])
    const getCampaigns = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/campaign/getCampaignsOfUserId/${id}`)
            setCampaignOfUser(res.data.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getCampaigns()
    }, [])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <Link to={`/individuals/${id}/profile`} className={cx('nav-item', 'active')}>
                    <span>
                        <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
                        Xem hồ sơ
                    </span>
                </Link>
                <Link to={`/individuals/${id}/edit/profile`} className={cx('nav-item')}>
                    <span>
                        {' '}
                        <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
                        Chỉnh sửa hồ sơ & Cài đặt
                    </span>
                </Link>
            </div>

            <div className={cx('body')}>
                <h1 className={cx('header-name')}>Phan Trọng Tính</h1>

                <div className={cx('content')}>
                    <div className={cx('tabpanel')}>
                        <Link to={`/individuals/${id}/profile`} className={cx('tab')}>
                            Hồ sơ
                        </Link>
                        <Link to={`/individuals/${id}/campaigns`} className={cx('tab', 'active')}>
                            Chiến dịch
                        </Link>
                        <Link to={`/individuals/${id}/contributions`} className={cx('tab')}>
                            Đóng góp
                        </Link>
                    </div>

                    <div style={{ marginTop: '32px' }}>
                        <div style={{ fontSize: '24px', fontWeight: '500', lineHeight: '35px', marginBottom: '16px' }}>
                            Dự án là chủ sở hữu
                        </div>
                        {campaignsOfUser.map((item, index) => {
                            return <ItemCampaign key={index} item={item} />;
                        })}
                        <div className={cx('show-more')}>
                            <span>Show more</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '32px' }}>
                        <div style={{ fontSize: '24px', fontWeight: '500', lineHeight: '35px', marginBottom: '16px' }}>
                            Dự án là thành viên
                        </div>
                        {/* {[1, 2, 3].map((item, index) => {
                            return <ItemCampaign />;
                        })} */}
                        <div className={cx('show-more')}>
                            <span>Show more</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCampaigns;
