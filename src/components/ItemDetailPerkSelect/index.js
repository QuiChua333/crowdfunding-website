import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { HiOutlineMinusSm } from 'react-icons/hi';
import classNames from 'classnames/bind';
import styles from './ItemDetailPerkSelect.module.scss';

const cx = classNames.bind(styles);

function ItemDetailPerkSelect({setIsOpenModalUpdate, setIsOpenModal, item, setPerkSelected, index}) {

    const [options,setOptions] = useState(() => {{
        console.log(item)
        const res = item.includeItems.reduce((acc,cur) => {
            if (cur.optionsSelected) {
                console.log('da vao')
                return acc + cur.optionsSelected.reduce((acc2,cur2) => {
                    return acc2 + cur2.value + ' '
                }, "")
            }
            else {
                return acc + "";
            }
            
        },"")
        return res
    }})
    const handleClickEdit = () => {
        setPerkSelected({...item, index});
        setIsOpenModalUpdate(true);
        setIsOpenModal(true);
    }

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
                    src={item.image}
                    alt="img"
                />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', position: 'relative' }}>
                    <span style={{ fontSize: '16px', fontWeight: '400' }}>{item.name}</span>
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
                    <span className={cx('disableSelect', 'btn-edit')} onClick={handleClickEdit}>Edit</span>
                    <span
                        className={cx('disableSelect', 'btn-remove')}>Remove</span>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.price} USD</span>
            </div>
        </div>
    );
}

export default ItemDetailPerkSelect;
