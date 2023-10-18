import classNames from "classnames/bind";
import JoditEditor from 'jodit-react';
import { useState, useEffect, useRef } from "react";
import { HiCamera } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

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
    const [urlEmbedVideo, setUrlEmbedVideo] = useState();
    const [showErrorUrl, setShowErrorUrl] = useState(false);
    const [typeIPitch, setTypeIPitch] = useState(1);
    const inputImage = useRef();
    const inputWrapper = useRef();
    const editor = useRef();
    const [contentEditor,setContentEditor] = useState('');
    const handleInputVideoUrl = (e) => {
        let value = e.target.value;
        if (value.length > 0) {
            setDisableAddVideo(false)
        }
        else setDisableAddVideo(true)
        setUrlVideo(value);
    }
    const handleAddVideo = (e) => {
        e.preventDefault();
        if (!checkLink(urlVideo)) {
            setShowErrorUrl(true)
            setAddVideo(false)

        }
        else {
            setShowErrorUrl(false);
            const urlEmbedVideo = '//www.youtube.com/embed/' + getId(urlVideo);
            setUrlEmbedVideo(urlEmbedVideo);
            setAddVideo(true)
        }
    }

    const handlePreviewImage = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0]
            file.preview = URL.createObjectURL(file)
            setSelectedImage(file)
        }
    }
    const getId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    useEffect(() => {
        return () => {
            selectedImage && URL.revokeObjectURL(selectedImage.preview)
        }
    }, [selectedImage])

    const checkLink = (link) => {
        var regex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
        return regex.test(link)
    }

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
                                    hide: typeIPitch === 2
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
                                                <iframe src={urlEmbedVideo} width="695" height="460" scrolling="no" title="YouTube embed" frameborder="0" allow="autoplay; fullscreen; encrypted-media; picture-in-picture;" allowfullscreen="true">

                                                </iframe>
                                            }
                                        </div>

                                    </div>
                                </div>

                                <div className={cx('i-pitchimage-uploader', {
                                    hide: typeIPitch === 1
                                })}>
                                    <div className={cx('entreField')}>
                                        <label className={cx('entreField-label')}>Pitch Image <span className={cx('entreField-required')}>*</span></label>
                                        <div className={cx('entreField-subLabel')}>
                                            Upload an image to appear at the top of your campaign page. <br />
                                            695 x 460 recommended resolution.
                                        </div>
                                        <div>
                                            <div onClick={() => { inputImage.current.click() }} className={cx('entreField-input-image', 'entreField-input-image-content')} ref={inputWrapper}>

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
                                                        <img style={{ position: 'relative' }} width="695" height="460" crop="fill" src={selectedImage.preview} />
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
                                </div>
                            </div>





                        </div>

                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Story <span className={cx('entreField-required')}>*</span>
                            </div>
                            <div className={cx('entreField-subHeader')}>
                                Tell potential contributors more about your campaign. Provide details that will motivate people to contribute. A good pitch is compelling, informative, and easy to digest. Learn more.
                            </div>

                            <div className={cx('entreField-subLabel')}>
                                Images that are intended to span the width of the story section should have a minimum width of 695 pixels. Images wider than 695 pixels will be resized proportionally.
                            </div>

                            <div className={cx('jodit-editor')}>
                                <JoditEditor
                                    ref={editor}
                                    value={contentEditor}
                                    onChange={newContent => setContentEditor(newContent)}
                                    
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '60px', textAlign: 'right' }}>
                            <a href="#" className={cx('button-save')} >SAVE & CONTINUE</a>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentCampaign;