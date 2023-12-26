import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailProject.module.scss';
import baseUrl from '../../../utils/baseURL';
import defaultAvatar from '~/assets/images/defaultAvt.png';
import formatMoney from '~/utils/formatMoney.js';
import ProgressBar from '@ramonak/react-progress-bar';
import { AiOutlineHeart, AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import ModalPerk from './ModalPerk';
import Footer from '~/components/Layout/components/Footer';
import PerkItem from '~/components/Layout/components/PerkItem';
import ModalOptionPerk from './ModalOptionPerk';
import { useParams } from 'react-router-dom';
import formatPercent from '~/utils/formatPercent';
import formatDate from '~/utils/formatDate';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from './Dropdown';
import customAxios from '~/utils/customAxios';
import ModalTeamMembersDetail from './ModalTeamMembersDetail';
import ModalReport from './ModalReport';
const cx = classNames.bind(styles);

function DetailProject() {
    const { id } = useParams();
    const [isOpenModalMember, setIsOpenModalMember] = useState(false);
    const [isOpenModalReport, setIsOpenModalReport] = useState(false);
    const [ItemProject, setItemProject] = useState({});
    const [listPerkByCampaignId, setListPerkByCampaignId] = useState([]);
    const [quantityPeople, setQuantityPeople] = useState(0);
    const [money, setMoney] = useState(0);
    const [members, setMembers] = useState([]);
    const [indexImage, setIndexImage] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [indexTabHeader, setIndexTabHeader] = useState(1);
    const [isOpenModalOption, setIsOpenModalOption] = useState(false);
    const [perkInModal, setPerkInModal] = useState(false);
    const [itemPerkSelected, setItemPerkSelected] = useState({});
    const [quantityCampaignOfUser, setQuantityCampaignOfUser] = useState(1);
    const [openDropDown, setOpenDropDown] = useState(false);
    const docElement = useRef(null);




    useEffect(() => {
        function handleClickOutside(event) {
            if (docElement.current && !docElement.current.contains(event.target)) {
                setOpenDropDown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [docElement]);

    const project = {
        id: 'project1',
        nameProject: 'The LUMA Collection by GOMATIC X Peter McKinnon',
        desProject:
            'Where design meets the demands of modern photography. Where design meets the demands of modern photography.Where design meets the demands of modern photography. Where design meets the demands of modern photography.',
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
                url: ItemProject.imageDetailPage?.url || '',
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
                            },
                        ],
                        // optionsSelected: [{name: '', value: ''}]
                    },
                ],
                claimed: 10,
                quantity: 10,
                estimateShipping: 'December 2023',
                idProject: 'project1',
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
                    },
                ],
                claimed: 8,
                quantity: 19,
                estimateShipping: 'October 2023',
                idProject: 'project1',
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
                            },
                        ],
                    },
                ],
                claimed: 8,
                quantity: 19,
                estimateShipping: 'September 2023',
                idProject: 'project1',
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
                            },
                        ],
                    },
                    {
                        name: 'Camera Sling 12L',
                        options: [
                            {
                                name: 'Color',
                                itemsOption: ['Black', 'Stone', 'Sage', 'Rust'],
                            },
                        ],
                    },
                    {
                        name: 'Camera Sling 18L',
                        options: [
                            {
                                name: 'Color',
                                itemsOption: ['Black', 'Stone', 'Sage', 'Rust'],
                            },
                        ],
                    },
                ],
                claimed: 7,
                quantity: 19,
                estimateShipping: 'July 2023',
                idProject: 'project1',
            },
        ],
    };
    const getListPerksByCampaignId = async () => {
        try {
            const config = {};
            const { data } = await customAxios.get(`${baseUrl}/perk/getPerksHasListItemsByCampaignId/${id}`, config);
            setListPerkByCampaignId([...data.data]);
        } catch (error) {
            console.log(error);
        }
    };
    const getProjectById = async () => {
        try {
            const config = {};
            const { data } = await customAxios.get(`${baseUrl}/campaign/getCampaignById/${id}`, config);
            setItemProject({ ...data.data });
        } catch (error) {
            console.log(error);
        }
    };
    const getQuantityCampaignOfUser = async () => {
        try {
            const config = {};
            const { data } = await customAxios.get(`${baseUrl}/campaign/getQuantityCampaignByUser/${id}`, config);
            setQuantityCampaignOfUser(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getQuantityPeople = async () => {
        try {
            const config = {};
            const { data } = await customAxios.get(`${baseUrl}/contribution/getQuantityPeopleByCampaign/${id}`, config);
            setQuantityPeople(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getMoney = async () => {
        try {
            const config = {};
            const { data } = await customAxios.get(`${baseUrl}/contribution/getMoneyByCampaign/${id}`, config);
            setMoney(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getTeam = async () => {
        try {
            const { data } = await customAxios.get(`${baseUrl}/campaign/getTeamMember/${id}`);
            setMembers([...data.data]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProjectById();
        getQuantityCampaignOfUser();
        getListPerksByCampaignId();
        getDeadline();
        getQuantityPeople();
        getMoney();
        getTeam();
    }, []);

    const handleURLImage = (linkURL) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = linkURL.match(regExp);
        return match && match[7].length == 11 ? 'https://img.youtube.com/vi/' + match[7] + '/default.jpg' : false;
    };

    const formatMMDDYYYY = (tem) => {
        var date = tem;
        var datearray = date.split('/');
        var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
        return newdate.toString();
    };
    const getDeadline = () => {
        let date1 = new Date();
        let date2 = ItemProject.startDate;

        date1 = formatMMDDYYYY(formatDate(date1).toString());
        date2 = formatMMDDYYYY(formatDate(date2).toString());

        date1 = new Date(date1.toString());
        date2 = new Date(date2.toString());

        let quantityDate = date1.getTime() - date2.getTime();

        let temp = Math.ceil(quantityDate / (1000 * 3600 * 24));

        let res = ItemProject.duration - temp;

        return res > 0 ? res : 0;
    };

    return (
        <div className={cx('container-main')}>
            <div className={cx('container-1')}>
                <div className={cx('container-left')}>
                    <div className={cx('container-list-big')}>
                        {project.listImageProject[indexImage].isImage ? (
                            <img
                                style={{ width: '100%', height: '100%', borderRadius: '6px' }}
                                src={project.listImageProject[indexImage].url}
                                alt="sp"
                            />
                        ) : (
                            <iframe
                                style={{ width: '100%', height: '100%', borderRadius: '6px' }}
                                src={project.listImageProject[indexImage].url}
                                alt="sp"
                            />
                        )}
                    </div>
                    <div className={cx('container-list-small')}>
                        <AiOutlineDoubleLeft
                            className={cx('icon-slider')}
                            style={{
                                display: project.listImageProject.length < 6 && 'none',
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
                                    width: project.listImageProject.length < 6 ? '100%' : '468px',
                                    justifyContent: project.listImageProject.length > 6 ? 'flex-start' : 'center',
                                    transform:
                                        indexImage - 5 > 0
                                            ? 'translateX(-' + (indexImage - 5) * 80 + 'px)'
                                            : 'translateX(0px)',
                                }}
                            >
                                {project.listImageProject.map((item, index) => {
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
                                    );
                                })}
                            </div>
                        </div>
                        <AiOutlineDoubleRight
                            className={cx('icon-slider')}
                            style={{
                                display: project.listImageProject.length < 6 && 'none',
                                opacity: indexImage === project.listImageProject.length - 1 && '0.6',
                                pointerEvents: indexImage === project.listImageProject.length - 1 && 'none',
                            }}
                            onClick={() => setIndexImage((prev) => prev + 1)}
                        />
                    </div>
                </div>
                <div className={cx('container-right')}>
                    <p className={cx('text-funding')}>Đang gây quỹ</p>
                    <p className={cx('text-name')}>{ItemProject?.title}</p>
                    <p className={cx('text-des')}>{ItemProject?.tagline}</p>
                    <div className={cx('container-layout-info')}>
                        <img className={cx('avatar')} src={ItemProject.owner?.avatar?.url || defaultAvatar} alt="avt" />
                        <div className={cx('container-info')}>
                            <a href={`/individuals/${ItemProject.owner?._id}/profile`} className={cx('name-user')}>
                                {ItemProject.owner?.fullName}
                            </a>
                            <div style={{ display: 'flex' }}>
                                <span>{quantityCampaignOfUser} chiến dịch</span>
                                <div className={cx('seprate')}></div>
                                <span>
                                    {ItemProject.location?.city} | {ItemProject.location?.country}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('container-layout-money')}>
                        <div className={cx('container-money')}>
                            <b className={cx('text-current-money')}>{formatMoney(money)}</b>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className={cx('container-people')}>{quantityPeople}</span>
                                <span className={cx('text-people')}>người đóng góp</span>
                            </div>
                        </div>
                        <ProgressBar
                            margin="6px 0"
                            labelAlignment="right"
                            labelColor="#fff"
                            labelSize="12px"
                            width="100%"
                            baseBgColor="#ccc"
                            bgColor="#34ca96"
                            borderRadius="10px"
                            height="16px"
                            customLabel={formatPercent((money / ItemProject.goal) * 100)}
                            maxCompleted={ItemProject.goal}
                            completed={money}
                        />
                        <div className={cx('container-layout-deadline')}>
                            <div className={cx('container-deadline')}>
                                <b className={cx('text-money-total')}>
                                    {formatPercent((money / ItemProject.goal) * 100) + ' %'}
                                </b>
                                <span className={cx('text-of')}>của</span>
                                <b className={cx('text-money-total')}>{formatMoney(ItemProject.goal)}</b>
                            </div>

                            <b className={cx('container-people')}>
                                {getDeadline()} <span className={cx('text-people')}>ngày còn lại</span>
                            </b>
                        </div>
                    </div>

                    <div className={cx('container-button')}>
                        <div>
                            <button
                                className={cx('hover-btn')}
                                type="button"
                                onClick={() => {
                                    setPerkInModal(true);
                                    setIsOpenModal(true);
                                }}
                            >
                                XEM QUÀ TẶNG
                            </button>
                            <button className={cx('hover-btn-follow')} type="button">
                                <AiOutlineHeart className={cx('text-follow')} /> THEO DÕI
                            </button>
                        </div>
                        <div
                            className={cx('action-doc')}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropDown((prev) => !prev);
                            }}
                            ref={docElement}
                        >
                            <PiDotsThreeBold style={{ fontSize: '20px', color: '#000' }} />
                            <div className={cx('dropdown-wrapper')} style={{ display: openDropDown && 'block' }}>
                                <DropDown
                                    setIsOpenModalMember={setIsOpenModalMember}
                                    setIsOpenModalReport={setIsOpenModalReport}
                                    IsOpenModalReport={isOpenModalReport}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ position: 'relative', height: 'auto', display: 'flex', margin: '20px 130px' }}>
                <div style={{ width: '70%', height: 'auto' }}>
                    <div
                        style={{
                            height: 'auto',
                            marginBottom: '16px',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: '20px 0',
                        }}
                    >
                        <span
                            className={cx('item-tab-header', { 'item-tab-header-clicked': indexTabHeader === 1 })}
                            onClick={() => setIndexTabHeader(1)}
                        >
                            STORY
                        </span>
                        <span
                            className={cx('item-tab-header', { 'item-tab-header-clicked': indexTabHeader === 2 })}
                            onClick={() => setIndexTabHeader(2)}
                        >
                            FAQ
                        </span>
                        <div
                            className={cx('item-tab-header', { 'item-tab-header-clicked': indexTabHeader === 3 })}
                            onClick={() => setIndexTabHeader(3)}
                        >
                            <span>UPDATES</span>
                            <span
                                style={{
                                    fontSize: '9px',
                                    textAlign: 'center',
                                    backgroundColor: '#f5f5f5',
                                    padding: '2px 6px',
                                    borderRadius: '40%',
                                    marginLeft: '8px',
                                    fontWeight: '700',
                                }}
                            >
                                1
                            </span>
                        </div>
                        <div
                            className={cx('item-tab-header', { 'item-tab-header-clicked': indexTabHeader === 4 })}
                            onClick={() => setIndexTabHeader(4)}
                        >
                            <span>DISCUSSION</span>
                            <span
                                style={{
                                    fontSize: '9px',
                                    textAlign: 'center',
                                    backgroundColor: '#f5f5f5',
                                    padding: '2px 6px',
                                    borderRadius: '40%',
                                    marginLeft: '8px',
                                    fontWeight: '700',
                                }}
                            >
                                435
                            </span>
                        </div>
                    </div>

                    <div style={{ height: '20px', backgroundColor: 'red' }}>
                        {indexTabHeader === 1 && <>1</>}
                        {indexTabHeader === 2 && <>2</>}
                        {indexTabHeader === 3 && <>3</>}
                        {indexTabHeader === 4 && <>4</>}
                    </div>
                </div>

                <div
                    style={{ width: '30%', height: 'auto', display: 'flex', flexDirection: 'column', padding: '20px' }}
                >
                    <div style={{ position: 'sticky', top: '20px' }}>
                        <p style={{ fontSize: '19px', fontWeight: '500', marginLeft: '10px' }}>Chọn một quà tặng</p>
                        <div style={{ maxHeight: '920px', overflowY: 'scroll' }}>
                            {listPerkByCampaignId.map((item, index) => {
                                return (
                                    <PerkItem
                                        setItemPerkSelected={setItemPerkSelected}
                                        index={index}
                                        item={item}
                                        key={index}
                                        isPage={true}
                                        setIsOpenModalOption={setIsOpenModalOption}
                                        closePerkModal={() => setIsOpenModal(false)}
                                        setPerkInModal={setPerkInModal}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {isOpenModalOption && (
                <ModalOptionPerk
                    itemPerk={itemPerkSelected}
                    close={() => setIsOpenModalOption(false)}
                    setIsOpenModal={setIsOpenModal}
                    perkInModal={perkInModal}
                />
            )}
            {isOpenModal && (
                <ModalPerk
                    setItemPerkSelected={setItemPerkSelected}
                    listPerk={listPerkByCampaignId}
                    close={() => setIsOpenModal(false)}
                    setIsOpenModalOption={setIsOpenModalOption}
                    setPerkInModal={setPerkInModal}
                />
            )}
            {isOpenModalMember && (
                <ModalTeamMembersDetail members={members} setIsOpenModalMember={setIsOpenModalMember} />
            )}
            {isOpenModalReport && (<ModalReport setIsOpenModalReport={setIsOpenModalReport}/>)}
        </div>
    );
}

export default DetailProject;
