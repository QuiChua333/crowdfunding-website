import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";
import { HiCamera } from "react-icons/hi";

import styles from './Content.module.scss'
import { HeaderPage } from "~/components/Layout/components/Header";
import SidebarCampaign from "../Sidebar";



const cx = classNames.bind(styles);


function ContentCampaign() {
    const [disableAddVideo, setDisableAddVideo] = useState(true);
    const [isAddVideo, setAddVideo] = useState(false);
    const [isAddImage, setAddImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null)
    const [urlVideo, setUrlVideo] = useState();
    const [showErrorUrl, setShowErrorUrl] = useState(false);
    const [typeIPitch, setTypeIPitch] = useState(1);
    const inputImage = useRef();
    const inputWrapper = useRef();
    const handleInputVideoUrl = (e) => {
        let value = e.target.value;
        if (value.length > 0) {
            setDisableAddVideo(false)
        }
        else setDisableAddVideo(true)
        setUrlVideo(value);
    }
    const handleAddVideo = () => {
        if (!checkLink(urlVideo)) {
            setShowErrorUrl(true)
        }
        else {
            setShowErrorUrl(false);
            setAddVideo(true)
        }
    }

    const handleUploadImage = function (event) {
        if (event.target.files[0])
        setSelectedImage(event.target.files[0]);
    }

    const checkLink = (link) => {
        var regex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
        return regex.test(link)
    }

    useEffect(() => {

        inputWrapper.current.onclick = function () {
            inputImage.current.click();
        }
    }, [typeIPitch]);
    return (
        <div className={cx('wrapper')}>
            <SidebarCampaign current={2} />
            <div style={{ flex: '1' }}>

                <HeaderPage isFixed={false} />

                <div className={cx('content')}>
                    <div className={cx('controlBar')}>
                        <div className={cx('controlBar-content')}>
                            Campaign / Content
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
                                Pitch Video or Image
                            </div>
                            <div className={cx('entreField-subHeader')}>
                                Add a video or image to appear on the top of your campaign page. Campaigns with videos raise 2000% more than campaigns without videos. Keep your video 2-3 minutes.
                            </div>


                            <div className={cx('i-media-selector')}>
                                <div className={cx('entreField')}>
                                    <div className={cx('entreToggle')}>
                                        <div onClick={() => setTypeIPitch(1)} className={cx('i-media-button', {
                                            'i-media-button-selected': typeIPitch === 1
                                        })} data-index='1'>
                                            Video
                                        </div>
                                        <div onClick={() => setTypeIPitch(2)} className={cx('i-media-button', {
                                            'i-media-button-selected': typeIPitch === 2
                                        })}>
                                            Image
                                        </div>
                                    </div>
                                </div>



                                <div className={cx('i-pitchvideo-url', {
                                    hide: typeIPitch===2
                                })}>
                                    <div className={cx('entreField')} style={{ position: 'relative' }}>
                                        <label className={cx('entreField-label')}>Video URL <span className={cx('entreField-required')}>*</span></label>
                                        <div className={cx('entreField-subLabel')}>
                                            Enter a YouTube or Vimeo URL to appear at the top of your campaign page. Make sure your video has closed captioning enabled on Youtube or Vimeo.
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input onChange={handleInputVideoUrl} type="text" placeholder="http://" className={cx('itext-field')} style={{ flex: '1' }} />
                                            <a onClick={handleAddVideo} href="#" className={cx('button-add-video', {
                                                disabled: disableAddVideo
                                            })} >ADD VIDEO</a>
                                        </div>
                                        <div className={cx('entreField-error', {
                                            hide: !showErrorUrl
                                        })}>
                                            Please enter a valid YouTube or Vimeo URL
                                        </div>

                                        <div className={cx('videoPlaceholder', {
                                            hide: isAddVideo
                                        })}></div>
                                        <div style={{ marginTop: '10px' }}>
                                            {
                                                isAddVideo &&
                                                <iframe src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FzAHXsl6fZ1Q%3Ffeature%3Doembed&amp;display_name=YouTube&amp;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DzAHXsl6fZ1Q&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FzAHXsl6fZ1Q%2Fhqdefault.jpg&amp;key=a2b78eb2d12f45f9a400a7341cc8e511&amp;type=text%2Fhtml&amp;schema=youtube" width="695" height="460" scrolling="no" title="YouTube embed" frameborder="0" allow="autoplay; fullscreen; encrypted-media; picture-in-picture;" allowfullscreen="true">

                                                </iframe>
                                            }
                                        </div>

                                    </div>
                                </div>

                                <div className={cx('i-pitchimage-uploader',{
                                    hide: typeIPitch===1
                                })}>
                                    <div className={cx('entreField')}>
                                        <label className={cx('entreField-label')}>Pitch Image <span className={cx('entreField-required')}>*</span></label>
                                        <div className={cx('entreField-subLabel')}>
                                            Upload an image to appear at the top of your campaign page. <br />
                                            695 x 460 recommended resolution.
                                        </div>
                                        <div>
                                            <div className={cx('entreField-input-image', 'entreField-input-image-content')} ref={inputWrapper}>

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
                                                    <div className={cx('image-upload')}>
                                                        <img style={{ objectFit: 'cover' }} width="695" height="460" crop="fill" src={URL.createObjectURL(selectedImage)}></img>

                                                    </div>
                                                }
                                            </div>
                                            <input onChange={handleUploadImage} className={cx('entreImage-file')} ref={inputImage} name="file" type="file" accept="image/jpg, image/jpeg, image/png" />
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                                <a href="#" className={cx('button-save')} >SAVE & CONTINUE</a>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentCampaign;