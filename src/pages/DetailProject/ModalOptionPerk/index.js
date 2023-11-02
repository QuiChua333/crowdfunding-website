import React from 'react';
import classNames from 'classnames/bind';
import styles from './ModalOptionPerk.module.scss';
import PerlItem from '~/components/Layout/components/PerkItem';

const cx = classNames.bind(styles);

function ModalOptionPerk({close, setIsOpenModal}) {
    const gifts = [
        {
            name: 'Neakasa M1',
            options: [
                {
                    name: 'Color',
                    items: ['Red', 'Green', 'Blue'],
                },
            ],
        },
        {
            name: 'Cat Litter Mat',
            options: [
                {
                    name: 'Color',
                    items: ['Red', 'Green', 'Blue'],
                },
                {
                    name: 'Size',
                    items: ['M', 'L', 'XL'],
                },
            ],
        },
        {
            name: 'Roll of Waste Bag (15 pcs)',
            options: [
                {
                    name: 'Type',
                    items: ['Small', 'Medium', 'Lagre'],
                },
            ],
        },
    ];

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                display: 'flex',
                backgroundColor: 'rgba(0,0,0,0.5)',
                top: '0',
                zIndex: '1000',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={() => {setIsOpenModal(true);close()}}
        >
            <div
              onClick={(e) => e.stopPropagation()}  
                style={{
                    width: '50%',
                    height: '600px',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
               
            >
                <div style={{ display: 'flex', margin: '10px 30px 0px', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '26px', fontWeight: '500', margin: '10px 0 0 10px' }}>Your Perk</span>
                    <span role="button" className={cx('btn-close')} onClick={() => {setIsOpenModal(true);close()}}>
                        &times;
                    </span>
                </div>
                <div style={{ display: 'flex', height: '100%', margin: '0px 30px 40px', overflowY: 'scroll' }}>
                    <div style={{ width: '50%' }}>
                        <PerlItem isShowButton={false} />
                    </div>

                    <div style={{ width: '50%' }}>
                        <p style={{ fontSize: '20px', margin: '24px' }}>Select your options</p>
                        {gifts.map((itemA, indexA) => {
                            return (
                                <div style={{ margin: '0 24px 30px', borderBottom: '1px solid #ccc'}} key={indexA}>
                                    <p style={{ fontSize: '18px', fontWeight: '600' }}>{itemA.name}</p>
                                    {itemA.options.map((itemB, indexB) => {
                                        return (
                                            <div style={{ margin: '10px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} key={indexB}>
                                                <span
                                                    style={{
                                                        fontSize: '16px',
                                                        fontWeight: '500',
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    {itemB.name + ': '}
                                                </span>
                                                <select
                                                    style={{
                                                        marginLeft: '20px',
                                                        width: '200px',
                                                        height: '40px',
                                                        outline: 'none',
                                                        padding: '0 20px',
                                                    }}
                                                >
                                                    {itemB.items.map((itemC, indexC) => {
                                                        return (
                                                            <option value={itemC} key={indexC}>
                                                                {itemC}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button type="button" className={cx('btn-continue')}>
                    CONTINUE TO PAYMENT
                </button>
            </div>
        </div>
    );
}

export default ModalOptionPerk;
