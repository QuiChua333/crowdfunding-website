import classNames from "classnames/bind";
import styles from '../../Profile.module.scss'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import defaultAvatar from '~/assets/images/defaultAvt.png'
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function EditProfile() {
    const elementInputProfileImage = useRef(null);
    const elementInputProfileAvt = useRef(null);
    const [profileImage, setProfileImage] = useState('');
    const [profileAvt, setProfileAvt] = useState('');
    const handlePreviewProfileImage = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0]
            const url = URL.createObjectURL(file)
            setProfileImage(url);
        }
    }
    const handlePreviewProfileAvt = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0]
            const url = URL.createObjectURL(file)
            setProfileAvt(url);
        }
    }
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
                        <Link to='/individuals/:id/edit/profile' className={cx('tab', 'active')}>
                            Profile
                        </Link>
                        <Link to='/individuals/:id/edit/settings' className={cx('tab')}>
                            Settings
                        </Link>
                    </div>

                    <div className={cx('section-info')} style={{ marginTop: '32px' }}>
                        <h1 className={cx('section-title')}>
                            Basic Info
                        </h1>

                        <div style={{ marginTop: '24px' }}>
                            <div className={cx('field')} style={{ maxWidth: '600px' }}>
                                <label className={cx('field-label')}>First Name</label>
                                <input className={cx('itext-field')} />
                            </div>
                            <div className={cx('field')} style={{ maxWidth: '600px' }}>
                                <label className={cx('field-label')}>Last Name</label>
                                <input className={cx('itext-field')} />
                            </div>
                            <div className={cx('field')} style={{ maxWidth: '600px' }}>
                                <label className={cx('field-label')}>Country</label>
                                <input className={cx('itext-field')} />
                            </div>


                            <div style={{ display: 'flex', gap: '32px', maxWidth: '700px' }}>
                                <div className={cx('field')} style={{ flex: '3' }}>
                                    <label className={cx('field-label')}>City</label>
                                    <input className={cx('itext-field')} />
                                </div>
                                <div className={cx('field')} style={{ flex: '2' }}>
                                    <label className={cx('field-label')}>Postal Code</label>
                                    <input className={cx('itext-field')} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('section-info')} style={{ marginTop: '32px' }}>
                        <h1 className={cx('section-title')}>
                            Your Story
                        </h1>

                        <div style={{ marginTop: '24px' }}>
                            <div className={cx('field')} style={{ maxWidth: '800px' }}>
                                <label className={cx('field-label')}>Short Description</label>
                                <input className={cx('itext-field')} />
                            </div>
                            <div className={cx('field')} style={{ maxWidth: '600px' }}>
                                <label className={cx('field-label')}>About Me</label>
                                <textarea className={cx('itext-field')} style={{ minHeight: '200px' }} />
                            </div>

                        </div>
                    </div>
                    <div className={cx('section-info')} style={{ marginTop: '32px' }}>
                        <h1 className={cx('section-title')}>
                            Your Photos
                        </h1>

                        <div style={{ marginTop: '24px' }}>
                            <div className={cx('field')} style={{ maxWidth: '800px' }}>
                                <label className={cx('field-label')}>Profile Image</label>
                                <div className={cx('img-wrapper')}>
                                    <img src={profileImage || defaultAvatar}>
                                    </img>

                                    <input ref={elementInputProfileImage} type="file" onChange={(e) => handlePreviewProfileImage(e)} accept="image/jpg, image/jpeg, image/png" />
                                </div>
                                <div onClick={() => elementInputProfileImage.current.click()} className={cx('btn')} style={{ marginTop: '32px' }}>{profileImage ? 'Change Image' : 'Add Image'}</div>
                            </div>
                            <div className={cx('field')} style={{ maxWidth: '800px', marginTop: '40px' }}>
                                <label className={cx('field-label')}>Avatar</label>
                                <div className={cx('img-wrapper')} style={{ width: '150px', height: '150px' }}>
                                    <img src={profileAvt || defaultAvatar}>
                                    </img>

                                    <input ref={elementInputProfileAvt} type="file" onChange={(e) => handlePreviewProfileAvt(e)} accept="image/jpg, image/jpeg, image/png" />
                                </div>
                                <div onClick={() => elementInputProfileAvt.current.click()} className={cx('btn')} style={{ marginTop: '32px' }}>{profileAvt ? 'Change Image' : 'Add Image'}</div>

                            </div>

                        </div>
                    </div>

                    <div className={cx('section-info')} style={{ marginTop: '32px' }}>
                        <h1 className={cx('section-title')}>
                            Outside Links
                        </h1>

                        <div style={{ marginTop: '24px' }}>
                            <div className={cx('field')} style={{ maxWidth: '800px' }}>
                                <label className={cx('field-label')}>Facebook Link</label>
                                <input className={cx('itext-field')} />
                            </div>
                            <div className={cx('field')} style={{ maxWidth: '800px' }}>
                                <label className={cx('field-label')}>YouTube Link</label>
                                <input className={cx('itext-field')} />
                            </div>
                            <div className={cx('field')} style={{ maxWidth: '800px' }}>
                                <label className={cx('field-label')}>Twitter Link</label>
                                <input className={cx('itext-field')} />
                            </div>


                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div className={cx('btn')} style={{ marginTop: '8px' }}>Save</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;