import React, { useEffect, useState, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './TemplateEmailVerify.module.scss';
import axios from 'axios';
import customAxios from '~/utils/customAxios'
import PageNotFound from '~/pages/PrefixPage/PageNotFound';
import success from '~/assets/images/success.png';
import baseURL from '~/utils/baseURL';

const cx = classNames.bind(styles);

function TemplateEmailVerify() {
    const [validUrl, setValidUrl] = useState(null);
    const param = useParams();
    const verifyEmailUrl = async () => {
            try {
                const url = `${baseURL}/user/registerUser/${param.tokenLinkVerifyEmail}`;
                const { data } = await customAxios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        }
    
    useEffect(() => {
        verifyEmailUrl();
    }, []);
    
    return (
        <div>
            {validUrl && (
                <div className={cx('container')}>
                    <img src={success} alt="success_img" className={cx('success_img')} />
                    <h1>Email đã được xác thực thành công</h1>
                    <Link to="/login">
                        <button className={cx('green_btn')}>Đăng nhập</button>
                    </Link>
                </div>
            )}
            {validUrl === false && <PageNotFound />}
        </div>
    );
}

export default TemplateEmailVerify;
