import classNames from "classnames/bind";
import styles from '../../Profile.module.scss'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import defaultAvatar from '~/assets/images/defaultAvt.png'
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";

const cx = classNames.bind(styles);
function EditSetting() {
    const [isUpdatePasswordEmail, setUpdatePasswordEmail] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <Link to={'/individuals/:id/profile'} className={cx('nav-item')}>
                    <span>
                        <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
                        View Profile
                    </span>
                </Link>
                <Link to={`/individuals/:id/edit/profile`} className={cx('nav-item', 'active')}>
                    <span>
                        {' '}
                        <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
                        Edit Profile & Settings
                    </span>
                </Link>
            </div>

            <div className={cx('body')}>
                <h1 className={cx('header-name')}>Huỳnh Ngọc Quí</h1>

                <div className={cx('content')}>
                    <div className={cx('tabpanel')}>
                        <Link to='/individuals/:id/edit/profile' className={cx('tab')}>
                            Profile
                        </Link>
                        <Link to='/individuals/:id/edit/settings' className={cx('tab', 'active')}>
                            Settings
                        </Link>
                    </div>
                    <div className={cx('section-info')} style={{ marginTop: '32px' }}>
                        <h1 className={cx('section-title')}>
                            Social Connections
                        </h1>

                        <div style={{ marginTop: '24px', display: 'flex' }}>

                            <img src="" style={{ width: '60px', height: '60px', objectFit: 'cover' }}>

                            </img>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', marginLeft: '12px', color: 'rgb(106, 106, 106)' }}>
                                <span>Huỳnh Ngọc Quí</span>
                                <span>2,726 friends</span>
                            </div>

                        </div>
                        <div className={cx('btn', 'facebook')} style={{ marginTop: '20px' }}><span><FaFacebookF style={{ fontSize: '18px', marginBottom: '2px', marginRight: '8px' }} />Disconnect Facebook</span></div>
                    </div>
                    <div className={cx('section-info')} style={{ marginTop: '32px' }}>
                        <h1 className={cx('section-title')} style={{ display: 'flex', alignItems: 'center' }}>
                            <span> Update Your Email Address</span>
                            <span style={{
                                display: 'inline-block', padding: '4px 6px', fontSize: '11px', fontWeight: '400', lineHeight: '1.3'
                                , color: '#fff', backgroundColor: '#0eb4b6', borderRadius: '2px', marginLeft: '20px'
                            }}>Email Verified</span>
                        </h1>

                        <div style={{ marginTop: '24px' }}>


                            <div className={cx('field')} >
                                <label className={cx('field-label')}>Email Address</label>
                                {
                                    !isUpdatePasswordEmail &&
                                    <>
                                        <div style={{ marginTop: '8px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '400' }}>quichua333@gmail.com</span>
                                            <span onClick={() => setUpdatePasswordEmail(true)} className={cx('edit')}>edit</span>
                                        </div>
                                        <div className={cx('btn')} style={{ marginTop: '16px' }}>
                                            Verify Email
                                        </div>
                                    </>
                                }
                                {
                                    isUpdatePasswordEmail &&

                                    <input className={cx('itext-field')} style={{ maxWidth: '300px' }} value={'quichua333@gmail.com'} />

                                }
                            </div>
                            {
                                isUpdatePasswordEmail &&
                                <div className={cx('field')} style={{ maxWidth: '300px' }}>
                                    <label className={cx('field-label')}>Current Password </label>
                                    <input className={cx('itext-field')} />
                                </div>
                            }
                            {
                                isUpdatePasswordEmail &&
                                <>
                                    <div style={{ margin: '16px 0' }}>
                                        Captcha
                                    </div>

                                    <div className={cx('btn', 'disabled')}>
                                        Verify
                                    </div>
                                </>
                            }

                        </div>

                    </div>
                    <div className={cx('section-info')} style={{ marginTop: '32px' }}>
                        <h1 className={cx('section-title')}>
                            Update Your Password
                        </h1>

                        <div style={{ marginTop: '24px' }}>
                            <div className={cx('field')} style={{ maxWidth: '400px' }}>
                                <label className={cx('field-label')}>Current Password</label>
                                <input className={cx('itext-field')} />
                            </div>
                            <div className={cx('field')} style={{ maxWidth: '400px' }}>
                                <label className={cx('field-label')}>New Password</label>
                                <input className={cx('itext-field')} />
                            </div>
                            <div className={cx('field')} style={{ maxWidth: '400px' }}>
                                <label className={cx('field-label')}>Password Confirmation</label>
                                <input className={cx('itext-field')} />
                            </div>


                            <div className={cx('btn')} style={{ marginTop: '16px' }}>Save</div>
                        </div>
                    </div>
                    <div className={cx('section-info')} style={{ marginTop: '32px' }}>
                        <h1 className={cx('section-title')}>
                            Deactivate Your Account
                        </h1>

                        <div style={{ marginTop: '24px', color: 'rgb(106, 106, 106)', fontWeight: '300' }}>
                            <p>By deactivating your account, you will no longer be able to log in, manage any contributions, and will lose any draft campaigns. Please review our Privacy Policy for how we store data.</p>
                            <p>If you need to change your subscription settings, visit your email preferences. If you would like changes made to your account because of privacy laws enacted in your country or region, please submit a request.</p>

                            <div className={cx('btn')} style={{ marginTop: '16px' }}>Deactivate Your Account</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditSetting;