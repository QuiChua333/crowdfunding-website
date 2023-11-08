import classNames from "classnames/bind";
import SidebarCampaign from "../../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import { AiOutlinePlus } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { HiCamera } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useRef, useEffect, useState } from "react";





import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { Link } from "react-router-dom";




const cx = classNames.bind(styles);


function NewItem() {
    const [itemName, setItemName] = useState('');
    const [chooseOption, setChooseOption] = useState(false);
    const [listOption, setListOption] = useState(null)
    const [showBtnAddOption, setShowBtnAddOption] = useState(true)
    const noCheckOptionElement = useRef(null)
    const handleClickOption = () => {
        setChooseOption(true)
        setListOption([{ name: '', value: [] }]);

    }

    const handleClickNoOption = () => {
        setChooseOption(false)
        setListOption(null)
    }
    const handleClickAddOption = () => {
        setListOption(prev => [...prev, { name: '', value: [] }])
    }

    const handleClickClose = (index) => {
        setListOption(prev => {
            const nextState = [...prev];
            nextState.splice(index, 1);
            return nextState;
        })
    }

    const handleClickRemoveMiniValue = (indexA, indexB) => {

        setListOption(prev => {
            const nextState = prev.map((item, index) => {
                if (index === indexA) {
                    // item.value.splice(indexB,1);
                    return {
                        ...item,
                        value: item.value.filter((item, index2) => {
                            return index2 !== indexB
                        })
                    }
                }
                else return item;
            })
            return nextState;
        })
    }

    const handleKeyUpInputTag = (e, indexChange) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (e.target.value.trim() !== "") {
                const newValue = e.target.value;
                setListOption(prev => {
                    const nextState = prev.map((item, index) => {
                        if (index === indexChange) {
                            return { ...item, value: [...item.value, newValue] }
                        } else return item;
                    })
                    e.target.value = '';
                    return nextState;
                })
            }
        }
    }

    const handleChangeInputTagName = (e, indexChange) => {
        const name = e.target.value;
        setListOption(prev => {
            const nextState = prev.map((item, index) => {
                if (index === indexChange) {
                    return { ...item, name: name }
                } else return item;
            })
            return nextState;
        })
    }

    const handleClickSaveItem = () => {
        // const newItem = {itemName, listOption};
        // addNewItem(newItem);
        // setShowModal(false)
    }
    useEffect(() => {
        noCheckOptionElement.current.checked = true;
    }, []);
    useEffect(() => {
        console.log(listOption)
        if (listOption?.length === 3) {
            setShowBtnAddOption(false);
        } else if (listOption?.length < 3) {
            setShowBtnAddOption(true);
        }
    }, [listOption]);

    return (
        <div className={cx('wrapper')}>
            <SidebarCampaign  />
            <div style={{ flex: '1' }}>

                <HeaderPage isFixed={false} />

                <div className={cx('content')}>
                    <div className={cx('controlBar')}>
                        <div className={cx('controlBar-container')}>
                            <div className={cx('controlBar-content')}>
                                Perks / Create New Item
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
                                Item Details
                            </div>
                            <div className={cx('entreField-subHeader')}>
                                You decide which items you want to offer for each perk on your campaign. You'll be able to track orders and manage fulfillment for each item.
                            </div>



                            <div className={cx('entreField')}>
                                <label className={cx('entreField-label')}>Item Name<span className={cx('entreField-required')}>*</span></label>
                                <div className={cx('entreField-subLabel')}>
                                    Name this item. The item name will be visible to backers, so make it something obvious.
                                </div>
                                <input type="text" className={cx('itext-field')} />
                            </div>

                            <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}>

                            </div>
                        </div>

                        <div className={cx('entreSection')}>
                            <div className={cx('entreField-header')}>
                                Item Options
                            </div>
                            <div className={cx('entreField-subHeader')}>
                                Do you want to offer options for the item (i.e. will a backer get to pick a specific color, size, etc.)? This will create SKUs that you can use later to help with fulfillment.
                            </div>

                            <div className={cx('entreField')}>

                                <div style={{ marginTop: '32px' }}>
                                    <label className={cx('inputRadioGroup-radio')} >
                                        <input onClick={handleClickNoOption} type="radio" value={'VSBL'} name="itemOptions" ref={noCheckOptionElement} />
                                        <span className={cx('inputRadioGroup-radio-button')}></span>
                                        <span className={cx('inputRadioGroup-radio-label')}>
                                            <span>No, I am not offering any options for this item.</span>
                                        </span>
                                    </label>

                                    <label onClick={handleClickOption} className={cx('inputRadioGroup-radio')} >
                                        <input type="radio" value={'INVS'} name="itemOptions" />
                                        <span className={cx('inputRadioGroup-radio-button')}></span>
                                        <span className={cx('inputRadioGroup-radio-label')}>
                                            <span>Yes, I am offering options for this item.</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            {
                                chooseOption &&
                                <>
                                    <div className={cx('entreField')}>
                                        <div className={cx('inputDoubleField-headers')} style={{ display: 'flex' }}>
                                            <div style={{ padding: '6px' }} class='col-4'><label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>Option Name</label></div>
                                            <div style={{ padding: '6px' }} class='col-8'><label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>Option Value</label></div>
                                        </div>
                                        {listOption.map((itemA, indexA) => {
                                            return (
                                                <div key={indexA} style={{ display: 'flex', marginTop: '8px' }}>
                                                    <div class='col-4' style={{ padding: '6px' }}>
                                                        <input onChange={(e) => handleChangeInputTagName(e, indexA)} value={itemA.name} type="text" className={cx('itext-field')} placeholder="Size" />
                                                    </div>
                                                    <div class='col-7' style={{ padding: '6px' }} >

                                                        <div className={cx('inputTags')}>
                                                            {itemA.value.map((itemB, indexB) => {
                                                                return (
                                                                    <span key={indexB} className={cx('inputTags-tag')}>{itemB}<span onClick={() => handleClickRemoveMiniValue(indexA, indexB)} style={{ color: '#7a69b3', marginLeft: '8px', cursor: 'pointer', fontSize: '16px', marginTop: '-2px' }}><IoCloseSharp /></span></span>
                                                                )
                                                            })}

                                                            <input onKeyUp={(e) => handleKeyUpInputTag(e, indexA)} onFocus={(e) => e.target.parentElement.style.border = '1px solid #000'} onBlur={(e) => e.target.parentElement.style.border = '1px solid #ddd'} placeholder={itemA.value.length === 0 && "Small, Medium, Large"} maxlength="30" className={cx('input-value-option')} />
                                                        </div>
                                                    </div>
                                                    {
                                                        listOption?.length > 1 &&
                                                        <div class='col'>
                                                            <div onClick={() => handleClickClose(indexA)} style={{ cursor: 'pointer', marginTop: '16px' }}>
                                                                <span style={{ padding: '5px 8px', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginLeft: '12px' }}><IoCloseSharp /></span>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )

                                        })}

                                    </div>
                                    {
                                        showBtnAddOption &&
                                        <div onClick={handleClickAddOption} style={{ padding: '16px 0', cursor: 'pointer' }}>
                                            <span style={{ padding: '5px 8px', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginRight: '12px', fontSize: '16px' }}><AiOutlinePlus /></span>
                                            <span style={{ color: '#7a69b3', fontWeight: '600' }}>ADD ANOTHER OPTION</span>
                                        </div>
                                    }
                                </>
                            }
                        </div>


                    </div>
                </div>

                <Footer />


            </div>



        </div>
    );
}

export default NewItem;