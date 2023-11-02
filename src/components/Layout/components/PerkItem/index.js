import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './PerkItem.module.scss';

const cx = classNames.bind(styles);

function PerkItem({ isPage, isShowButton = true , setIsOpenModalOption, closePerkModal}) {
    const [showMore, setShowMore] = useState(!isPage);
    const handleClickItem = () => {
        if (isPage) {
            setShowMore(true);
        }
    };
    return (
        <div className={cx('container-item')} onClick={handleClickItem}>
            <img
                style={{ width: '100%', height: '35%' }}
                src="https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_762,g_center,q_auto:best,dpr_1.3,f_auto,h_506/n7vh7k232ttgsdwlmlzg"
                alt="img"
            />
            <div style={{ margin: '20px' }}>
                <h2 style={{ fontSize: '24px' }}>Super Early Bird Neakasa Combo</h2>
                <b style={{ fontSize: '30px', fontWeight: '600' }}>$289 USD</b>
                <p style={{ fontSize: '16px', fontWeight: '200' }}>
                    You will get 1x Neakasa M1 combo with a litter control mat, and 6 rolls of waste bags (90 pieces in
                    total) included at only $289 with 40% off! Shipping worldwide and no customs fees. Grab this
                    incredible deal before the price goes up!
                </p>

                {showMore && (
                    <div>
                        <p>
                            <b style={{ fontSize: '18px', fontWeight: '500' }}>Included Items</b>
                            <ul style={{ marginLeft: '20px', fontSize: '16px', fontWeight: '200' }}>
                                <li>Neakasa M1</li>
                                <li>Cat Litter Mat</li>
                                <li>Roll of Waste Bag (15 pcs) (2)</li>
                            </ul>
                        </p>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>Estimated Shipping</p>
                        <p style={{ fontSize: '16px', fontWeight: '200' }}>December 2023</p>
                        <p style={{ fontSize: '16px', fontWeight: '200' }}>
                            Only <b style={{ fontWeight: '600' }}>18</b> left
                        </p>
                        <p style={{ fontSize: '16px', fontWeight: '200' }}>Ships worldwide.</p>

                        {isShowButton && (
                            <button type="button" className={cx('btn-getPerk')} onClick={() => { closePerkModal(); setIsOpenModalOption(true)}}>
                                GET THIS PERK
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PerkItem;
