import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { HiOutlineMinusSm } from 'react-icons/hi';
import classNames from 'classnames/bind';
import styles from './ItemDetailPerkSelect.module.scss';

const cx = classNames.bind(styles);

function ItemDetailPerkSelect() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 10px 30px',
                borderBottom: '1px solid #CACACA',
                marginTop: '0px',
            }}
        >
            <div style={{ display: 'flex', width: '80%' }}>
                <img
                    style={{ width: '100px', height: '80px', borderRadius: '4px', border: '1px solid #949494' }}
                    src="https://c2.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,w_auto,g_center,q_auto:best,dpr_1.3,f_auto/md2ed2dbvdct6qnnfz1v"
                    alt="img"
                />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', position: 'relative' }}>
                    <span style={{ fontSize: '16px', fontWeight: '400' }}>48 Hour Exclusive Offer!</span>
                    <span style={{ fontSize: '14px', fontWeight: '300', color: '#949494' }}>Don't Redeem Voucher</span>
                    <div
                        style={{
                            width: '100px',
                            height: '30px',
                            border: '1px solid #262626',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '2px 10px',
                            bottom: '-4px',
                            position: 'absolute',
                        }}
                    >
                        <HiOutlineMinusSm style={{ cursor: 'pointer' }} />
                        <span className={cx('disableSelect')}>1</span>
                        <BiPlus className={cx('disableSelect')} style={{ cursor: 'pointer' }} />
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: '20%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div>
                    <span className={cx('disableSelect', 'btn-edit')}>Edit</span>
                    <span
                        className={cx('disableSelect', 'btn-remove')}>Remove</span>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>$60 USD</span>
            </div>
        </div>
    );
}

export default ItemDetailPerkSelect;
