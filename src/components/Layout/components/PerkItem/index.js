import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './PerkItem.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function PerkItem({
    isPage,
    isShowButton = true,
    setIsOpenModalOption,
    closePerkModal,
    isInModal,
    setPerkInModal,
    item,
    index,
    setItemPerkSelected,
}) {
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(!isPage);
    const handleClickItem = () => {
        if (isPage) {
            setShowMore(true);
        }
    };

    const handleClickPerk = () => {
        closePerkModal();

        if (!isInModal) {
            setPerkInModal(false);
        }
        if (item.includeItems.some((item) => item.options && item.options.length > 0)) {
            setItemPerkSelected(item);
            setIsOpenModalOption(true);
        } else {
            navigate('/project/perk/detail', {
                state: item,
            });
        }
    };

    return (
        <div className={cx('container-item')} onClick={handleClickItem}>
            <img style={{ width: '100%', height: '35%' }} src={item.image} alt="img" />
            <div style={{ margin: '20px' }}>
                <h2 style={{ fontSize: '24px' }}>{item.name}</h2>
                <b style={{ fontSize: '30px', fontWeight: '600' }}>${item.price} USD</b>
                <p style={{ fontSize: '16px', fontWeight: '200' }}>{item.des}</p>

                {showMore && (
                    <div>
                        <p>
                            <b style={{ fontSize: '18px', fontWeight: '500' }}>Included Items</b>
                            <ul style={{ marginLeft: '20px', fontSize: '16px', fontWeight: '200' }}>
                                {item.includeItems.map((itemA, indexA) => {
                                    return <li key={indexA}>{itemA.name}</li>;
                                })}
                            </ul>
                        </p>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>Estimated Shipping</p>
                        <p style={{ fontSize: '16px', fontWeight: '200' }}>{item.estimateShipping}</p>
                        <p style={{ fontSize: '16px', fontWeight: '200' }}>Ships worldwide.</p>

                        {isShowButton && (
                            item.quantity !== item.claimed ? (
                                <button type="button" className={cx('btn-getPerk')} onClick={handleClickPerk}>
                                    GET THIS PERK
                                </button>
                            ) : (
                                <span style={{justifyContent: 'center', display: 'flex', color: '#FF582A'}}>Số lượng đã hết</span>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PerkItem;
