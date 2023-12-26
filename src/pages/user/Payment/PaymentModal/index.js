import classNames from "classnames/bind";
import styles from './PaymentModal.module.scss'
import { useDispatch } from "react-redux";
import { setMessageBox } from "~/redux/slides/GlobalApp";
import { useState } from "react";
import momo from '~/assets/images/momo.png'
import paypal from '~/assets/images/paypal.jpg'
const cx = classNames.bind(styles)
function PaymentModal({ setShowPaymentModal, handlePaymentMethod }) {
    const dispatch = useDispatch();
    const [method, setMethod] = useState('momo')
    const handleClickAccept = () => {
        setShowPaymentModal(false)
        handlePaymentMethod(method)
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h3 className={cx('title')}>CHỌN CÁCH THỨC THANH TOÁN</h3>
                <p className={cx('description')}>Vui lòng chọn một trong 2 cách sau:</p>
                <div style={{ marginBottom: '32px' }}>
                    <label className={cx('inputRadioGroup-radio')} onClick={() => setMethod('momo')}>
                        <input type="radio" value={'VSBL'} name="perkVisibility" defaultChecked />
                        <span className={cx('inputRadioGroup-radio-button')}></span>
                        <div className={cx('inputRadioGroup-radio-label')}>
                            <img src={momo} className={cx('img')}/>
                            <span>Thanh toán qua Momo</span>
                        </div>
                    </label>

                </div>
                <div className={cx('section-button')}>

                    <a onClick={() => setShowPaymentModal(false)} className={cx('btn', 'btn-cancel')}>Đóng</a>


                    <a onClick={handleClickAccept} className={cx('btn', 'btn-ok')}>Xác nhận</a>

                </div>
            </div>
        </div>
    );
}

export default PaymentModal;