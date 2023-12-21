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
                        value: i.itemsOption[0]
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
        <div className={cx('wrapper')} onClick={() => {setIsOpenModal(true);}}>
            <div className={cx('container-body')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('container-1')}>
                    <span className={cx('title')}>Quà của bạn</span>
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
                <div className={cx('container-2')}>
                    <div style={{ width: '50%' }}>
                        <PerkItem isShowButton={false} item={itemPerk} />
                    </div>

                    <div style={{ width: '50%' }}>
                        <p>Chọn quà của bạn</p>
                        {itemPerk.includeItems.map((itemA, indexA) => {
                            return (
                                <div className={cx('container-list-perk')} key={indexA}>
                                    <p>{itemA.name}</p>
                                    {itemA.options &&
                                        itemA.options.length &&
                                        itemA.options.map((itemB, indexB) => {
                                            return (
                                                <div className={cx('container-options')} key={indexB}>
                                                    <span className={cx('name')}>{itemB.name + ': '}</span>
                                                    <select onChange={(e) => handleChangeSelectOption(e, itemA.name)} name={itemB.name} >
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
