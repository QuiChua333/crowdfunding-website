import classNames from "classnames/bind";
import { IoCloseSharp } from "react-icons/io5";


import styles from './FAQ.module.scss'
import { useEffect, useState } from "react";
const cx = classNames.bind(styles)

function FAQ({ isShowClose, index, removeFAQ, updateValueFAQ, value}) {

    const handleChange = (e, type) => {
        const newValue = {
            ...value,
            [type]: e.target.value
        }
        updateValueFAQ(newValue, index);

        
    }
    const handleClickClose = () => {
        removeFAQ(index)
    }

    // useEffect(()=> {
      

    // },[value])

    return (

        <div className={cx('wrapper')}>
            <div style={{ flex: 1 }}>
                <div className={cx('row')}>
                    <div className={cx('title')}>
                        Question
                    </div>
                    <input onChange={(e) => handleChange(e,'question')} value={value.question} type="text" className={cx('itext-field')} />
                    <div className={cx('entreField-validationLabel')}>200</div>
                </div>

                <div className={cx('row')}>
                    <div className={cx('title')}>
                        Answer
                    </div>
                    <textarea onChange={(e) => handleChange(e,'answer')} value={value.answer} className={cx('itext-field')} style={{ minHeight: '60px' }}></textarea>
                    <div className={cx('entreField-validationLabel')}>500</div>
                </div>
            </div>
            {
                isShowClose &&
                <div onClick={handleClickClose} style={{ cursor: 'pointer', marginTop: '40px' }}>
                    <span style={{ padding: '5px 8px', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginLeft: '12px' }}><IoCloseSharp /></span>
                </div>
            }

        </div>
    );
}

export default FAQ;