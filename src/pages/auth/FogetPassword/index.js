import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FogetPassword.module.scss';
import axios from 'axios';
const cx = classNames.bind(styles);

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [textValidateEmail, setTextValidateEmail] = useState('');
    const validateEmail = (value) => {
      if (value.trim().length === 0 || value.trim() === '') {
          setTextValidateEmail('Vui lòng nhập email');
          return false;
      } else {
          let flag = String(value)
              .toLowerCase()
              .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              );
          if (!flag) {
              setTextValidateEmail('Email không hợp lệ. Vui lòng nhập lại');
              return false;
          } else {
              setTextValidateEmail('');
              return true;
          }
      }
  };
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let flagEmail = validateEmail(email);
        if (flagEmail) {
          try {
        	const url = `http://localhost:5000/user/forgot-password`;
        	const { data } = await axios.post(url, { email });
        	setMsg(`Một liên kết cập nhật mật khẩu đã được gửi đến ${email}`);
        	setError("");
        } catch (error) {
        	if (
        		error.response &&
        		error.response.status >= 400 &&
        		error.response.status <= 500
        	) {
        		setError(error.response.data.message);
        		setMsg("");
        	}
        }
        }
        
    };

    return (
        <div className={cx('container')}>
            <form className={cx('form_container')} onSubmit={handleSubmit}>
                <h1>Quên mật khẩu</h1>
                <span className={cx('title')}>
                    Chúng tôi sẽ gửi thông tin đổi mật khẩu đến địa chỉ email của bạn. Vui lòng kiểm tra email để cập
                    nhật lại mật khẩu.
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', height: '70px' }}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Địa chỉ email"
                        name="email"
                        className={cx('inputInfo')}
                    />
                    <span className={cx('text-validate')}>{textValidateEmail}</span>
                </div>
                {error && <div className={cx('error_msg')}>{error}</div>}
                {msg && <div className={cx('success_msg')}>{msg}</div>}
                <button type="submit" className={cx('green_btn')}>
                    Xác nhận
                </button>
            </form>
        </div>
    );
}

export default ForgetPassword;
