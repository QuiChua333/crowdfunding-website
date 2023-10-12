import React from 'react';
import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import {FaEye, FaEyeSlash} from "react-icons/fa6"
const cx = classNames.bind(styles);

function SignUp() {
    return (
        <div className={cx('container_main')}>
            <form className={cx('form')} id="form-2">
                <h3 className={cx('heading')}>Đăng Ký</h3>
                <p className={cx('desc')}>Tạo tài khoản <b className={cx('fw-bold')}>GiveFund</b> ❤️</p>

                <div className={cx('spacer')}></div>

                <div className={cx('form-group')}>
                    <label for="email" className={cx('form-label')}>
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="VD: email@domain.com"
                        className={cx('form-control')}
                    />
                    <span className={cx('form-message')}></span>
                </div>

                <div className={cx('form-group')}>
                    <label for="password" className={cx('form-label')}>
                        Mật khẩu
                    </label>
                    <div className={cx('container-pass')}>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className={cx('form-control')}
                        />
                        <FaEye className={cx('eye-icon')}/>
                    </div>
                    <span className={cx('form-message')}></span>
                </div>

                <div className={cx('form-group')}>
                    <label for="confirm-password" className={cx('form-label')}>
                        Nhập lại mật khẩu
                    </label>
                    <div className={cx('container-pass')}>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="confirm-password"
                            placeholder="Nhập lại mật khẩu"
                            className={cx('form-control')}
                        />
                        <FaEyeSlash className={cx('eye-icon')}/>
                    </div>
                    
                    <span className={cx('form-message')}></span>
                </div>

                <p className={cx('desc')}>Hãy xác nhận qua email để xác nhận đăng ký lần đầu tiên</p>

                <button className={cx('form-submit')}>Đăng Ký</button>
            </form>

            <div className={cx('container-img')}>
                <p className={cx('title-bg')}>Đăng Ký</p>
                <span>Hãy tạo tài khoản với GiveFund</span>
                <span>Nếu đã có tài khoản hãy đi đến đăng nhập</span>
                <button className={cx('button-login')}>Đăng Nhập</button>
            </div>
        </div>
    );
}

export default SignUp;
