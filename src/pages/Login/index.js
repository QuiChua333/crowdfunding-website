import React from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import icons from '~/assets/icons';

const cx = classNames.bind(styles);


function Login() {
    return (
        <div className={cx('container_main')}>
            <form className={cx('form')} id="form-2">
                <h3 className={cx('heading')}>Đăng Nhập</h3>
                <p className={cx('desc')}>
                    Đăng nhập để sử dụng <b className={cx('fw-bold')}>GiveFund</b> ❤️
                </p>

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
                        <img className={cx('eye-icon')} src={icons.eye} alt="eye" />
                    </div>
                    <span className={cx('form-message')}></span>
                </div>


                <button className={cx('form-submit')}>Đăng Nhập</button>
                <div className={cx('spacer')}></div>
                <a href="/" className={cx('forgetPass')}>Quên mật khẩu ?</a>
            </form>

            <div className={cx('container-img')}>
                <p className={cx('title-bg')}>Đăng Nhập</p>
                <span>GiveFund một nền tảng gây quỹ cộng đồng</span>
                <span>Nếu bạn chưa có tài khoản hãy đăng ký để trải nghiệm</span>
                <button className={cx('button-login')}>Đăng Ký</button>
            </div>
        </div>
    );
}

export default Login;
