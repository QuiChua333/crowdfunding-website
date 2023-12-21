import React from 'react'
import classNames from 'classnames/bind';
import styles from './ModalPerk.module.scss';
import PerlItem from '~/components/Layout/components/PerkItem'

const cx = classNames.bind(styles);

function ModalPerk({close, setIsOpenModalOption, setPerkInModal, listPerk, setItemPerkSelected}) {
  return (
    <div className={cx('wrapper')} onClick={close}>
        <div onClick={(e) => e.stopPropagation()} className={cx('modal')}>
            <span className={cx('btn-close')} role='button' onClick={close}>&times;</span>
            <p className={cx('title-modal')}>Quay lại chiến dịch</p>
            <div className={cx('container-body')}>
                <p className={cx('title-contribute')}>Thực hiện đóng góp</p>
                <div className={cx('container-layout-input')}>
                    <div className={cx('container-input')}>
                        <input className={cx('input-price')} type="number" name="price" placeholder='Nhập số tiền (VND)'/>
                        <button className={cx('btn-continue')} type="button">Tiếp tục</button>
                    </div>
                    <p className={cx('title-under-input')}>Đóng góp sẽ không liên quan tới quà</p>
                </div>
                <p className={cx('title-contribute')}>Chọn một quà</p>

                <div className={cx('container-list-perks')}>
                            {listPerk.map((item, index) => {
                                return <PerlItem setItemPerkSelected={setItemPerkSelected} item={item} key={index} setIsOpenModalOption = {setIsOpenModalOption} closePerkModal={close} isInModal setPerkInModal={setPerkInModal}/>;
                            })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModalPerk