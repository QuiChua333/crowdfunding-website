import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HiCamera } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";





import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { HeaderPage } from "~/components/Layout/components/Header";
import SidebarCampaign from "../Sidebar";
import FAQ from "./FAQ";
import { story } from "~/utils/content";








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
    const [valFAQ, setValFAQ] = useState([{ question: '', answer: '' }])
    // const editor = useRef();
    // const [contentEditor, setContentEditor] = useState('');
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
    const handleClickAddQuestion = () => {
        setValFAQ(prev => {
            const nextState = [...prev, { question: '', answer: '' }];
            return nextState
        })
    }

    const handleRemoveFAQ = (index) => {
        setValFAQ(prev => {
            const nextState = [...prev]
            nextState.splice(index, 1)
            console.log(nextState)
            return nextState;
        })
    }

    const handleUpdateValueFAQ = (value, index) => {
        setValFAQ(prev => {

            const nexState = [...prev];
            nexState[index] = { ...value };
            console.log(nexState);
            return nexState;
        })
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
                        <div className={cx('controlBar-container')}>
                            <div className={cx('controlBar-content')}>
                                Campaign / Content
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
                                            <a onClick={handleAddVideo} href="#" className={cx('btn-add-video', {
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
                                            <div onClick={() => { inputImage.current.click() }} className={cx('entreField-input-image')} style={{width: '695px', height: '460px'}} ref={inputWrapper}>

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
                                                        <img style={{ position: 'relative', objectFit: 'cover' }} width="695" height="460" src={selectedImage.preview} />
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

                            <div className={cx('ck-editor')}>
                                <CKEditor
                                    editor={ClassicEditor}
                                    // config={{
                                    //     extraPlugins: [uploadPlugin]
                                    // }}

                                    // data="<p>Hello from CKEditor&nbsp;5!</p>"
                                    data="<h3>Short Summary</h3><p>&nbsp;</p><h3>What We Need &amp; What You Get</h3><p>Break it down for folks in more detail:</p><ul><li>Explain how much funding you need and where it's going. Be transparent and specific-people need to trust you to want to fund you.</li><li>Tell people about your unique perks. Get them excited!</li><li>Describe where the funds go if you don't reach your entire goal.</li></ul><h3>The Impact</h3><p>Feel free to explain more about your campaign and let people know the difference their contribution will make:</p><ul><li>Explain why your project is valuable to the contributor and to the world.</li><li>Point out your successful track record with projects like this (if you have one).</li><li>Make it real for people and build trust.</li></ul><h3>Risks &amp; Challenges</h3><p>People value your transparency. Be open and stand out by providing insight into the risks and obstacles you may face on the way to achieving your goal.</p><ul><li>Share what qualifies you to overcome these hurdles.</li><li>Describe your plan for solving these challenges.</li></ul><h3>Other Ways You Can Help</h3><p>Some people just can't contribute, but that doesn't mean they can't help:</p><ul><li>Ask folks to get the word out and make some noise about your campaign.</li><li>Remind them to use the Indiegogo share tools!</li></ul><p>And that's all there is to it.</p><p>&nbsp;</p>"
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        // console.log('Editor is ready to use!', editor);

                                        editor.editing.view.change((writer) => {
                                            writer.setStyle(
                                                "height",
                                                "700px",
                                                editor.editing.view.document.getRoot()
                                            );
                                        });
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                     
                                    }}
                                    onBlur={(event, editor) => {
                                  
                                    }}
                                    onFocus={(event, editor) => {
                         
                                    }}

                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '60px', marginBottom: '60px', background: '#C8C8C8', height: '0.5px' }}>

                        </div>

                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                FAQ <span className={cx('entreField-required')}>*</span>
                            </div>
                            <div className={cx('entreField-subHeader')}>
                                The FAQ section should provide the most common details that backers are looking for when evaluating your campaign. We will also provide common answers to questions about crowdfunding and how Indiegogo works.
                            </div>

                            <div>
                                {valFAQ.map((item, index) => {
                                    return <FAQ key={index} index={index} value={item} isShowClose={valFAQ.length > 1} removeFAQ={handleRemoveFAQ} updateValueFAQ={handleUpdateValueFAQ} />
                                })}
                            </div>

                            <div onClick={handleClickAddQuestion} style={{ padding: '16px 0', cursor: 'pointer' }}>
                                <span style={{ padding: '5px 8px', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginRight: '12px' }}><FaPlus /></span>
                                <span style={{ color: '#7a69b3', fontWeight: '600' }}>ADD ANOTHER QUESTION</span>
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