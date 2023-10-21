import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailProject.module.scss';
import {
    AiFillFacebook,
    AiFillTwitterSquare,
    AiOutlineLink,
    AiOutlineHeart,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
} from 'react-icons/ai';
const cx = classNames.bind(styles);

function DetailProject() {
    const list = [
        'https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/t5ltmektuea0yjyzl2ys',
        'https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/yqxxjgfrnpq7iiju8esh',
        'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/yoplhl0i317mzih1rf0t',
        'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/wab1pxz7mlqcmfftzgye',
        'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/ylhzgkgngqd30nryfdjv',
        'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/ghsl6mhupu7yw8ubyddk',
        'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/wab1pxz7mlqcmfftzgye',
        'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/ylhzgkgngqd30nryfdjv',
        'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/ghsl6mhupu7yw8ubyddk',
    ];
    const [indexImage, setIndexImage] = useState(0);

    return (
        <div className={cx('container-main')}>
            <div className={cx('container-1')}>
                <div className={cx('container-left')}>
                    <div className={cx('container-list-big')}>
                        <img
                            style={{ width: '100%', height: '100%', borderRadius: '6px' }}
                            src={list[indexImage]}
                            alt="sp"
                        />
                    </div>
                    <div className={cx('container-list-small')}>
                        <AiOutlineDoubleLeft
                            className={cx('icon-slider')}
                            style={{ display: list.length < 6 && 'none', opacity: indexImage === 0 && '0.6', pointerEvents: indexImage === 0 && 'none'}}
                            onClick={() => setIndexImage((prev) => prev - 1)}
                        />

                        <div style={{ overflow: 'hidden'}}>
                            <div
                                style={{
                                    flexWrap: 'nowrap',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: list.length < 6 ? '100%' : '468px',
                                    justifyContent: list.length > 6 ? 'flex-start' : 'center',
                                    transform:
                                        indexImage - 5 > 0
                                            ? 'translateX(-' + (indexImage - 5) * 80 + 'px)'
                                            : 'translateX(0px)',
                                }}
                            >
                                {list.map((item, index) => {
                                    return (
                                        <img
                                            key={index}
                                            style={{
                                                width: '70px',
                                                height: '60px',
                                                borderRadius: '6px',
                                                margin: '0 4px',
                                                border: index === indexImage && '2px solid #000',
                                            }}
                                            src={item}
                                            alt="sp"
                                            onClick={() => setIndexImage(index)}
                                            className={cx('noselect')}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <AiOutlineDoubleRight
                            className={cx('icon-slider')}
                            style={{ display: list.length < 6 && 'none', opacity: indexImage === list.length -1 && '0.6', pointerEvents: indexImage === list.length -1 && 'none'}}
                            onClick={() => setIndexImage((prev) => prev + 1)}
                        />
                    </div>
                </div>
                <div className={cx('container-right')}>
                    <p style={{ color: '#088366', fontSize: '18px', fontWeight: '600'}}>FUNDING</p>
                    <p style={{ color: '#2a2a2a', fontSize: '30px', fontWeight: '600' }}>
                        The LUMA Collection by GOMATIC X Peter McKinnon
                    </p>
                    <p style={{ color: '#2a2a2a', fontSize: '16px', marginTop: '20px' }}>
                        Where design meets the demands of modern photography. Where design meets the demands of modern
                        photography.Where design meets the demands of modern photography. Where design meets the demands
                        of modern photography.
                    </p>
                    <div style={{ display: 'flex', marginLeft: '10px', marginTop: '20px' }}>
                        <img
                            style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                            src="https://g0.iggcdn.com/assets/individuals/missing/thumbnail-deaf450c2d4183b9309b493f6a7b20d62f8d31617ec828d060df465abe92ef2a.png"
                            alt="avt"
                        />
                        <div style={{ marginLeft: '12px' }}>
                            <a href="" style={{ fontWeight: '600', fontSize: '18px' }}>
                                Jacob Durham
                            </a>
                            <div style={{ display: 'flex' }}>
                                <span>2 Campaigns</span>
                                <div
                                    style={{
                                        margin: '0 5px',
                                        width: '1.5px',
                                        backgroundColor: '#231823',
                                        height: '20px',
                                    }}
                                ></div>
                                <span>SALT LAKE CITY, United States</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '24px',
                                padding: '0 4px',
                            }}
                        >
                            <b style={{ fontWeight: '500' }}>
                                $6.946 <span style={{ fontWeight: '300', fontSize: '18px' }}>USD</span>
                            </b>
                            <b style={{ fontWeight: '500', fontSize: '20px' }}>
                                27 <span style={{ fontWeight: '300', fontSize: '18px' }}>backers</span>
                            </b>
                        </div>
                        <div
                            style={{
                                height: '14px',
                                backgroundColor: '#34ca96',
                                borderRadius: '10px',
                                margin: '6px 0',
                            }}
                        ></div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '18px',
                                padding: '0 4px',
                                fontWeight: '300',
                            }}
                        >
                            <span>
                                139% of $5000 <b style={{ marginLeft: '6px', fontWeight: '500' }}>Flexible Goal</b>
                            </span>
                            <b style={{ fontWeight: '500', fontSize: '20px' }}>
                                24 <span style={{ fontWeight: '300', fontSize: '18px' }}>days left</span>
                            </b>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <button className={cx('hover-btn')} type="button">
                                SEE OPTIONS
                            </button>
                            <button className={cx('hover-btn')} type="button" style={{ margin: '0 10px' }}>
                                <AiOutlineHeart style={{ color: '#fff', fontSize: '20px' }} /> FOLLOW
                            </button>
                        </div>
                        <div>
                            <AiFillFacebook className={cx('icon-link')} />
                            <AiFillTwitterSquare className={cx('icon-link')} />
                            <AiOutlineLink className={cx('icon-link')} />
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default DetailProject;
