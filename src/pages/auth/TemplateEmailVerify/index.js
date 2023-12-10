import React, { useEffect, useState, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './TemplateEmailVerify.module.scss';
import axios from 'axios';

import success from '~/assets/images/success.png';

const cx = classNames.bind(styles);

function TemplateEmailVerify() {
    const [validUrl, setValidUrl] = useState(null);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:5000/user/${param.id}/verify/${param.tokenLinkVerifyEmail}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <div className={cx('container')}>
            {validUrl && (
                <>
                    <img src={success} alt="success_img" className={cx('success_img')} />
                    <h1>Email đã được xác thực thành công</h1>
                    <Link to="/login">
                        <button className={cx('green_btn')}>Đăng nhập</button>
                    </Link>
                </>
            )}
            {validUrl === false && <h1 className={cx('not-found')}>404 Not Found</h1>}
        </div>
    );
}

export default TemplateEmailVerify;
