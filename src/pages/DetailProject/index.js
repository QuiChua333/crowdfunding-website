import React, { useEffect, useState } from 'react';
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
import ModalPerk from './ModalPerk';
import Footer from '~/components/Layout/components/Footer';
import PerkItem from '~/components/Layout/components/PerkItem';
import ModalOptionPerk from './ModalOptionPerk';

const cx = classNames.bind(styles);

function DetailProject() {

    const project = {
        id: 'project1',
        nameProject: 'The LUMA Collection by GOMATIC X Peter McKinnon',
        desProject: 'Where design meets the demands of modern photography. Where design meets the demands of modern photography.Where design meets the demands of modern photography. Where design meets the demands of modern photography.',
        author: {
            avatar: 'https://g0.iggcdn.com/assets/individuals/missing/thumbnail-deaf450c2d4183b9309b493f6a7b20d62f8d31617ec828d060df465abe92ef2a.png',
            name: 'Jacob Durham',
            campaigns: 2,
            address: 'SALT LAKE CITY, United States',
        },
        targetMoney: 5000,
        totalFund: 6946,
        backers: 27,
        dayLeft: 24,
        listImageProject: [
            {
                url: 'https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/t5ltmektuea0yjyzl2ys',
                isImage: true,
            },
            {
                url: 'https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/yqxxjgfrnpq7iiju8esh',
                isImage: true,
            },
            {
                url: 'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/wab1pxz7mlqcmfftzgye',
                isImage: true,
            },
            {
                url: 'https://www.youtube.com/embed/_wlAipsg4kg',
                isImage: false,
            },
            {
                url: 'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/ghsl6mhupu7yw8ubyddk',
                isImage: true,
            },
            {
                url: 'https://www.youtube.com/embed/_wlAipsg4kg',
                isImage: false,
            },
            {
                url: 'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/wab1pxz7mlqcmfftzgye',
                isImage: true,
            },
            {
                url: 'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/ylhzgkgngqd30nryfdjv',
                isImage: true,
            },
            {
                url: 'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_1.3,f_auto,h_460/ghsl6mhupu7yw8ubyddk',
                isImage: true,
            },
        ],
        listPerk: [
            {
                id: 'perk1',
                image: 'https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_762,g_center,q_auto:best,dpr_1.3,f_auto,h_506/mtixazdzdtgna6xcucwv',
                name: 'Camera Sling 9L - Early Bird',
                price: 95,
                des: 'Save $25 by ordering today on Indiegogo. SHIPPING, VAT & DUTIES: Please note that the shipping fee covers ALL applicable shipping, VAT, and duties. You will not need pay any fees upon arrival. WANT TO ADD MORE ITEMS? If youd like to add other bags to your order you can do so on the following page after selecting this perk.',
                includeItems: [
                    {
                        name: 'Camera Sling 9L',
                        options: [
                            {
                                name: 'Color',
                                itemsOption: ['Black', 'White', 'Gray'],
                            },
                            {
                                name: 'Size',
                                itemsOption: ['X', 'XL', '2xL'],
                            }
                        ],
                        // optionsSelected: [{name: '', value: ''}]
                    }
                ],
                claimed: 10,
                quantity: 24,
                estimateShipping: 'December 2023',
                idProject: 'project1'
            },
            {
                id: 'perk2',
                image: 'https://c2.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_762,g_center,q_auto:best,dpr_1.3,f_auto,h_506/qnop6zs3pd2fozxak09u',
                name: 'Camera Sling 12L - Early Bird',
                price: 115,
                des: 'Save $25 by ordering today on Indiegogo. SHIPPING, VAT & DUTIES: Please note that the shipping fee covers ALL applicable shipping, VAT, and duties. You will not need pay any fees upon arrival. WANT TO ADD MORE ITEMS? If youd like to add other bags to your order you can do so on the following page after selecting this perk.',
                includeItems: [
                    {
                        name: 'Camera Sling 12L',
                        options: [
                            {
                                name: 'Color',
                                itemsOption: ['Black', 'Stone', 'Sage', 'Rust'],
                            }
                        ]
                    }
                ],
                claimed: 8,
                quantity: 19,
                estimateShipping: 'October 2023',
                idProject: 'project1'
            },
            {
                id: 'perk3',
                image: 'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_762,g_center,q_auto:best,dpr_1.3,f_auto,h_506/cyhnaum5uqrshdb4qbgr',
                name: 'Camera Sling 18L - Early Bird',
                price: 185,
                des: 'Save $35 by ordering today on Indiegogo. SHIPPING, VAT & DUTIES: Please note that the shipping fee covers ALL applicable shipping, VAT, and duties. You will not need pay any fees upon arrival. WANT TO ADD MORE ITEMS? If youd like to add other bags to your order you can do so on the following page after selecting this perk.',
                includeItems: [
                    {
                        name: 'Camera Sling 18L',
                        options: [
                            {
                                name: 'Color',
                                itemsOption: ['Black', 'Stone', 'Sage', 'Rust'],
                            }
                        ]
                    }
                ],
                claimed: 8,
                quantity: 19,
                estimateShipping: 'September 2023',
                idProject: 'project1'
            },
            {
                id: 'perk4',
                image: 'https://c2.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_762,g_center,q_auto:best,dpr_1.3,f_auto,h_506/dhtcxfnltlwrbwgwfxnd',
                name: 'One of Each Bag',
                price: 385,
                des: 'Save $95 by ordering today on Indiegogo. SHIPPING, VAT & DUTIES: Please note that the shipping fee covers ALL applicable shipping, VAT, and duties. You will not need pay any fees upon arrival. WANT TO ADD MORE ITEMS? If youd like to add other bags to your order you can do so on the following page after selecting this perk.',
                includeItems: [
                    {
                        name: 'Camera Sling 9L',
                        options: [
                            {
                                name: 'Color',
                                itemsOption: ['Black', 'Stone', 'Sage', 'Rust'],
                            }
                        ]
                    },
                    {
                        name: 'Camera Sling 12L',
                        options: [
                            {
                                name: 'Color',
                                itemsOption: ['Black', 'Stone', 'Sage', 'Rust'],
                            }
                        ]
                    },
                    {
                        name: 'Camera Sling 18L',
                        options: [
                            {
                                name: 'Color',
                                itemsOption: ['Black', 'Stone', 'Sage', 'Rust'],
                            }
                        ]
                    },
                ],
                claimed: 7,
                quantity: 19,
                estimateShipping: 'July 2023',
                idProject: 'project1'
            },
        ]
    }
    const [ItemProject, setItemProject] = useState(project);
    const [indexImage, setIndexImage] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [indexTabHeader, setIndexTabHeader] = useState(1);
    const [isOpenModalOption, setIsOpenModalOption] = useState(false); 
    const [perkInModal,setPerkInModal] = useState(false);
    const [itemPerkSelected, setItemPerkSelected] = useState({})
    useEffect(() => {
        setItemProject(project);
    }, {});

    const handleURLImage = (linkURL) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = linkURL.match(regExp);
        return (match&&match[7].length==11)? 'https://img.youtube.com/vi/' + match[7] + '/default.jpg' : false;
    }

    return (
        <div className={cx('container-main')}>
            <div className={cx('container-1')}>
                <div className={cx('container-left')}>
                    <div className={cx('container-list-big')}>
                    {ItemProject.listImageProject[indexImage].isImage ? (<img
                            style={{ width: '100%', height: '100%', borderRadius: '6px' }}
                            src={ItemProject.listImageProject[indexImage].url}
                            alt="sp"
                        />) : (<iframe
                            style={{ width: '100%', height: '100%', borderRadius: '6px' }}
                            src={ItemProject.listImageProject[indexImage].url}
                            alt="sp"
                        />)}
                        
                    </div>
                    <div className={cx('container-list-small')}>
                        <AiOutlineDoubleLeft
                            className={cx('icon-slider')}
                            style={{
                                display: ItemProject.listImageProject.length < 6 && 'none',
                                opacity: indexImage === 0 && '0.6',
                                pointerEvents: indexImage === 0 && 'none',
                            }}
                            onClick={() => setIndexImage((prev) => prev - 1)}
                        />

                        <div style={{ overflow: 'hidden' }}>
                            <div
                                style={{
                                    flexWrap: 'nowrap',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: ItemProject.listImageProject.length < 6 ? '100%' : '468px',
                                    justifyContent: ItemProject.listImageProject.length > 6 ? 'flex-start' : 'center',
                                    transform:
                                        indexImage - 5 > 0
                                            ? 'translateX(-' + (indexImage - 5) * 80 + 'px)'
                                            : 'translateX(0px)',
                                }}
                            >
                                {ItemProject.listImageProject.map((item, index) => {
                                    return (
                                        <img
                                            key={index}
                                            style={{
                                                width: '70px',
                                                height: '60px',
                                                borderRadius: '6px',
                                                margin: '0 4px',
                                                border: index === indexImage && '3px solid #000',
                                            }}
                                            src={item.isImage ? item.url : handleURLImage(item.url)}
                                            alt="sp"
                                            onClick={() => setIndexImage(index)}
                                            className={cx('noselect')}
                                        />
                                    ) 
                                })}
                            </div>
                        </div>
                        <AiOutlineDoubleRight
                            className={cx('icon-slider')}
                            style={{
                                display: ItemProject.listImageProject.length < 6 && 'none',
                                opacity: indexImage === ItemProject.listImageProject.length - 1 && '0.6',
                                pointerEvents: indexImage === ItemProject.listImageProject.length - 1 && 'none',
                            }}
                            onClick={() => setIndexImage((prev) => prev + 1)}
                        />
                    </div>
                </div>
                <div className={cx('container-right')}>
                    <p style={{ color: '#088366', fontSize: '18px', fontWeight: '600' }}>FUNDING</p>
                    <p style={{ color: '#2a2a2a', fontSize: '30px', fontWeight: '600' }}>{ItemProject.nameProject}</p>
                    <p style={{ color: '#2a2a2a', fontSize: '16px', marginTop: '20px' }}>{ItemProject.desProject}</p>
                    <div style={{ display: 'flex', marginLeft: '10px', marginTop: '20px' }}>
                        <img
                            style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                            src={ItemProject.author.avatar}
                            alt="avt"
                        />
                        <div style={{ marginLeft: '12px' }}>
                            <a href="" style={{ fontWeight: '600', fontSize: '18px' }}>{ItemProject.author.name}</a>
                            <div style={{ display: 'flex' }}>
                                <span>{ItemProject.author.campaigns} Campaigns</span>
                                <div
                                    style={{
                                        margin: '0 5px',
                                        width: '1.5px',
                                        backgroundColor: '#231823',
                                        height: '20px',
                                    }}
                                ></div>
                                <span>{ItemProject.author.address}</span>
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
                                ${ItemProject.totalFund} <span style={{ fontWeight: '300', fontSize: '18px' }}>USD</span>
                            </b>
                            <b style={{ fontWeight: '500', fontSize: '20px' }}>
                            {ItemProject.backers} <span style={{ fontWeight: '300', fontSize: '18px' }}>backers</span>
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
                                {ItemProject.totalFund/ItemProject.targetMoney * 100}% of ${ItemProject.targetMoney} <b style={{ marginLeft: '6px', fontWeight: '500' }}>Flexible Goal</b>
                            </span>
                            <b style={{ fontWeight: '500', fontSize: '20px' }}>
                            {ItemProject.dayLeft} <span style={{ fontWeight: '300', fontSize: '18px' }}>days left</span>
                            </b>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <button className={cx('hover-btn')} type="button" onClick={() => {setPerkInModal(true);setIsOpenModal(true)}}>
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

            <div style={{ position: 'relative', height: 'auto', display: 'flex', margin: '20px 130px' }}>
                <div style={{ width: '70%', height: 'auto'}}>
                    <div style={{height: 'auto', marginBottom: '16px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '20px 0'}}>
                        <span className={cx('item-tab-header', {'item-tab-header-clicked': indexTabHeader === 1})} onClick={() => setIndexTabHeader(1)}>STORY</span>
                        <span className={cx('item-tab-header',{'item-tab-header-clicked': indexTabHeader === 2})} onClick={() => setIndexTabHeader(2)}>FAQ</span>
                        <div className={cx('item-tab-header',{'item-tab-header-clicked': indexTabHeader === 3})} onClick={() => setIndexTabHeader(3)}>
                            <span>UPDATES</span>
                            <span style={{fontSize: '9px', textAlign: 'center', backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '40%', marginLeft: '8px', fontWeight: '700'}}>1</span>
                        </div>
                        <div className={cx('item-tab-header',{'item-tab-header-clicked': indexTabHeader === 4})} onClick={() => setIndexTabHeader(4)}>
                            <span>DISCUSSION</span>
                            <span style={{fontSize: '9px', textAlign: 'center', backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '40%', marginLeft: '8px', fontWeight: '700'}}>435</span>
                        </div>
                    </div>

                    <div style={{height: '20000px', backgroundColor: 'red'}}>
                        {
                            indexTabHeader === 1 && <>1</>
                        }
                        {
                            indexTabHeader === 2 && <>2</>
                        }
                        {
                            indexTabHeader === 3 && <>3</>
                        }
                        {
                            indexTabHeader === 4 && <>4</>
                        }
                    </div>
                </div>
                    
                <div style={{ width: '30%', height: 'auto', display: 'flex', flexDirection: 'column', padding: '20px' }}>
                    <div style={{ position: 'sticky', top: '20px' }}>
                        <p style={{ fontSize: '19px', fontWeight: '500', marginLeft: '10px' }}>Select an option</p>
                        <div style={{ maxHeight: '920px', overflowY: 'scroll' }}>
                            {ItemProject.listPerk.map((item, index) => {
                                return <PerkItem setItemPerkSelected={setItemPerkSelected} index={index} item={item} key={index} isPage={true} setIsOpenModalOption={setIsOpenModalOption} closePerkModal={() => setIsOpenModal(false)} setPerkInModal={setPerkInModal} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {isOpenModalOption && <ModalOptionPerk itemPerk={itemPerkSelected} close={() => setIsOpenModalOption(false)} setIsOpenModal={setIsOpenModal} perkInModal={perkInModal}/>}
            {isOpenModal && <ModalPerk setItemPerkSelected={setItemPerkSelected} listPerk={ItemProject.listPerk} close={() => setIsOpenModal(false)}  setIsOpenModalOption = {setIsOpenModalOption} setPerkInModal={setPerkInModal}/>}
        </div>
    );
}

export default DetailProject;
