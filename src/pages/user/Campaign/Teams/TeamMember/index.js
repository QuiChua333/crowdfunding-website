import classNames from "classnames/bind";

import styles from './TeamMember.module.scss'
import { useState } from "react";

import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const cx = classNames.bind(styles)

function TeamMember({ isOwner }) {
    const [isCheckRoleEditing, setCheckRoleEditng] = useState(false);
    return (

        <div className={cx('wrapper')}>
            {/* <label className={cx('entreField-label')}>Team Owner</label>
            <div style={{ borderTop: '1px solid #C8C8C8' }}></div> */}
            <div style={{ padding: '32px 0 32px 72px', display: 'flex', alignItems: 'center' }}>
                <div className="col-6">
                    <div style={{ padding: '1px 6px', fontWeight: '300', backgroundColor: '#35ca97', display: 'inline-block', color: '#fff', fontSize: '13px', letterSpacing: '1.8px', borderRadius: '2px' }}>
                        ACCEPTED
                    </div>
                    <div>Huỳnh Ngọc Quí </div>
                    <div>quichua333@gmail.com </div>
                    {
                        isOwner &&
                        <div style={{ fontSize: '14px', textDecoration: 'underline', cursor: 'pointer'}} className={cx('hover-edit-profile')}>
                            Edit Profile</div>
                    }

                    {
                        !isOwner &&
                        <label onClick={() => setCheckRoleEditng(prev => !prev)} style={{ display: 'flex', alignItems: 'center', margin: '8px 0', marginLeft: '-2px' }}>
                            <span >
                                {
                                    !isCheckRoleEditing ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                                }
                            </span>
                            <span style={{ marginLeft: '8px', color: '#777' }}>Full editing rights</span>
                        </label>
                    }
                </div>
                <div className="col-5">
                    <label className={cx('entreField-label')}>Role</label>
                    <input type="text" maxLength="50" className={cx('itext-field')} />
                </div>

                {
                    !isOwner &&
                    <div class='col'>
                        <div style={{ cursor: 'pointer', marginTop: '32px' }}>
                            <span style={{ padding: '5px 8px', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginLeft: '12px' }}><IoCloseSharp /></span>
                        </div>
                    </div>
                }


            </div>
        </div>
    );
}

export default TeamMember;