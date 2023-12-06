
import classNames from "classnames/bind";
import styles from './ItemCampaign.module.scss'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useState } from "react";
const cx = classNames.bind(styles);

function ItemCampaign() {
    const [showDropDown,setShowDropDown] = useState(false)
    return (
        <div className={cx('wrapper')}>
            <div className={cx('campaign')}>
                <img src="https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,f_auto,h_200,w_200/v1697085147/kkm1kzwamwukkszcmszq.jpg" />
                <div className={cx('campaign-info')}>
                    <div className={cx('campaign-title-wrapper')}>
                        <h2 className={cx('campaign-title')}>
                            My Campaign Title   </h2> <span>  Draft</span>
                    </div>
                    <span className={cx('campaign-author')}>
                        by <a>Ngọc Quí Huỳnh</a></span>

                    <p className={cx('campaign-tagline')}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <span className={cx('campaign-id')}>
                        Campaign ID: 2865220</span>
                </div>
            </div>
            <div>
                <div onClick={() => setShowDropDown(prev => !prev)} className={cx('action')}>
                    <span>Action </span>
                    {
                        !showDropDown &&
                        <FaAngleDown />
                    }
                    {
                        showDropDown &&
                        <FaAngleUp />
                    }

                    <div className={cx('action-dropdown', {show: showDropDown})}>
                        <a href="/campaigns/:id/edit/basic">Edit Campaign</a>
                        <div style={{height: '1px', background: '#ccc'}}></div>
                        <a>Delete Campaign</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCampaign;