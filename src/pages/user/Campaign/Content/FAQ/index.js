import classNames from "classnames/bind";
import { IoCloseSharp } from "react-icons/io5";

import { useEffect, useState } from "react";
import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'

const cx =classNames.bind(styles)

function FAQ({ isShowClose, index, removeFAQ, handleChangeFAQ, item}) {

    const handleChange = (e, type) => {
        const newItem = {
            ...item,
            [type]: e.target.value
        }
        handleChangeFAQ(newItem, index);

        
    }
    const handleClickClose = () => {
        removeFAQ(index)
    }


    return (

        <div className={cx('wrapper')}>
            <div style={{ flex: 1 }}>
                <div className={cx('row')}>
                    <div className={cx('title')}>
                        Câu hỏi
                    </div>
                    <input onChange={(e) => handleChange(e,'question')} value={item.question} type="text" className={cx('itext-field')} />
                    <div className={cx('entreField-validationLabel')}>200</div>
                </div>

                <div className={cx('row')}>
                    <div className={cx('title')}>
                        Trả lời
                    </div>
                    <textarea onChange={(e) => handleChange(e,'answer')} value={item.answer} className={cx('itext-field')} style={{ minHeight: '60px', paddingTop: '10px' }}></textarea>
                    <div className={cx('entreField-validationLabel')}>500</div>
                </div>
            </div>
            {
                isShowClose &&
                <div onClick={handleClickClose} style={{ cursor: 'pointer', marginTop: '40px' }}>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30px', height: '30px', background: '#eee5f2', color: '#7a69b3', borderRadius: '50%', marginLeft: '12px' }}><IoCloseSharp /></span>
                </div>
            }

        </div>
    );
}

export default FAQ;