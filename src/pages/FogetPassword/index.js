import React from 'react';
import classNames from 'classnames/bind';
import styles from './FogetPassword.module.scss';

const cx = classNames.bind(styles);

function ForgetPassword() {
  return (
    <div className={cx('container_main')}>
            <form className={cx('form')} id="form-2">
                <h3 className={cx('heading')}>Quên mật khẩu</h3>
                <p className={cx('desc')}>
                  Hãy nhập địa chỉ email bạn dùng để đăng ký tài khoản
                </p>

                <p className={cx('desc')}>
                  Chúng tôi sẽ gửi link cấp lại mật khẩu đến địa chỉ đó
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

                <button className={cx('form-submit')}>Tiếp tục</button>
                <div className={cx('spacer')}></div>
                <a href="/" className={cx('forgetPass')}>Quay lại đăng nhập</a>
            </form>

            <div className={cx('container-img')}>
                <p className={cx('title-bg')}>Quên mật khẩu</p>
                <span className={cx('text-italic')}>Đừng lo chúng tôi đang giúp bạn lấy lại mật khẩu</span>
                <button className={cx('button-login')}>Đăng Nhập</button>
            </div>
        </div>
  )
}

export default ForgetPassword