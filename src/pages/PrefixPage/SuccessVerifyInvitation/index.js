import React, { useEffect, useState, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SuccessVerify.module.scss';
import axios from 'axios';
import baseURL from '~/utils/baseURL';
import success from '~/assets/images/success.png';

const cx = classNames.bind(styles);

function SuccessVerifyInvitation() {
    const [validUrl, setValidUrl] = useState(null);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `${baseURL}/campaign/team/${param.tokenLinkInvitation}`;
                const res = await axios.get(url);
                console.log(res.data.data);
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
                    <h1>Bạn đã tham gia vào chiến dịch</h1>
                    <Link to="/">
                        <button className={cx('green_btn')}>Quay về trang chủ</button>
                    </Link>
                </>
            )}
            {validUrl === false && <h1 className={cx('not-found')}>404 Not Found</h1>}
        </div>
    );
}

export default SuccessVerifyInvitation;
