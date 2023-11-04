import classNames from "classnames/bind";
import SidebarCampaign from "../../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import ModalItem from "./ModalItem";
import MenuDropDown from "../../MenuDropDown";
import { AiOutlinePlus } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { HiCamera } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useRef, useEffect, useState } from "react";
// import { FaAngleDown } from "react-icons/fa";
// import { AiFillQuestionCircle } from "react-icons/ai";
// import { useState } from "react";





import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import ItemShipping from "./ItemShipping";
import { Link } from "react-router-dom";
import ItemInclude from "./ItemInclude";



const cx = classNames.bind(styles);


function NewPerk() {
    const listLocation = ['Hà Nội', 'Đà Nẵng', 'Quảng Ngãi'];
    const listItemAvailableTMP = [
        {
            itemName: 'Áo',
            listOption: [
                {
                    name: 'Size',
                    value: ['S','M','L']
                },
                {
                    name: 'Color',
                    value: ['Red','Blue','Yellow']
                }
            ]
        },
        {
            itemName: 'Quần',
            listOption: [
                {
                    name: 'Size',
                    value: ['XL','M','L']
                },
                {
                    name: 'Color',
                    value: ['Red','Blue','Yellow']
                }
            ]
        }
    ]
    const [listItemAvailable,setListItemAvailable] = useState([...listItemAvailableTMP]);
    const [showModal, setShowModal] = useState(false);
    const [listItem, setListItem] = useState([]);
    const inputPerkImageWrapperElement = useRef();
    const perkImageElement = useRef();
    const [selectedImage, setSelectedImage] = useState(null)
    const [isShip, setShip] = useState(false);
    const [listShip, setListShip] = useState(null);
    const [showBtnAddShip, setShowBtnAddShip] = useState(true)
    const noCheckShipElement = useRef(null);
    // const elementLocation = useRef([]);




    const addNewItem = (item) => {
        // Lưu item + thuộc tính lên csdl {itemName, listOption}
        setListItem(prev => [...prev, { ...item, quantity: 1 }])
        setListItemAvailable(prev => [...prev, {...item}]);
    }
    const handleClickAddItem = () => {
        if (listItem.length === 0) {
            setShowModal(true)
        }
        else {
            setListItem(prev => [...prev, { quantity: 1 }])
        }
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
    const handleClickShip = () => {
        setShip(true)
        setListShip([{ location: '', value: '' }]);
    }
    const handleClickNoShip = () => {
        setShip(false)
        setListShip(null);
    }
    const handleClickAddShip = () => {
        setListShip(prev => [...prev, { location: '', value: '' }])
    }

    const handleChangeItemShipping = (itemChange,indexChange) => {
        setListShip(prev => {
            const nextState = prev.map((item, index) => {
                if (index === indexChange) {
                    return { ...itemChange }
                } else return item;
            })
            return nextState;
        })
    }
    const handleRemoveItemShipping = (index) => {
        setListShip(prev => {
            const nextState = [...prev];
            nextState.splice(index, 1);
            return nextState;
        })
    }

    const handleChangeItemInclude = (itemChange,indexChange) => {
        setListItem(prev => {
            const nextState = prev.map((item, index) => {
                if (index === indexChange) {
                    return { ...itemChange }
                } else return item;
            })
            return nextState;
        })
    }
    const handleRemoveItemInclude = (index) => {
        setListItem(prev => {
            const nextState = [...prev];
            nextState.splice(index, 1);
            return nextState;
        })
    }





    useEffect(() => {
        noCheckShipElement.current.checked = true;
    }, [])
    useEffect(() => {
        console.log(listShip)
    },[listShip])
   

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
                                <Link to="/campaigns/:id/edit/perks/table" className={cx('btn', 'btn-cancel')}>Cancel</Link>
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
                                            <div style={{ padding: '6px' }} class='col-8'><label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>Item Selection</label></div>
                                            <div style={{ padding: '6px' }} class='col-3'><label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>Quantity</label></div>
                                        </div>

                                        {
                                            listItem.map((item, index) => {
                                                        return (
                                                            <ItemInclude key={index} index={index} onChangeItem={handleChangeItemInclude} removeItem={handleRemoveItemInclude} listItemInclude={listItemAvailable} itemData={item} lengthListItem ={listItem.length} />
                                                        )

                                                    })
                                        }
                                    </div>
                                }
                                <div onClick={handleClickAddItem} style={{ padding: '16px 0', cursor: 'pointer', display: 'inline-block' }}>
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
                                <label onClick={handleClickNoShip} className={cx('inputRadioGroup-radio')} >
                                    <input type="radio" value={'VSBL'} name="shippingAddressRequired" ref={noCheckShipElement} />
                                    <span className={cx('inputRadioGroup-radio-button')}></span>
                                    <span className={cx('inputRadioGroup-radio-label')}>
                                        No. This perk does not contain items that need to be shipped.
                                    </span>
                                </label>

                                <label onClick={handleClickShip} className={cx('inputRadioGroup-radio')}>
                                    <input type="radio" value={'INVS'} name="shippingAddressRequired" />
                                    <span className={cx('inputRadioGroup-radio-button')}></span>
                                    <span className={cx('inputRadioGroup-radio-label')}>
                                        Yes. This perk contains items that need to be shipped.
                                    </span>
                                </label>
                            </div>
                            {
                                isShip &&
                                <>
                                    <div className={cx('entreField')}>
                                        <div className={cx('inputDoubleField-headers')} style={{ display: 'flex' }}>
                                            <div style={{ padding: '6px' }} class='col-8'><label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>Shipping locations</label></div>
                                            <div style={{ padding: '6px' }} class='col-4'><label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>Shipping fee</label></div>
                                        </div>
                                        {listShip.map((item, index) => {
                                            return (
                                                <ItemShipping key={index} index={index} onChangeItem={handleChangeItemShipping} removeItem={handleRemoveItemShipping} listLocation={listLocation} lengthListShip={listShip.length} itemData={item}/>
                                            )

                                        })}

                                    </div>
                                    {
                                        showBtnAddShip &&
                                        <div onClick={handleClickAddShip} style={{ padding: '16px 0', cursor: 'pointer' }}>
                                            <span style={{ padding: '5px 8px', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginRight: '12px', fontSize: '16px' }}><AiOutlinePlus /></span>
                                            <span style={{ color: '#7a69b3', fontWeight: '600' }}>ADD LOCATION</span>
                                        </div>
                                    }

                                </>

                            }

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