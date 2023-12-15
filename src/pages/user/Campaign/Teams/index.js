import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import TeamMember from "./TeamMember";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { setMessageBox } from "~/redux/slides/GlobalApp";
import images from "~/assets/images";




import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseURL from "~/utils/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "~/redux/slides/GlobalApp";
const cx = classNames.bind(styles);

function TeamCampaign() {
    const messageBox = useSelector(state => state.globalApp.messageBox)
    const { id } = useParams();
    const dispatch = useDispatch();
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [contentError, setContentError] = useState('')
    const [campagin, setCampaign] = useState({})
    const [email, setEmail] = useState('');
    const [members, setMembers] = useState([])
    const [isCheckRoleEditing, setCheckRoleEditng] = useState(false);
    const [memberId, setMemberId] = useState('')
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
    const getTeamMember = async () => {
        try {
            const res = await axios.get(`${baseURL}/campaign/getTeamMember/${id}`)
            setMembers(res.data.data)


        } catch (error) {

        }
    }
    const handleClickSendInvitation = async () => {
        // check validate email
        if (!email.match(

            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            console.log('invalid email')
            setShowErrorDelete(false)
            return;
        }
        setShowErrorDelete(false)
        dispatch(setLoading(true))
        try {
            const res = await axios.get(`${baseURL}/user/getUserByEmail/${email}`)
            if (!res.data.data) {
                setContentError('Email người dùng này không tồn tại trong hệ thống')
                setShowErrorDelete(true)
        dispatch(setLoading(false))

                return;
            }

            if (members?.some(item => item.user.email === email)) {
                setContentError('Email người dùng này đã nằm trong team của bạn!')
                setShowErrorDelete(true)
        dispatch(setLoading(false))

                return;
            }
            const res2 = await axios.post(`${baseURL}/campaign/sendInvitation`, {
                campaignId: id,
                email,
                canEdit: isCheckRoleEditing,
            })
        dispatch(setLoading(false))

            setEmail('');
            setCheckRoleEditng(false)
            getTeamMember()
            setShowErrorDelete(false)

        } catch (error) {
            console.log(error.message)
        }
    }
    const handleRemoveMember = (memberId) => {
        setMemberId(memberId)
        dispatch(setMessageBox({
            title: 'Xóa thành viên?',
            content: 'Xóa thành viên nhóm sẽ thu hồi quyền truy cập của họ vào chiến dịch.',
            contentOK: 'XÁC NHẬN',
            contentCancel: 'HỦY',
            isShow: true,
            type: 'deleteMember'
        }))
    }
    const deleteMember = async (memberId) => {
        try {
            const res = await axios.delete(`${baseURL}/campaign/${id}/deleteMember/${memberId}`)
            getTeamMember();
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleChangeEdit = (memberId, valueEdit) => {
        setMembers(prev => [...prev].map(item => {
            if (item.user._id === memberId) {
                return {...item, canEdit: valueEdit}
            }
            else return item
        }))
    }
    const handleChangeRole = (memberId, role) => {
        setMembers(prev => [...prev].map(item => {
            if (item.user._id === memberId) {
                return {...item, role: role}
            }
            else return item
        }))

    }
    useEffect(() => {
        console.log(members)
    },[members])
    
    useEffect(() => {
        if (messageBox.type === 'deleteMember') {
            if (messageBox.result === true) {
                deleteMember(memberId)
            }
        }
    }, [messageBox.result])
    useEffect(() => {
        getCampaign()
        getTeamMember()
    }, [])
    const handleClickSaveTeam = async () => {
        dispatch(setLoading(true))
        try {
            const res = await axios.patch(`${baseURL}/campaign/editCampaign/${id}`, {
                team: [...members].map(item => ({...item, user: item.user._id}))
            })
        dispatch(setLoading(false))
            window.location.href = `/campaigns/${id}/edit/funding`
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>
            <div className={cx('wrapper')}>
                <SidebarCampaign current={5}
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
                                    Chiến dịch / Team
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
                                    Team chiến dịch


                                </div>
                                <div className={cx('entreField-subHeader')}>
                                    Nếu những người khác đang giúp bạn thực hiện chiến dịch, hãy gửi cho họ lời mời qua email bên dưới. Khi họ chấp nhận lời mời, họ sẽ được đại diện trên trang chiến dịch của bạn với tư cách là thành viên trong nhóm của bạn.
                                </div>

                                <div className={cx('entreField')}>
                                    <label className={cx('entreField-label')}>Email Thành Viên Mới</label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type="email" className={cx('itext-field')} style={{ flex: '1' }} onChange={(e) => setEmail(e.target.value)} />
                                        <a onClick={handleClickSendInvitation} className={cx('btn-add-video')} >GỬI LỜI MỜI</a>
                                    </div>
                                    <div>
                                        <label onClick={() => setCheckRoleEditng(prev => !prev)} style={{ display: 'flex', alignItems: 'center', margin: '16px 0', marginLeft: '-2px', cursor: 'pointer', userSelect: 'none' }}>
                                            <span >
                                                {
                                                    !isCheckRoleEditing ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                                                }
                                            </span>
                                            <span style={{ marginLeft: '8px' }}>Cấp cho thành viên này toàn quyền chỉnh sửa chiến dịch.</span>
                                        </label>



                                        <div style={{ marginTop: '32px' }}>
                                            <div className={cx('team-orner')}>
                                                <label className={cx('entreField-label')}>Chủ sỡ hữu</label>
                                                <div style={{ borderTop: '1px solid #C8C8C8' }}></div>
                                                <TeamMember isOwner member={members?.find(item => item.isOwner === true)} changeRole={handleChangeRole} />
                                            </div>
                                            <div className={cx('team-members')}>
                                                <label className={cx('entreField-label')}>Thành viên</label>
                                                <div style={{ borderTop: '1px solid #C8C8C8' }}></div>
                                                {
                                                    members?.filter(item => item.isOwner === false).map((item2, index) => {
                                                        return <TeamMember key={index} member={item2} removeMember={handleRemoveMember} changeEdit={handleChangeEdit} changeRole={handleChangeRole}/>
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '60px', borderTop: members?.length > 1 && '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                    <a onClick={handleClickSaveTeam} className={cx('btn', 'btn-ok')} >LƯU VÀ TIẾP TỤC</a>
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

export default TeamCampaign;