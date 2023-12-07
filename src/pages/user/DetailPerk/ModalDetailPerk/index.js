import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalDetailPerk.module.scss';
import PerkItem from '~/components/Layout/components/PerkItem';

const cx = classNames.bind(styles);

function ModalDetailPerk({ itemPerk, setIsOpenModal, handleSelectedItem, isOpenModalUpdate, handleEditListSelected }) {
    const [optionsSelectedItems, setOptionsSelectedItems] = useState(() => {
        let arrItemHasOption = itemPerk.includeItems.filter((item) => {
            return item.options && item.options.length > 0;
        });

        let result = arrItemHasOption.map((item) => {
            return {
                name: item.name,
                optionsSelected: item.options.map((i) => {
                    return {
                        name: i.name,
                        value: '',
                    };
                }),
            };
        });

        return result;
    });
    const handleChangeSelectOption = (e, nameItem) => {
        let nameOption = e.target.name;
        let value = e.target.value;
        // prev là mảng result

        setOptionsSelectedItems((prev) => {
            return [...prev].map((item) => {
                if (item.name === nameItem) {
                    return {
                        ...item,
                        optionsSelected: [...item.optionsSelected].map((itemOptionSelect) => {
                            if (itemOptionSelect.name === nameOption)
                                return {
                                    ...itemOptionSelect,
                                    value: value,
                                };
                            else {
                                return itemOptionSelect;
                            }
                        }),
                    };
                } else {
                    return item;
                }
            });
        });
    };
    const handleOnclickAccept = () => {
        const newItem = {
            ...itemPerk,
            includeItems: [...itemPerk.includeItems].map((item) => {
                if (item.options && item.options.length > 0) {
                    return {
                        ...item,
                        optionsSelected: optionsSelectedItems.find((i) => {
                            return i.name === item.name;
                        }).optionsSelected,
                    };
                } else {
                    return item;
                }
            }),
        };
        if (!isOpenModalUpdate) {
            handleSelectedItem(itemPerk.index, newItem);
            setIsOpenModal(false);
        } else {
            handleEditListSelected(itemPerk.index, newItem);
            setIsOpenModal(false);
        }
    };

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
            onClick={() => {
                setIsOpenModal(true);
            }}
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
                    <span
                        role="button"
                        className={cx('btn-close')}
                        onClick={() => {
                            setIsOpenModal(false);
                        }}
                    >
                        &times;
                    </span>
                </div>
                <div style={{ display: 'flex', height: '100%', margin: '0px 30px 40px', overflowY: 'scroll' }}>
                    <div style={{ width: '50%' }}>
                        <PerkItem isShowButton={false} item={itemPerk} />
                    </div>

                    <div style={{ width: '50%' }}>
                        <p style={{ fontSize: '20px', margin: '24px' }}>Select your options</p>
                        {itemPerk.includeItems.map((itemA, indexA) => {
                            return (
                                <div style={{ margin: '0 24px 30px', borderBottom: '1px solid #ccc' }} key={indexA}>
                                    <p style={{ fontSize: '18px', fontWeight: '600' }}>{itemA.name}</p>
                                    {itemA.options &&
                                        itemA.options.length &&
                                        itemA.options.map((itemB, indexB) => {
                                            return (
                                                <div
                                                    style={{
                                                        margin: '10px 0px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}
                                                    key={indexB}
                                                >
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
                                                        onChange={(e) => handleChangeSelectOption(e, itemA.name)}
                                                        name={itemB.name}
                                                        style={{
                                                            marginLeft: '20px',
                                                            width: '200px',
                                                            height: '40px',
                                                            outline: 'none',
                                                            padding: '0 20px',
                                                        }}
                                                    >
                                                        {itemB.itemsOption.map((itemC, indexC) => {
                                                            return (
                                                                <option value={itemC} key={indexC} selected={itemA.optionsSelected.map(x=> x.value).includes(itemC)}>
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

                <button type="button" className={cx('btn-continue')} onClick={handleOnclickAccept}>
                    Xác nhận
                </button>
            </div>
        </div>
    );
}

export default ModalDetailPerk;
