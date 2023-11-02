import React from 'react'
import classNames from 'classnames/bind';
import styles from './DetailPerk.module.scss';
import ItemDetailPerk from '~/components/ItemDetailPerk';
import ItemDetailPerkSelect from '~/components/ItemDetailPerkSelect';


const cx = classNames.bind(styles);


function DetailPerk() {
  return (
    <div style={{width: '100%'}}>
      <p style={{width: '100%', textAlign: 'center', margin: '6px 0 20px', fontSize: '28px', fontWeight: 'bold', color: '#207d5d', borderBottom: '1px solid #ccc'}}>GIVEFUND</p>
      <div style={{display: 'flex', height: '100%', padding: '10px 140px', margin: '10px 0'}}>
        <div style={{width: '52%', marginRight: '30px'}}>
          <p style={{fontSize: '20px', fontWeight: '600', marginLeft: '20px'}}>Popular Add-ons</p>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                return <ItemDetailPerk/>
              })
            }
          </div>
        </div>

        <div style={{width: '48%', marginLeft: '30px'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: '20px', fontWeight: '600', marginLeft: '20px', marginBottom: '20px'}}>Your Contribution<span style={{fontSize: '14px', fontWeight: '500', marginLeft: '10px', color: '#616161'}}>(<span>1</span> item)</span></span>
            <div style={{display: 'flex', flexDirection: 'column', height: '360px', overflowY: 'scroll'}}>
              {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                return <ItemDetailPerkSelect/>
              })
            }
            </div>
          </div>

          <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', padding: '30px 40px', border: '1px solid #ccc', borderRadius: '4px'}}>
            <span style={{fontSize: '20px', fontWeight: '600', marginBottom: '20px', marginLeft: '-20px'}}>Contribution summary</span>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '17px', fontWeight: '300'}}>
              <span>Subtotal</span>
              <span>$25</span>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '17px', fontWeight: '300', marginTop: '6px'}}>
              <span>Shipping</span>
              <span>$15</span>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '24px', fontWeight: '450', marginTop: '30px'}}>
              <span>Total</span>
              <span>$40</span>
            </div>

            <div style={{height: '1px', backgroundColor: '#ccc', marginTop: '10px'}}></div>

            <button className={cx('btn-checkout')} type="button">PROCEED TO CHECKOUT</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default DetailPerk