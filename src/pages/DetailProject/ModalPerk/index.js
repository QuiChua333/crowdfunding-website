import React, { useState } from 'react'
import classNames from 'classnames/bind';
import styles from './ModalPerk.module.scss';
import PerlItem from '~/components/Layout/components/PerkItem'

const cx = classNames.bind(styles);

function ModalPerk(props) {
  return (
    <div style={{width: '100%', height: '100%', position: 'fixed', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', top: '0', zIndex: '1000'}} onClick={props.close}>
        <div className={cx('modal')} style={{overflowY: 'scroll', width: '450px', backgroundColor: '#fff', height: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', borderRadius: '4px'}}>
            <span className={cx('btn-close')} role='button' onClick={props.close}>&times;</span>
            <p style={{fontSize: '22px', marginTop: '-40px', fontWeight: '500'}}>Back this project</p>
            <div style={{marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '90%'}}>
                <p style={{fontWeight: '400', fontSize: '18px'}}>Make a contribution</p>
                <div style={{width: '100%', height: 'auto', border: '1px solid #c8c8c8', padding: "20px", display: 'flex', flexDirection: 'column', marginBottom: '30px', backgroundColor: '#fafafa'}}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center'}}>
                        <input className={cx('input-price')} type="number" name="price" placeholder='Enter money'/>
                        <span style={{color: '#858585', fontSize: '20px'}}>VND</span>
                        <button className={cx('btn-continue')} type="button">CONTINUE</button>
                    </div>
                    <p style={{color: '#575757', fontSize: '12px', marginBottom: '0'}}>Contributions are not associated with perks</p>
                </div>
                <p style={{fontWeight: '400', fontSize: '18px'}}>Select An Option</p>

                <div style={{height: 'auto'}}>
                            {[1, 2, 3, 4, 5].map((item, index) => {
                                return <PerlItem key={index} setIsOpenModalOption = {props.setIsOpenModalOption}/>;
                            })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModalPerk