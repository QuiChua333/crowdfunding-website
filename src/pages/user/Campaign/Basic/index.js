import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";
import { HiCamera } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useState } from "react";



import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import MenuDropDown from "../MenuDropDown";


const cx = classNames.bind(styles);

function BasicCampaign() {
    const menu = [
        {
            category: 'TECH & INNOVATION',
            listItem: ['Audio','Audio','Education','Energy & Green Tech','Fashion & Wearables','Food & Beverages','Health & Fitness','Home','Phones & Accessories','Fashion & Wearables','Food & Beverages','Health & Fitness','Home','Phones & Accessories']
        },
        {
            category: 'CREATIVE WORKS',
            listItem: ['Audio','Audio','Education','Energy & Green Tech','Fashion & Wearables','Food & Beverages','Health & Fitness']
        },
        {
            category: 'COMMUNITY PROJECTS',
            listItem: ['Audio','Audio','Education','Energy & Green Tech','Fashion & Wearables']
        }
    ]
    const inputImage = useRef();
    const inputWrapper = useRef();
    const [selectedImage, setSelectedImage] = useState(null)
    const [showCategory, setshowCategory] = useState(false);

    const handleClickCategorySelector = function () {
        setshowCategory(!showCategory)
    }

    const handlePreviewImage = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0]
            file.preview = URL.createObjectURL(file)
            setSelectedImage(file)
        }
    }

    useEffect(() => {
        return () => {
            selectedImage && URL.revokeObjectURL(selectedImage.preview)
        }
    }, [selectedImage])
    return (
        <div className={cx('wrapper')}>
            <SidebarCampaign current={1} />
            <div style={{ flex: '1' }}>

                <HeaderPage isFixed={false} />

                <div className={cx('content')}>
                    <div className={cx('controlBar')}>
                        <div className={cx('controlBar-container')}>
                            <div className={cx('controlBar-content')}>
                                Campaign / Basic
                            </div>
                            <div className={cx('controlBar-controls')}>
                                <a href="#" className={cx('btn','btn-cancel')}>Save Campaign</a>
                                <a href="#" className={cx('btn','btn-ok')}>Review & Launch</a>
                            </div>
                        </div>
                        <div className={cx('controlBar-loadingBar')}>

                        </div>
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
                                    <div onClick={() => { inputImage.current.click(); }} className={cx('entreField-input-image')} style={{width: '400px', height: '400px'}} ref={inputWrapper} >

                                        {
                                            !selectedImage &&
                                            <div className={cx('tertiaryAction')}>
                                                <span className={cx('tertiaryAction-icon')}>
                                                    <HiCamera style={{ color: '#7A69B3', fontSize: '18px' }} />
                                                </span>

                                                <span className={cx('tertiaryAction-text')}>
                                                    Upload image
                                                </span>
                                            </div>
                                        }

                                        {
                                            selectedImage &&
                                            <div>
                                                <img style={{ position: 'relative' }} width="400" height="400" crop="fill" src={selectedImage.preview} />
                                                <div className={cx('editFile')}>
                                                    <span className={cx('editFile-icon')}><MdEdit style={{ color: '#7a69b3', fontSize: '18px' }} /></span>
                                                    <span onClick={(e) => { e.stopPropagation(); inputImage.current.value = null; setSelectedImage(null) }} className={cx('editFile-icon')}><IoCloseSharp style={{ color: '#7a69b3', fontSize: '22px' }} /></span>
                                                </div>
                                            </div>
                                        }


                                    </div>

                                    <input onChange={handlePreviewImage} className={cx('entreImage-file')} ref={inputImage} name="file" type="file" accept="image/jpg, image/jpeg, image/png" />
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
                                    })} onClick={handleClickCategorySelector} >
                                        <span>
                                            Audio
                                        </span>

                                        <FaAngleDown className={cx('icon', 'icon-down')} />
                                        {
                                            showCategory &&
                                            <MenuDropDown menu={menu}/>
                                        }

                                    </a>

                                </div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Campaign Duration <span className={cx('entreField-required')}>*</span>   <AiFillQuestionCircle style={{ fontSize: '20px' }} />

                                </label>
                                <div className={cx('entreField-subLabel')}>
                                    Campaign is scheduled to end on December 2, 2023 at 2:59 PM GMT+7
                                    You are eligible for unlimited extensions up to the 60 day maximum.
                                </div>

                                <input type="text" className={cx('itext-field')} style={{ width: '55px', padding: '5px 10px', textAlign: 'center' }} />



                            </div>

                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                <a href="#" className={cx('btn','btn-ok')} >SAVE & CONTINUE</a>
                            </div>

                        </div>




                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicCampaign;