import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";
import { HiCamera } from "react-icons/hi";
import { useRef, useEffect} from "react";

import styles from './Basic.module.scss'


const cx = classNames.bind(styles);

function BasicCampaign() {

    const inputImage = useRef();
    const inputWrapper = useRef();
  
    useEffect(()=> {
        inputWrapper.current.onclick = function() {
            inputImage.current.click();
        }
    },[]);
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
                                <div className={cx('entreField-validationLabel')}>33</div>
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
                                    <input className={cx('entreImage-file')} ref={inputImage} name="file" type="file" accept="image/jpg, image/jpeg, image/png"  />
                                </div>
                            </div>



                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicCampaign;