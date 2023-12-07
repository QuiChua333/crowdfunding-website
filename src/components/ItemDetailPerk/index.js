import React from 'react';
import classNames from 'classnames/bind';
import styles from './ItemDetailPerk.module.scss';

const cx = classNames.bind(styles);

function ItemDetailPerk({item, setPerkSelected, setIsOpenModal, index, setIsOpenModalUpdate}) {
    const handleClickItem = () => {
        setPerkSelected({...item, index})
        setIsOpenModalUpdate(false);
        setIsOpenModal(true);
        
    }
    return (
        <div
            onClick={handleClickItem}
            className={cx('itemPerk',{disabled: item.isSelected})} 
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
                src={item.image}
                alt="img"
            />
            <span style={{ margin: '20px 0 0 30px', fontSize: '17px', fontWeight: '500' }}>{item.name}</span>
            <span style={{ margin: '2px 0 0 30px', fontSize: '22px', fontWeight: '600' }}>${item.price} USD</span>
            <span style={{ margin: '10px 0 40px 30px', fontWeight: '500', fontSize: '14px'}}>
                {item.claimed}/{item.quantity} <span style={{ fontWeight: '350' }}>claimed</span>
            </span>
            <button type="button" className={cx('btn-get')} onClick={handleClickItem}>
                THÊM
            </button>
        </div>
    );
}

export default ItemDetailPerk;
