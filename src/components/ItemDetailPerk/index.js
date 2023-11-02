import React from 'react';
import classNames from 'classnames/bind';
import styles from './ItemDetailPerk.module.scss';

const cx = classNames.bind(styles);

function ItemDetailPerk() {
    return (
        <div
            style={{
                height: 'auto',
                width: '262px',
                border: '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column',
                margin: '20px',
                borderRadius: '4px'
            }}
        >
            <img
                style={{ width: '260px', height: '180px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}
                src="https://c2.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,w_254,g_center,q_auto:best,dpr_1.3,f_auto,h_192/eqf167ahyf2omqzvsqti"
                alt="img"
            />
            <span style={{ margin: '20px 0 0 30px', fontSize: '18px', fontWeight: '500' }}>'Salad Zone' T-Shirt</span>
            <span style={{ margin: '2px 0 0 30px', fontSize: '22px', fontWeight: '700' }}>$45 USD</span>
            <span style={{ margin: '10px 0 40px 30px', fontWeight: '600' }}>
                1 <span style={{ fontWeight: '350' }}>claimed</span>
            </span>
            <button type="button" className={cx('btn-get')}>
                GET THIS ADD-ON
            </button>
        </div>
    );
}

export default ItemDetailPerk;
