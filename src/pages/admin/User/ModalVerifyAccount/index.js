import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalVerifyAccount.module.scss';
import TextAreaAutoSize from 'react-textarea-autosize';

const cx = classNames.bind(styles);

function ModalVerifyAccount() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('modal')}>
                <div className={cx('header-modal')}>
                    <span className={cx('title')}>Xác minh thông tin tài khoản</span>
                    <span className={cx('close')}>&times;</span>
                </div>

                <div className={cx('separate')}></div>

                <div className={cx('content-modal')}>
                    <div className={cx('content-left')}>
                        <div className={cx('container-input')}>
                            <span className={cx('title')}>
                                Họ tên <span style={{ color: 'red' }}>*</span>
                            </span>
                            <input type="text" placeholder='Nhập họ và Tên'/>
                            <span className={cx('text-validate')}>Vui lòng nhập đầy đủ thông tin</span>
                        </div>

                        <div className={cx('container-input')}>
                            <span className={cx('title')}>
                                Số điện thoại <span style={{ color: 'red' }}>*</span>
                            </span>
                            <input type="number" placeholder='Nhập số điện thoại'/>
                            <span className={cx('text-validate')}>Vui lòng nhập đầy đủ thông tin</span>
                        </div>

                        <div className={cx('container-input')}>
                            <span className={cx('title')}>
                                Ngày sinh <span style={{ color: 'red' }}>*</span>
                            </span>
                            <input type="date" />
                            <span className={cx('text-validate')}>Vui lòng nhập đầy đủ thông tin</span>
                        </div>

                        <div className={cx('container-input')}>
                            <span className={cx('title')}>
                                Quê quán <span style={{ color: 'red' }}>*</span>
                            </span>
                            <TextAreaAutoSize className={cx('input-autosize')} placeholder='Nhập thông tin quê quán'/>
                            <span className={cx('text-validate')}>Vui lòng nhập đầy đủ thông tin</span>
                        </div>
                    </div>
                    <div className={cx('content-right')}>
                        <div className={cx('container-input')}>
                            <span className={cx('title')}>
                                Số CCCD/ID Card <span style={{ color: 'red' }}>*</span>
                            </span>
                            <input type="number" placeholder='Nhập số CCCD / ID Card'/>
                            <span className={cx('text-validate')}>Vui lòng nhập đầy đủ thông tin</span>
                        </div>

                        <div className={cx('container-img')}>
                            <span className={cx('title')}>
                                Ảnh chụp mặt trước căn cước công dân <span style={{ color: 'red' }}>*</span>
                            </span>
                            <div className={cx('frame-img')}>
                                <img
                                    src="https://png.pngtree.com/thumb_back/fw800/background/20230616/pngtree-ai-robot-engaged-in-computational-thinking-3d-render-image_3618128.jpg"
                                    alt="img"
                                />
                            </div>
                            <div className={cx('btn-add')}>Thêm ảnh</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={cx('btn-confirm')}>XÁC NHẬN</div>
                </div>
            </div>
        </div>
    );
}

export default ModalVerifyAccount;
