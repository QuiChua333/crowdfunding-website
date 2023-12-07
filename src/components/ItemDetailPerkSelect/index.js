import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { HiOutlineMinusSm } from 'react-icons/hi';
import classNames from 'classnames/bind';
import styles from './ItemDetailPerkSelect.module.scss';

const cx = classNames.bind(styles);

function ItemDetailPerkSelect({ setIsOpenModalUpdate, setIsOpenModal, item, setPerkSelected, index, handleClickRemoveItem}) {
    const [options, setOptions] = useState(() => {
        {
            console.log(item);
            const res = item.includeItems.reduce((acc, cur) => {
                if (cur.optionsSelected) {
                    return (
                        acc +
                        cur.optionsSelected.reduce((acc2, cur2) => {
                            return acc2 + cur2.value + ' ';
                        }, '')
                    );
                } else {
                    return acc + '';
                }
            }, '');
            return res;
        }
    });
    const handleClickEdit = () => {
        setPerkSelected({ ...item, index });
        setIsOpenModalUpdate(true);
        setIsOpenModal(true);
    };
    const [quantityItem, setQuantityItem] = useState(1);
    const handleClickSub = () => {
        if (quantityItem > 1) {
            setQuantityItem((prev) => prev - 1);
        }
    };
    const handleClickAdd = () => {
        if (quantityItem < item.quantity - item.claimed) {
            setQuantityItem((prev) => prev + 1);
        }
    };
    return (
        <div
            className={cx('disableSelect')}
            style={{
                display: 'flex',
                borderBottom: '1px solid #CACACA',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px 10px 20px',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', width: '80%' }}>
                    <img
                        className={cx('disableSelect')}
                        style={{
                            width: '100px',
                            height: '80px',
                            borderRadius: '4px',
                            border: '1px solid #949494',
                            marginTop: '6px',
                        }}
                        src={item.image}
                        alt="img"
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', position: 'relative' }}>
                        <span className={cx('disableSelect')} style={{ fontSize: '16px', fontWeight: '400' }}>
                            {item.name}
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: '300', color: '#949494' }}>{options}</span>
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
                                marginBottom: '4px',
                            }}
                        >
                            <HiOutlineMinusSm
                                className={cx('btn-quantity')}
                                style={{ cursor: 'pointer' }}
                                onClick={handleClickSub}
                            />
                            <span style={{ fontWeight: '600' }} className={cx('disableSelect')}>
                                {quantityItem}
                            </span>
                            <BiPlus
                                className={cx('btn-quantity')}
                                style={{ cursor: 'pointer' }}
                                onClick={handleClickAdd}
                            />
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
                        <span className={cx('disableSelect', 'btn-edit')} onClick={handleClickEdit}>
                            Edit
                        </span>
                        <span className={cx('disableSelect', 'btn-remove')} onClick={handleClickRemoveItem}>Remove</span>
                    </div>
                    <span className={cx('disableSelect')} style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        {item.price} USD
                    </span>
                </div>
            </div>
            {
                quantityItem === item.quantity - item.claimed && <span style={{marginTop: '20px', fontSize: '14px', color: '#FF582A'}}>! Số lượng tối đa còn lại có thể chọn là: {item.quantity - item.claimed}</span>
            }
        </div>
    );
}

export default ItemDetailPerkSelect;
