import classNames from "classnames/bind";
import SidebarCampaign from "../../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import ModalItem from "./ModalItem";
import { AiOutlinePlus } from "react-icons/ai";
import { HiCamera } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useRef, useEffect, useState } from "react";
// import { FaAngleDown } from "react-icons/fa";
// import { AiFillQuestionCircle } from "react-icons/ai";
// import { useState } from "react";





import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'



const cx = classNames.bind(styles);


function NewPerk() {
    const [showModal, setShowModal] = useState(false);
    const [listItem, setListItem] = useState([]);
    const inputPerkImageWrapperElement = useRef();
    const perkImageElement = useRef();
    const [selectedImage, setSelectedImage] = useState(null)

    const addNewItem = (item) => {
        setListItem(prev => [...prev, item])
    }

    const handleClickRemoveItem = (index) => {
        setListItem(prev => {
            const nextState = [...prev];
            nextState.splice(index, 1);
            return nextState;
        })
    }

    const handlePreviewImage = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0]
            file.preview = URL.createObjectURL(file)
            setSelectedImage(file)
        }
    }

    useEffect(() => {
        console.log(listItem)
    }, [listItem])
    return (
        <div className={cx('wrapper')}>
            <SidebarCampaign current={3} />
            <div style={{ flex: '1' }}>

                <HeaderPage isFixed={false} />

                <div className={cx('content')}>
                    <div className={cx('controlBar')}>
                        <div className={cx('controlBar-container')}>
                            <div className={cx('controlBar-content')}>
                                Perks / Create Perk
                            </div>
                            <div className={cx('controlBar-controls')}>
                                <a href="#" className={cx('btn', 'btn-cancel')}>Cancel</a>
                                <a href="#" className={cx('btn', 'btn-ok')}>Save</a>
                            </div>
                        </div>
                        <div className={cx('controlBar-loadingBar')}>

                        </div>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Perk Details
                            </div>
                            <div className={cx('entreField-subHeader')}>
                                Perks are incentives offered to backers in exchange for their support. Make sure your perks are not
                                prohibited.
                                Learn more about perks in the help center.
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Visibility</label>
                                <div className={cx('entreField-subLabel')}>
                                    You can change the visibility of your perks at any time. Change the visibility to hidden if you’re working on a perk that is not ready or if you no longer want backers to claim it.
                                </div>
                                <div style={{ marginTop: '16px' }}>
                                    <label className={cx('inputRadioGroup-radio')}>
                                        <input type="radio" value={'VSBL'} name="perkVisibility" checked />
                                        <span className={cx('inputRadioGroup-radio-button')}></span>
                                        <span className={cx('inputRadioGroup-radio-label')}>
                                            <strong>Visible. </strong> <span>Perk is available to claim</span>
                                        </span>
                                    </label>

                                    <label className={cx('inputRadioGroup-radio')}>
                                        <input type="radio" value={'INVS'} name="perkVisibility" />
                                        <span className={cx('inputRadioGroup-radio-button')}></span>
                                        <span className={cx('inputRadioGroup-radio-label')}>
                                            <strong>Hidden. </strong> <span>Perk is not available to claim</span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Price<span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    Set an amount that you want to collect from backers who claim this perk. This amount should represent how much you want to receive for all the items included in this perk.
                                </div>
                                <div className={cx('inputCurrencyField')}>
                                    <span className={cx('inputCurrencyField-symbol')}>$</span>
                                    <input type="text" maxlength="50" className={cx('itext-field', 'inputCurrencyField-input')} />
                                    <span className={cx('inputCurrencyField-isoCode')}>USD</span>
                                </div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Title <span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    The title for your perk is what will appear on your campaign page and throughout Indiegogo. Create a title that best describes the contents of what this perk is offering.
                                </div>
                                <input type="text" className={cx('itext-field')} />
                                <div className={cx('entreField-validationLabel')}>50</div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Included Items <span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    Add the items included in this perk. Items could be physical, digital, experiences, or even just a thank you. Specify item quantity and add additional items to create bundles.
                                </div>

                                {/* If has item */}
                                {
                                    listItem.length > 0 &&
                                    <div style={{ width: '90%' }}>

                                        <div className={cx('inputDoubleField-headers')} style={{ display: 'flex' }}>
                                            <div style={{ padding: '6px' }} class='col-9'><label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>Item Selection</label></div>
                                            <div style={{ padding: '6px' }} class='col-3'><label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>Quantity</label></div>
                                        </div>

                                        {
                                            listItem.map((item, index) => {
                                                return (
                                                    <div key={index} style={{ display: 'flex', marginTop: '8px' }}>
                                                        <div class='col-9' style={{ padding: '6px' }}>
                                                            <input type="text" className={cx('itext-field')} value={item.itemName} disabled style={{ background: 'transparent' }} />
                                                        </div>
                                                        <div class={listItem.length === 1 ? 'col-3' : 'col-2'} style={{ padding: '6px' }} >

                                                            <input maxlength="30" className={cx('itext-field')} value={item.quantity} />

                                                        </div>

                                                        {
                                                            listItem.length > 1 &&
                                                            <div class='col'>
                                                                <div style={{ cursor: 'pointer', marginTop: '16px' }}>
                                                                    <span onClick={() => handleClickRemoveItem(index)} style={{ padding: '5px 8px', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginLeft: '12px' }}><IoCloseSharp /></span>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                <div onClick={() => setShowModal(true)} style={{ padding: '16px 0', cursor: 'pointer' }}>
                                    <span style={{ padding: '5px 8px', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginRight: '12px' }}>
                                        {
                                            listItem.length === 0 ? <MdEdit /> : <AiOutlinePlus />
                                        }
                                    </span>
                                    <span style={{ color: '#7a69b3', fontWeight: '500', letterSpacing: '1px' }}>ADD ITEM</span>
                                </div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Description<span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    Describe the details of this perk. Be creative, this is your opportunity to educate backers on what they will be receiving after they claim this perk.
                                </div>
                                <textarea className={cx('itext-field')} style={{ minHeight: '275px' }}></textarea>
                                <div className={cx('entreField-validationLabel')}>350</div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Perk Image</label>
                                <div className={cx('entreField-subLabel')}>
                                    Please do not use images containing text such as price and discount or the Indiegogo brand colors. Recommended dimensions: 660x440 pixels. PNG or JPG supported.
                                </div>
                                <div>
                                    <div onClick={() => { perkImageElement.current.click(); }} className={cx('entreField-input-image')} style={{ width: '330px', height: '220px' }} ref={inputPerkImageWrapperElement} >

                                        {
                                            !selectedImage &&
                                            <div className={cx('tertiaryAction')} >
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
                                                <img style={{ position: 'relative' }} width="330" height="220" crop="fill" src={selectedImage.preview} />
                                                <div className={cx('editFile')}>
                                                    <span className={cx('editFile-icon')}><MdEdit style={{ color: '#7a69b3', fontSize: '18px' }} /></span>
                                                    <span onClick={(e) => { e.stopPropagation(); perkImageElement.current.value = null; setSelectedImage(null) }} className={cx('editFile-icon')}><IoCloseSharp style={{ color: '#7a69b3', fontSize: '22px' }} /></span>
                                                </div>
                                            </div>
                                        }


                                    </div>

                                    <input onChange={handlePreviewImage} className={cx('entreImage-file')} ref={perkImageElement} name="file" type="file" accept="image/jpg, image/jpeg, image/png" />
                                </div>
                            </div>

                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Quantity Available </label>
                                <div className={cx('entreField-subLabel')}>
                                    You can limit the quantity available to backers based on production volume. Leaving this field blank indicates that there is no quantity limit.
                                </div>
                                <input type="text" className={cx('itext-field')} style={{ width: '200px' }} />
                            </div>



                        </div>

                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Estimated delivery date
                            </div>
                            <div className={cx('entreField-subHeader')}>
                                Estimate a delivery date for this perk for your backers. This date and future changes to it will appear on the perk card for your backers to see. We recommend that you post an update to backers whenever you change this date.
                            </div>
                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Estimated date </label>

                                <input type="text" className={cx('itext-field')} style={{ width: '200px' }} placeholder="MM / YYYY" />
                            </div>

                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}>

                            </div>
                        </div>

                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                            Shipping
                            </div>
                            <div className={cx('entreField-subHeader')}>
                            Does this perk contain items that you need to ship?
                            </div>
                            <div style={{ marginTop: '32px' }}>
                                    <label className={cx('inputRadioGroup-radio')}>
                                        <input type="radio" value={'VSBL'} name="shippingAddressRequired" checked />
                                        <span className={cx('inputRadioGroup-radio-button')}></span>
                                        <span className={cx('inputRadioGroup-radio-label')}>
                                        No. This perk does not contain items that need to be shipped.
                                        </span>
                                    </label>

                                    <label className={cx('inputRadioGroup-radio')}>
                                        <input type="radio" value={'INVS'} name="shippingAddressRequired"/>
                                        <span className={cx('inputRadioGroup-radio-button')}></span>
                                        <span className={cx('inputRadioGroup-radio-label')}>
                                        Yes. This perk contains items that need to be shipped.
                                        </span>
                                    </label>
                                </div>

                            
                        </div>
                    </div>
                </div>

                <Footer />


            </div>
            {
                showModal && <ModalItem setShowModal={setShowModal} addNewItem={addNewItem} />
            }


        </div>
    );
}

export default NewPerk;