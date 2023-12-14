import classNames from "classnames/bind";
import styles from './VerifyUser.module.scss'
import { IoArrowBackSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseURL from "~/utils/baseURL";
const cx = classNames.bind(styles)

function VerifyUser() {
    const inputElement = useRef(null)
    const { id } = useParams();
    const [user, setUser] = useState({})
    const getUser = async () => {
        try {
            const res = await axios.get(`${baseURL}/user/getInfoUser/${id}`)
            setUser(res.data.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleChangeInputText = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setUser(prev => ({
            ...prev, infoVerify: {
                ...prev.infoVerify,
                [name]: value
            }
        }))
    }
    const handleChangImage = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                let res = reader.result;
                setUser(prev => {
                    return {
                        ...prev, infoVerify: {
                            ...prev.infoVerify, identifyCardImage: {
                                ...prev.infoVerify?.identifyCardImage,
                                url: res
                            }
                        }
                    }
                })
            }
        }
    }

    const handleClickVerify = async () => {
        try {
            const infoVerify = {...user.infoVerify}
            const res = await axios.patch(`${baseURL}/user/editUser/${id}`,{infoVerify})
 
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getUser();
    }, [])
    useEffect(() => {
        console.log(user)
    }, [user])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrap-left-side')}>
                <div className={cx('left-side')}>
                    <div className={cx('logo')}>
                        <div className={cx('img-wrapper')}>
                            <img src="https://files.stripe.com/links/fl_live_PhNKcwZW8RFm98uY7jCAah37" />
                        </div>
                        <span>Give Fun</span>
                    </div>

                    <div className={cx('title')}>
                        <h2>Dịch vụ tài chính an toàn</h2>
                    </div>

                    <div className={cx('return')} style={{ marginTop: '28px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}><IoArrowBackSharp style={{ fontSize: '18px', marginBottom: '4px' }} /> Return to Give Fun</span>
                    </div>

                    <div className={cx('footer')}>
                        <p>Powered by <strong style={{ fontSize: '16px', marginLeft: '4px' }}>GIVE FUN</strong></p>
                        <p>Chính sách</p>
                        <p>Tiếng Việt</p>

                        <div style={{ height: '0.5px', background: '#ccc', width: '400px', opacity: '0.4', marginBottom: '16px' }}></div>
                        <p>Liên hệ với đội ngũ hỗ trợ của Give Fun</p>
                        <p>givefunsupport@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className={cx('right-side')}>
                <div className={cx('inner')}>
                    <div className={cx('box-info')}>
                        <h3 className={cx('title')}>Xác minh thông tin cá nhân của bạn</h3>
                        <p style={{ color: 'rgb(89, 97, 113)', marginTop: '8px', opacity: '0.8' }}>Thông tin này được thu thập để xác minh danh tính của bạn và giữ an toàn cho tài khoản của bạn.</p>
                        <div className={cx('email')}>
                            <span style={{ fontWeight: '600', color: 'rgb(65, 69, 82)' }}>{user.fullName}</span>
                            <span>{user.email}</span>
                        </div>

                        <div className={cx('info')}>
                            <h3 className={cx('section')}>Khai báo thông tin</h3>
                            <input placeholder="Họ và tên" value={user.infoVerify?.fullName} name="fullName" onChange={handleChangeInputText} />
                            <input placeholder="Số điện thoại" value={user.infoVerify?.phoneNumber} name="phoneNumber" onChange={handleChangeInputText} />
                            <input placeholder="Ngày sinh" value={user.infoVerify?.birthday} name="birthday" onChange={handleChangeInputText} />
                            <input placeholder="Quê quán" value={user.infoVerify?.detailAddress} name="detailAddress" onChange={handleChangeInputText} />
                            <input placeholder="Số CCCD/ID Card" value={user.infoVerify?.identifyCode} name="identifyCode" onChange={handleChangeInputText} />
                        </div>

                        <div className={cx('info')}>
                            <h3 className={cx('section')}>Ảnh chụp thẻ công dân</h3>

                            <div className={cx('img-wrapper')}>
                                {!user.infoVerify?.identifyCardImage?.url &&
                                    <div className={cx('no-image')}>
                                        <span>Tải ảnh lên</span>
                                    </div>
                                }
                                <input type="file" ref={inputElement} accept="image/png, image/jpeg" onChange={handleChangImage} />
                                {user.infoVerify?.identifyCardImage?.url &&
                                    <>
                                        <img src={user.infoVerify?.identifyCardImage?.url} />
                                        <span onClick={() => inputElement.current.click()} className={cx('icon-edit')}><MdEdit style={{ color: '#7a69b3', fontSize: '18px' }} /></span>
                                    </>
                                }

                            </div>
                        </div>

                        <div style={{marginTop: '48px'}}>
                        <div onClick={handleClickVerify} className={cx('btn-ok')}>
                            Xác nhận
                        </div>
                    </div>

                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default VerifyUser;