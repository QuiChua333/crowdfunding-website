import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './PerkItem.module.scss';
import { useNavigate } from 'react-router-dom';
import formatMoney from '~/utils/formatMoney';
import formatDate from '~/utils/formatDate';

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
        if (item.items.some((i) => i.item.options && i.item.options.length > 0)) {
            setItemPerkSelected(item);
            setIsOpenModalOption(true);
        } else {
            // chưa xử lý
            navigate('/project/perk/detail', {
                state: item,
            });
        }
    };

    return (
        <div className={cx('container-item')} onClick={handleClickItem}>
            <img style={{ width: '100%', height: '35%' }} src={item.image.url} alt="img" />
            <div style={{ margin: '20px' }}>
                <h2 style={{ fontSize: '24px' }}>{item.title}</h2>
                <b style={{ fontSize: '30px', fontWeight: '600' }}>{formatMoney(item.price)}</b>
                <p style={{ fontSize: '16px', fontWeight: '200' }}>{item.description}</p>

                {showMore && (
                    <div>
                        <p>
                            <b style={{ fontSize: '18px', fontWeight: '500' }}>Bao gồm: </b>
                            <ul style={{ marginLeft: '20px', fontSize: '16px', fontWeight: '200' }}>
                                {item.items.map((itemA, indexA) => {
                                    return <li key={indexA}>{itemA.item.name}</li>;
                                })}
                            </ul>
                        </p>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>Ngày giao dự kiến</p>
                        <p style={{ fontSize: '16px', fontWeight: '200' }}>{formatDate(item.estDelivery)}</p>
                        <p style={{ fontSize: '16px', fontWeight: '200' }}>Giao toàn lành thổ.</p>

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
