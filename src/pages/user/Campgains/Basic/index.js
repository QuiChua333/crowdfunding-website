import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";
import { HiCamera } from "react-icons/hi";
import { useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useState } from "react";



import styles from './Basic.module.scss'


const cx = classNames.bind(styles);

function BasicCampaign() {

    const inputImage = useRef();
    const inputWrapper = useRef();
    const [showCategory, setshowCategory] = useState(false);

    const handleClickCategorySelector = function () {
        setshowCategory(!showCategory)
    }

    useEffect(() => {
        inputWrapper.current.onclick = function () {
            inputImage.current.click();
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <SidebarCampaign current={1} />
            <div style={{ flex: '1' }}>

                <HeaderPage isFixed={false} />

                <div className={cx('content')}>
                    <div className={cx('controlBar')}>
                        <div className={cx('controlBar-content')}>
                            Campaign / Basics
                        </div>
                        <div className={cx('controlBar-controls')}>
                            <a href="#" className={cx('controls-save')}>Save Campaign</a>
                            <a href="#" className={cx('controls-launch')}>Review & Launch</a>
                        </div>
                    </div>
                    <div className={cx('controlBar-loadingBar')}>

                    </div>
                    <div className={cx('body')}>
                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Basics
                            </div>
                            <div className={cx('entreField-subHeader')}>
                                Make a good first impression: introduce your campaign objectives and entice people to learn more. This basic information will represent your campaign on your campaign page, on your campaign card, and in searches.
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Campaign Title <span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    What is the title of your campaign?
                                </div>
                                <input type="text" className={cx('itext-field')} />
                                <div className={cx('entreField-validationLabel')}>50</div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Campaign Tagline <span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    Provide a short description that best describes your campaign to your audience.
                                </div>
                                <textarea className={cx('itext-field')} style={{ minHeight: '60px' }}></textarea>
                                <div className={cx('entreField-validationLabel')}>100</div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Campaign Card Image <span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    Upload a square image that represents your campaign.
                                    640 x 640 recommended resolution, 220 x 220 minimum resolution.
                                </div>
                                <div>
                                    <div className={cx('entreField-input-image')} ref={inputWrapper}>

                                        <div className={cx('tertiaryAction')}>
                                            <span className={cx('tertiaryAction-icon')}>
                                                <HiCamera style={{ color: '#7A69B3', fontSize: '18px' }} />
                                            </span>

                                            <span className={cx('tertiaryAction-text')}>
                                                Upload image
                                            </span>
                                        </div>
                                    </div>
                                    <input className={cx('entreImage-file')} ref={inputImage} name="file" type="file" accept="image/jpg, image/jpeg, image/png" />
                                </div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Location <span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    Choose the location where you are running the campaign. This location will be visible on your campaign page for your audience to see.
                                </div>
                                <div className={cx('d-flex')}>
                                    <input type="text" placeholder="Country" className={cx('itext-field')} />
                                    <input type="text" placeholder="City" className={cx('itext-field')} style={{ marginLeft: '10px' }} />
                                </div>

                            </div>


                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Category  <span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    To help backers find your campaign, select a category that best represents your project.
                                </div>
                                <div className={cx('entreField-categorySelect')}>
                                    <a className={cx('entreDropdown-select', 'itext-field', {
                                        borderInput: showCategory
                                    })} onClick={handleClickCategorySelector}>
                                        <span>
                                            Audio
                                        </span>

                                        <FaAngleDown className={cx('icon', 'icon-down')} />
                                        {
                                        showCategory &&
                                        <div className={cx('category-menu')}>
                                            <div className={cx('categoryMenu-sub')}>
                                                <div className={cx('categoryMenu-sub-header')}>
                                                    Tech & Innovation
                                                </div>

                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Audio
                                                </div>
                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Camera Gear
                                                </div>
                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Education
                                                </div>
                                            </div>

                                            <div className={cx('categoryMenu-sub')}>
                                                <div className={cx('categoryMenu-sub-header')}>
                                                    Tech & Innovation
                                                </div>

                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Audio
                                                </div>
                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Camera Gear
                                                </div>
                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Education
                                                </div>
                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Education
                                                </div>
                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Education
                                                </div>
                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Education
                                                </div>
                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Education
                                                </div>
                                            </div>

                                            <div className={cx('categoryMenu-sub')}>
                                                <div className={cx('categoryMenu-sub-header')}>
                                                    Tech & Innovation
                                                </div>

                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Audio
                                                </div>
                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Camera Gear
                                                </div>
                                                <div className={cx('categoryMenu-sub-item')}>
                                                    Education
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    </a>
                                   
                                </div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Campaign Duration <span className={cx('entreField-required')}>*</span>   <AiFillQuestionCircle style={{fontSize: '20px'}}/>
                                   
                              </label>
                                <div className={cx('entreField-subLabel')}>
                                    Campaign is scheduled to end on December 2, 2023 at 2:59 PM GMT+7
                                    You are eligible for unlimited extensions up to the 60 day maximum.
                                </div>
                             
                                    <input type="text" className={cx('itext-field')} style={{width: '55px', padding: '5px 10px', textAlign: 'center'}} />
                                 
                             

                            </div>

                            <div style={{marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right'}}>
                                <a href="#" className={cx('button-save')} >SAVE & CONTINUE</a>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicCampaign;