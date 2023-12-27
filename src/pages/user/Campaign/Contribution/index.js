import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { AiFillClockCircle } from "react-icons/ai";
import customAxios from '~/utils/customAxios'

import images from "~/assets/images";
import ContributionTable from "./ContributionTable";
import TopContributionTable from "./TopContributionTable";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import styles from '~/pages/user/Campaign/CampaignStyle/CampaignStyle.module.scss'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Search from "~/pages/admin/components/Search";
import baseURL from "~/utils/baseURL";
import Filter from "~/pages/admin/components/Filter";
import { useDispatch } from "react-redux";
import { setLoading } from "~/redux/slides/GlobalApp";
import ModalContribution from "./ModalContribution";
import ModalGivePerk from "./ModalGivePerk";
import formatMoney from "~/utils/formatMoney";
const cx = classNames.bind(styles);

function ContributionCampaign() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [numberSelected, setNumberSelected] = useState(0)
    const [pathWithQuery, setPathWithQuery] = useState('')
    const [isOpenDropdownAction, setOpenDropdownAction] = useState(false)
    const [campagin, setCampaign] = useState({})
    const [indexContributionActive, setIndexContributionActive] = useState(-1)
    const [contributions, setContributions] = useState([])
    const [listUserContribution, setListUserContribution] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [timeLeft, setTimeLeft] = useState('')
    const [currentPercent, setCurrentPercent] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [showModalGivePerk, setShowModalGivePerk] = useState(false)
    
    const [filter, setFilter] = useState({
        textSearch: '',
        status: 'Tất cả',
        money: 'Tất cả',
        time: 'Tất cả',
        page: 1

    })
    const [currentMoney, setCurrentMoney] = useState(0)
    const [backers, setBackers] = useState(0)
    const getCampaign = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/campaign/getCampaignById/${id}`)
            let infoBasic = {
                id: res.data.data._id,
                title: res.data.data.title || '',
                cardImage: res.data.data.cardImage || { url: '', public_id: '' },
                status: res.data.data.status,
                startDate: res.data.data.startDate,
                goal: res.data.data.goal,
                duration: res.data.data.duration,
                isIndemand: res.data.data.isIndemand || false,
            }
            setCampaign({ ...infoBasic })


        } catch (error) {

        }
    }
    const getCurrentMoney = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/contribution/getMoneyByCampaign/${id}`)
            setCurrentMoney(res.data.data)
        } catch (error) {

        }
    }
    const getBackers = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/contribution/getQuantityPeopleByCampaign/${id}`)
            setBackers(res.data.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getCurrentMoney()
        getBackers()
    }, [])
    useEffect(() => {
        if (campagin.id) {
            let startDateTime = new Date(campagin.startDate)
            let endDateTime = startDateTime.getTime() + campagin.duration * 24 * 60 * 60 * 1000
            const currentDateTime = new Date().getTime()
            const remainingHours = Math.ceil((endDateTime - currentDateTime) / (1000 * 60 * 60));
            let daysLeft = ''
            if (remainingHours > 24) daysLeft = Math.ceil(remainingHours / 24) + " ngày"
            else daysLeft = Math.ceil(remainingHours) + " giờ";
            setTimeLeft(daysLeft)
        }
    }, [campagin])
    useEffect(() => {
        if (campagin.goal && currentMoney) {
            setCurrentPercent(currentMoney / campagin.goal * 100)
        }
    }, [campagin, currentMoney])

    useEffect(() => {
        const queryParams = { page: filter.page, searchString: filter.textSearch, status: filter.status, time: filter.time, money: filter.money };
        const queryString = new URLSearchParams(queryParams).toString();
        const pathWithQuery = `${baseURL}/contribution/getAllContributionsByCampaign/${id}?${queryString}`;
        setPathWithQuery(pathWithQuery)
    }, [filter])
    useEffect(() => {
        if (pathWithQuery) {
            getAllContributions()
        }
    }, [pathWithQuery])
    useEffect(() => {
        getCampaign()
    }, [])

    const getAllContributions = async () => {
        // setLoadingData(true)
        try {
            const res = await customAxios.get(pathWithQuery)
            // setLoadingData(false)
            setContributions(res.data.data.contributions)
            // setCampaignsOrigin(res.data.data.campaigns)
            setTotalPages(res.data.data.totalPages)

        } catch (error) {

        }
    }

    const handleChangStateListContributions = (listCampaign) => {
        setNumberSelected(prev => {
            const num = listCampaign.reduce((acc, cur) => acc + cur.isChecked ? 1 : 0, 0);
            return num
        })
    }

    const handleChangeSearchInput = (value) => {
        setFilter(prev => ({ ...prev, textSearch: value }))
    }
    const handleClickItemFilterStatus = (item) => {
        setFilter(prev => ({ ...prev, status: item }))
    }
    const handleClickItemFilterTime = (item) => {
        setFilter(prev => ({ ...prev, time: item, money: 'Tất cả' }))
    }
    const handleClickItemFilterMoney = (item) => {
        setFilter(prev => ({ ...prev, money: item, time: 'Tất cả' }))
    }

    const handleClickPreviousPage = () => {
        if (filter.page === 1) return;
        setFilter(prev => ({ ...prev, page: prev.page - 1 }))
    }
    const handleClickNextPage = () => {
        if (filter.page === totalPages) return;
        setFilter(prev => ({ ...prev, page: prev.page + 1 }))
    }
    const openDetailContribution = (index) => {
        setIndexContributionActive(index)
        setShowModal(true)
    }
    const handleChangeStatus = (id) => {
        setContributions(prev => ([...prev].map(item => {
            if (item._id === id) {
                return { ...item, isFinish: true }
            }
            else return item
        })))
    }

    const getListUserContribution = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/contribution/getTopUserContributionByCampaign/${id}`)
            setListUserContribution(res.data.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    const [userContributionGivePerk,setUserContributionGivePerk] = useState({})

    useEffect(() => {
        getListUserContribution()
    },[])
    return (
        <>
            <div className={cx('wrapper')}>
                <SidebarCampaign current={8}
                    status={campagin.status}
                    title={campagin.title}
                    cardImage={campagin.cardImage?.url}
                    id={id}
                />
                <div style={{ flex: '1' }}>

                    <HeaderPage isFixed={false} />

                    <div className={cx('content')}>
                        <div className={cx('controlBar')}>
                            <div className={cx('controlBar-container')}>
                                <div className={cx('controlBar-content')}>
                                    Chiến dịch / Đóng góp
                                </div>

                            </div>

                        </div>
                        <div className={cx('body')}>

                            {
                                true &&
                                <>
                                    <div>
                                        <div className={cx('entreSection')}>
                                            <div className={cx('entreField-header')}>
                                                Đóng góp

                                            </div>
                                            <div className={cx('entreField-subHeader')}>
                                                Xem các đóng góp mà người ủng hộ đã đóng góp cho chiến dịch của bạn. Cùng với việc xem xét các đặc quyền để gửi đúng thời hạn!
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '24px', maxWidth: '600px' }}>
                                            <Search handleChangeInput={handleChangeSearchInput} />
                                        </div>
                                        <div className={cx('table-action')}>
                                            <div style={{ opacity: numberSelected === 0 && '0' }}>
                                                <span ><strong style={{ display: 'inline-block', minWidth: '12px' }}>{numberSelected}</strong> dự án đang được chọn</span>
                                                <div style={{ display: 'inline-block', marginLeft: '24px', position: 'relative' }}>
                                                    <a onClick={(e) => { e.preventDefault(); setOpenDropdownAction(prev => !prev) }} href="#" className={cx('btn', 'btn-ok')} >Xóa
                                                    </a>
                                                </div>
                                            </div>
                                            <div className={cx('filter-wrapper')}>
                                                <div>
                                                    <label style={{ marginBottom: '4px' }}>Trạng thái</label>
                                                    <Filter listConditions={['Tất cả', 'Đã gửi', 'Chưa gửi']} handleClickItem={handleClickItemFilterStatus} valueShow={filter.status} />
                                                </div>
                                                <div>
                                                    <label style={{ marginBottom: '4px' }}>Thời gian</label>
                                                    <Filter listConditions={['Tất cả', 'Gần nhất', 'Sớm nhất']} handleClickItem={handleClickItemFilterTime} valueShow={filter.time} />
                                                </div>
                                                <div>
                                                    <label style={{ marginBottom: '4px' }}>Tiền</label>
                                                    <Filter listConditions={['Tất cả', 'Tăng dần', 'Giảm dần']} handleClickItem={handleClickItemFilterMoney} valueShow={filter.money} />
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '40px' }}>
                                            <div className={cx('table-wrapper')}>
                                                <div className={cx('card-progress')}>
                                                    <div className={cx('money-info')}>
                                                        <div className={cx('money')}>
                                                            <span className={cx('current-money')}>{formatMoney(currentMoney || 0)}</span>
                                                            <span className={cx('unit-money')}>VNĐ</span>
                                                        </div>

                                                    </div>
                                                    <div className={cx('progressbar')}>
                                                        <div className={cx('progressbar-value')} style={{ width: currentPercent >= 100 ? '100%' : `${currentPercent}%` }}>

                                                        </div>
                                                    </div>

                                                    <div className={cx('days-left')}>
                                                        <span className={cx('percent')}>{(currentPercent % 100 === 0) ? currentPercent : currentPercent.toFixed(2)}%</span>
                                                        <span className={cx('left')}>
                                                            <AiFillClockCircle style={{ color: 'rgb(173 172 172)' }} />
                                                            <span>Còn {timeLeft}</span>
                                                        </span>

                                                    </div>

                                                </div>
                                                <ContributionTable contributions={contributions} onContributionTableChange={handleChangStateListContributions} getAllContributions={getAllContributions} openDetailContribution={openDetailContribution} />
                                            </div>
                                            <div className={cx('pagination-wrapper')}>
                                                <div className={cx('pagination')}>
                                                    <span className={cx('icon')} onClick={handleClickPreviousPage}><FaAngleLeft style={{ color: '#7a69b3' }} /></span>
                                                    <span className={cx('curent')}>{`${filter.page} của ${totalPages}`}</span>
                                                    <span className={cx('icon')} onClick={handleClickNextPage}><FaAngleRight style={{ color: '#7a69b3' }} /></span>
                                                </div>
                                            </div>

                                        </div>

                                    </div>


                                    <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', paddingTop: '30px', textAlign: 'left' }}>
                                        <div className={cx('entreSection')} style={{marginBottom: '20px'}}>
                                            <div className={cx('entreField-header')}>
                                                Đóng góp nhiều nhất

                                            </div>
                                            <div className={cx('entreField-subHeader')}>
                                                Tính năng xem top những người đóng góp nhiều nhất. Kèm theo tùy chọn tặng thêm các đặc quyền cho những người đóng góp này.
                                            </div>

                                        </div>
                                        <div style={{ marginTop: '40px' }}>
                                            <div className={cx('table-wrapper')}>

                                                <TopContributionTable listUserContribution={listUserContribution} setShowModalGivePerk={setShowModalGivePerk} setUserContributionGivePerk={setUserContributionGivePerk}/>
                                            </div>


                                        </div>
                                    </div>
                                </>

                            }



                        </div>
                    </div>
                    <Footer />
                </div>

                {
                    showModal &&
                    <ModalContribution setShowModal={setShowModal} contribution={contributions[indexContributionActive]} handleChangeStatus={handleChangeStatus} />
                }
                {
                    showModalGivePerk &&
                    <ModalGivePerk setShowModalGivePerk={setShowModalGivePerk} userContributionGivePerk={userContributionGivePerk}/>
                }
            </div>


        </>
    );
}

export default ContributionCampaign;