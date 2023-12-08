import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ResetPassword.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const cx = classNames.bind(styles);

function ResetPassword() {
    const [validUrl, setValidUrl] = useState(false);
    const [pass, setPass] = useState('');
    const [textValidatePass, setTextValidatePass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [textValidateConfirmPass, setTextValidateConfirmPass] = useState('');

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const handleShowAndHidePass = () => {
        setShowPass(!showPass);
    };
    const handleShowAndHideConfirmPass = () => {
        setShowConfirmPass(!showConfirmPass);
    };

    const validatePass = (value) => {
        if (value.trim().length === 0 || value.trim() === '') {
            setTextValidatePass('Vui lòng nhập mật khẩu');
            return false;
        } else {
            if (value.trim().length < 8) {
                setTextValidatePass('Mật khẩu ít nhất phải có 8 ký tự');
                return false;
            } else {
                setTextValidatePass('');
                return true;
            }
        }
    };
    const validateConfirmPass = (value) => {
        if (value.trim().length === 0 || value.trim() === '') {
            setTextValidateConfirmPass('Vui lòng nhập lại mật khẩu');
            return false;
        } else {
            if (value.trim() !== pass) {
                setTextValidateConfirmPass('Mật khẩu không khớp. Vui lòng nhập lại');
                return false;
            } else {
                setTextValidateConfirmPass('');
                return true;
            }
        }
    };

    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    // const param = useParams();
    // const url = `http://localhost:8080/api/password-reset/${param.id}/${param.token}`;

    // useEffect(() => {
    // 	const verifyUrl = async () => {
    // 		try {
    // 			await axios.get(url);
    // 			setValidUrl(true);
    // 		} catch (error) {
    // 			setValidUrl(false);
    // 		}
    // 	};
    // 	verifyUrl();
    // }, [param, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let flagPassword = validatePass(pass);
        let flagConfirmPass = validateConfirmPass(confirmPass);
        if (flagPassword && flagConfirmPass) {
            // Xử lý submit ở đây..
            // try {
            // 	const { data } = await axios.post(url, { password });
            // 	setMsg(data.message);
            // 	setError("");
            // 	window.location = "/login";
            // } catch (error) {
            // 	if (
            // 		error.response &&
            // 		error.response.status >= 400 &&
            // 		error.response.status <= 500
            // 	) {
            // 		setError(error.response.data.message);
            // 		setMsg("");
            // 	}
            // }
        }
    };
    return (
        <Fragment>
            {validUrl ? (
                <div className={cx('container')}>
                    <form className={cx('form_container')} onSubmit={handleSubmit}>
                        <h2>Cập nhật mật khẩu</h2>
                        <span className={cx('title')}>Hãy nhập mật khẩu mới cho tài khoản của bạn</span>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '70px' }}>
                            <div className={cx('container-pass')}>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="Mật khẩu"
                                    name="password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    className={cx('inputInfo')}
                                />
                                {showPass ? (
                                    <FaEye className={cx('eye-icon')} onClick={handleShowAndHidePass} />
                                ) : (
                                    <FaEyeSlash className={cx('eye-icon')} onClick={handleShowAndHidePass} />
                                )}
                            </div>
                            <span className={cx('text-validate')}>{textValidatePass}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '70px', marginTop: '10px'}}>
                            <div className={cx('container-pass')}>
                                <input
                                    type={showConfirmPass ? 'text' : 'password'}
                                    placeholder="Xác nhận lại mật khẩu"
                                    name="confirmPassword"
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                    className={cx('inputInfo')}
                                />
                                {showConfirmPass ? (
                                    <FaEye className={cx('eye-icon')} onClick={handleShowAndHideConfirmPass} />
                                ) : (
                                    <FaEyeSlash className={cx('eye-icon')} onClick={handleShowAndHideConfirmPass} />
                                )}
                            </div>

                            <span className={cx('text-validate')}>{textValidateConfirmPass}</span>
                        </div>

                        {error && <div className={cx('error_msg')}>{error}</div>}
                        {msg && <div className={cx('success_msg')}>{msg}</div>}
                        <button type="submit" className={cx('green_btn')}>
                            Xác nhận
                        </button>
                    </form>
                </div>
            ) : (
                <h1 className={cx('not-found')}>404 Not Found</h1>
            )}
        </Fragment>
    );
}

export default ResetPassword;
