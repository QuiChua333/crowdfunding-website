import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import TeamMember from "./TeamMember";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";

import images from "~/assets/images";




import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { useState } from "react";
import { Link } from "react-router-dom";


const cx = classNames.bind(styles);

function TeamCampaign() {
    const [isCheckRoleEditing, setCheckRoleEditng] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <SidebarCampaign current={5} />
            <div style={{ flex: '1' }}>

                <HeaderPage isFixed={false} />

                <div className={cx('content')}>
                    <div className={cx('controlBar')}>
                        <div className={cx('controlBar-container')}>
                            <div className={cx('controlBar-content')}>
                                Campaign / Team
                            </div>
                            <div className={cx('controlBar-controls')}>
                                <a href="#" className={cx('btn', 'btn-cancel')}>Save Campaign</a>
                                <a href="#" className={cx('btn', 'btn-ok')}>Review & Launch</a>
                            </div>
                        </div>
                        <div className={cx('controlBar-loadingBar')}>

                        </div>
                    </div>
                    <div className={cx('body')}>



                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Primary Contact
                            </div>
                            <div className={cx('entreField-subHeader')}>
                                Please provide your legal address and contact information, or that of your company's. We may share your contact information for reporting or disclosure requirements.
                            </div>

                            <div className={cx('entreField')}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div class='col-6'>
                                        <label className={cx('entreField-label')}>Legal First Name<span className={cx('entreField-required')}>*</span></label>
                                        <input type="text" maxLength="50" className={cx('itext-field')} />
                                    </div>
                                    <div class='col-6'>
                                        <label className={cx('entreField-label')}>Legal Last Name<span className={cx('entreField-required')}>*</span></label>
                                        <input type="text" maxLength="50" className={cx('itext-field')} />
                                    </div>
                                </div>
                            </div>

                            <div className={cx('entreField')}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div class='col-6'>
                                        <label className={cx('entreField-label')}>Date of Birth<span className={cx('entreField-required')}>*</span></label>
                                        <input type="text" maxLength="50" className={cx('itext-field')} placeholder="DD / MM / YYYY" />
                                    </div>
                                    <div class='col-6'>
                                        <label className={cx('entreField-label')}>Phone Number<span className={cx('entreField-required')}>*</span></label>
                                        <input type="text" maxLength="50" className={cx('itext-field')} />
                                    </div>
                                </div>
                            </div>

                            <div className={cx('entreField')}>

                                <label className={cx('entreField-label')}>Date of Birth<span className={cx('entreField-required')}>*</span></label>
                                <input type="text" maxLength="50" className={cx('itext-field')} placeholder="DD / MM / YYYY" />

                            </div>
                            <div className={cx('entreField')}>

                                <label className={cx('entreField-label')}>Country<span className={cx('entreField-required')}>*</span></label>
                                <input type="text" maxLength="50" className={cx('itext-field')} />

                            </div>
                            <div className={cx('entreField')}>

                                <label className={cx('entreField-label')}>Detail Address<span className={cx('entreField-required')}>*</span></label>
                                <input type="text" maxLength="50" className={cx('itext-field')} />

                            </div>
                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>

                        </div>

                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Support Email Address

                            </div>
                            <div className={cx('entreField-subHeader')}>
                                If you don't want to use the Campaign Owner's Indiegogo Account email address to answer questions from backers, please include another that will be used by you or a team member to address backer specific concerns. Learn more about providing great customer service to your backers.
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Support Email</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="email" className={cx('itext-field')} style={{ flex: '1' }} />
                                    <a href="#" className={cx('btn-add-video')} >VERIFY MY EMAIL</a>
                                </div>
                            </div>

                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>

                        </div>


                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Campaign Team


                            </div>
                            <div className={cx('entreField-subHeader')}>
                                If other people are helping you with your campaign, send them an email invitation below. Once they accept the invitation and create an Indiegogo account, they will be represented on your campaign page as members of your team.
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>New Team Member Email</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="email" className={cx('itext-field')} style={{ flex: '1' }} />
                                    <a href="#" className={cx('btn-add-video')} >SEND INVITATION</a>
                                </div>
                                <div>
                                    <label onClick={() => setCheckRoleEditng(prev => !prev)} style={{ display: 'flex', alignItems: 'center', margin: '16px 0', marginLeft: '-2px' }}>
                                        <span >
                                            {
                                                !isCheckRoleEditing ? <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} /> : <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                                            }
                                        </span>
                                        <span style={{ marginLeft: '8px' }}>Grant this team member full editing rights on the campaign.</span>
                                    </label>



                                    <div style={{ marginTop: '32px' }}>
                                        <div className={cx('team-orner')}>
                                            <label className={cx('entreField-label')}>Team Owner</label>
                                            <div style={{ borderTop: '1px solid #C8C8C8' }}></div>
                                            <TeamMember isOwner />
                                        </div>
                                        <div className={cx('team-members')}>
                                            <label className={cx('entreField-label')}>Team Owner</label>
                                            <div style={{ borderTop: '1px solid #C8C8C8' }}></div>
                                            <TeamMember />
                                            <TeamMember />
                                            <TeamMember />

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                <a href="#" className={cx('btn', 'btn-ok')} >SAVE & CONTINUE</a>
                            </div>

                        </div>

                    </div>
                </div>

                <Footer />


            </div>

        </div>
    );
}

export default TeamCampaign;