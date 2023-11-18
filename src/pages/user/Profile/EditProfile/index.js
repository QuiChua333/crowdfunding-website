import classNames from "classnames/bind";
import styles from '../Profile.module.scss'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import defaultAvatar from '~/assets/images/defaultAvt.png'

const cx = classNames.bind(styles);
function EditProfile() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <a className={cx('nav-item')}>
                    <span><MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />View Profile</span>
                </a>
                <a className={cx('nav-item', 'active')}>
                    <span> <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />Edit Profile & Settings</span>
                </a>
            </div>

            <div className={cx('body')}>
                <h1 className={cx('header-name')}>Huỳnh Ngọc Quí</h1>

                <div className={cx('content')}>
                    <div className={cx('tabpanel')}>
                        <div className={cx('tab', 'active')}>
                            Profile
                        </div>
                        <div className={cx('tab')}>
                            Settings
                        </div>
                        <div className={cx('tab')}>
                            Emails
                        </div>
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
                                <div style={{ width: '300px', height: '300px' }}>
                                    <img src={defaultAvatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className={cx('btn')} style={{ marginTop: '32px' }}>Add Image</div>
                            </div>
                            <div className={cx('field')} style={{ maxWidth: '800px', marginTop: '40px' }}>
                                <label className={cx('field-label')}>Avatar</label>
                                <div style={{ width: '150px', height: '150px' }}>
                                    <img src={defaultAvatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className={cx('btn')} style={{ marginTop: '32px' }}>Add Image</div>
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
                    <div style={{textAlign: 'right'}}>
                        <div className={cx('btn')} style={{ marginTop: '8px'}}>Save</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;