import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalDetailReport.module.scss';
import { RiImageAddFill } from 'react-icons/ri';
import { AiFillCloseCircle } from 'react-icons/ai';
import TextareaAutosize from 'react-textarea-autosize';
import { BsFillSendFill } from 'react-icons/bs';
const cx = classNames.bind(styles);

function ModalDetailReport() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('modal')}>
                <div className={cx('header')}>
                    <div className={cx('info-user')}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vWHjatimRMCENuZGo1-EAb5-Vs8QWHuVgg&usqp=CAU"
                            alt="img"
                        />
                        <div className={cx('info-detail')}>
                            <span className={cx('name')}>Phan Trọng Tính</span>
                            <span className={cx('email')}>phantrongtinh@gmail.com</span>
                        </div>
                    </div>
                    <span className={cx('close')}>&times;</span>
                </div>

                <div className={cx('container-body')}>
                    <div className={cx('container-report')}>
                        <div>
                            <span className={cx('topic')}>
                                SỰ CỐ CHẬM TRỄ CỦA QUÀ TẶNG CỦA CHIẾN DỊCH KHÔNG ĐÚNG NHƯ THỜI GIAN ĐÃ HIỆN THỊ TRÊN
                                WEBSITE
                            </span>
                        </div>
                        <div className={cx('separate-topic')}></div>
                        <span style={{ fontStyle: 'italic', fontSize: '14px' }}>** Nội dung báo cáo vi phạm</span>
                        <div className={cx('content-report')}>
                            <div className={cx('list-image-report')}>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vWHjatimRMCENuZGo1-EAb5-Vs8QWHuVgg&usqp=CAU"
                                    alt="img"
                                />
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vWHjatimRMCENuZGo1-EAb5-Vs8QWHuVgg&usqp=CAU"
                                    alt="img"
                                />
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vWHjatimRMCENuZGo1-EAb5-Vs8QWHuVgg&usqp=CAU"
                                    alt="img"
                                />
                            </div>
                            <div className={cx('text-report')}>
                                Tôi có ủng hộ quyên góp cho chiến dịch "Xây dựng tấm pin năng lượng mặt trời bảo vệ môi
                                trường" của chủ sở hữu Huỳnh Ngọc Tính và có cam kết nhận được quà tặng vào ngày
                                25/12/2023 nhưng đã hơn 2 ngày tôi chưa nhận được.
                            </div>
                            <span className={cx('date-report')}>27/12/2023</span>
                        </div>
                    </div>

                    <div className={cx('container-response')}>
                        <span style={{fontStyle: 'italic', fontSize: '14px', textAlign: 'right', width: '100%'}}>** Nội dung phản hồi</span>
                        <div className={cx('content-response')}>
                            <div className={cx('list-image-response')}>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vWHjatimRMCENuZGo1-EAb5-Vs8QWHuVgg&usqp=CAU"
                                    alt="img"
                                />
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vWHjatimRMCENuZGo1-EAb5-Vs8QWHuVgg&usqp=CAU"
                                    alt="img"
                                />
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vWHjatimRMCENuZGo1-EAb5-Vs8QWHuVgg&usqp=CAU"
                                    alt="img"
                                />
                            </div>
                            <div className={cx('text-response')}>
                                Tôi có ủng hộ quyên góp cho chiến dịch "Xây dựng tấm pin năng lượng mặt trời bảo vệ môi
                                trường" của chủ sở hữu Huỳnh Ngọc Tính và có cam kết nhận được quà tặng vào ngày
                                25/12/2023 nhưng đã hơn 2 ngày tôi chưa nhận được.
                            </div>
                            <span className={cx('date-response')}>27/12/2023</span>
                        </div>
                    </div>
                </div>

                <span className={cx('text-validate')}>Vui lòng nhập đủ thông tin</span>

                <div>
                    <div className={cx('content-body')}>
                        <div className={cx('content-report')}>
                            {/* {images.map((item, index) => {
                                return (
                                    <div className={cx('list-images')} key={index}>
                                        <img src={item.url} alt={item.name} />
                                        <AiFillCloseCircle
                                            className={cx('delete-img')}
                                            onClick={() => deleteImage(index)}
                                        />
                                    </div>
                                );
                            })} */}
                            <div className={cx('list-images')}>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vWHjatimRMCENuZGo1-EAb5-Vs8QWHuVgg&usqp=CAU"
                                    alt="img"
                                />
                                <AiFillCloseCircle className={cx('delete-img')} />
                            </div>
                            <TextareaAutosize className={cx('input-text')} placeholder="Nhập nội dung..." />
                        </div>

                        <div className={cx('button-img')}>
                            <RiImageAddFill className={cx('choose-images')} />
                        </div>
                        <input type="file" name="file" multiple hidden />
                        <div className={cx('button-img')}>
                            <BsFillSendFill size={24} />
                        </div>
                    </div>
                </div>

                <div className={cx('btn-res')}>ĐÃ PHẢN HỒI</div>
            </div>
        </div>
    );
}

export default ModalDetailReport;
