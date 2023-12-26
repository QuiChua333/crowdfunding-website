import classNames from "classnames/bind";
import SidebarCampaign from "../Sidebar";
import { HeaderPage } from "~/components/Layout/components/Header";

import Footer from "~/components/Layout/components/Footer";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import customAxios from '~/utils/customAxios'

import images from "~/assets/images";
import ContributionTable from "./ContributionTable";

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
const cx = classNames.bind(styles);

function ContributionCampaign() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [numberSelected, setNumberSelected] = useState(0)
    const [pathWithQuery, setPathWithQuery] = useState('')
    const [isOpenDropdownAction, setOpenDropdownAction] = useState(false)
    const [campagin, setCampaign] = useState({})
    const [contributions, setContributions] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [filter, setFilter] = useState({
        textSearch: '',
        status: 'Tất cả',
        page: 1

    })
    const getCampaign = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/campaign/getCampaignById/${id}`)
            let infoBasic = {
                id: res.data.data._id,
                title: res.data.data.title || '',
                cardImage: res.data.data.cardImage || { url: '', public_id: '' },
                status: res.data.data.status,
                isIndemand: res.data.data.isIndemand || false,
            }
            setCampaign({ ...infoBasic })


        } catch (error) {

        }
    }
    useEffect(() => {
        const queryParams = { page: filter.page, searchString: filter.textSearch, status: filter.status };
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
    const handleClickItemFilter = (item) => {
        setFilter(prev => ({ ...prev, status: item }))
    }
    const handleClickPreviousPage = () => {
        if (filter.page === 1) return;
        setFilter(prev => ({ ...prev, page: prev.page - 1 }))
    }
    const handleClickNextPage = () => {
        if (filter.page === totalPages) return;
        setFilter(prev => ({ ...prev, page: prev.page + 1 }))
    }
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
                                        <div style={{ opacity: numberSelected == 0 && '0' }}>
                                            <span ><strong style={{ display: 'inline-block', minWidth: '12px' }}>{numberSelected}</strong> dự án đang được chọn</span>
                                            <div style={{ display: 'inline-block', marginLeft: '24px', position: 'relative' }}>
                                                <a onClick={(e) => { e.preventDefault(); setOpenDropdownAction(prev => !prev) }} href="#" className={cx('btn', 'btn-ok')} >Xóa
                                                </a>
                                            </div>
                                        </div>
                                        <Filter listConditions={['Tất cả', 'Đã gửi', 'Chưa gửi']} handleClickItem={handleClickItemFilter} />
                                    </div>
                                    <div style={{ marginTop: '40px' }}>
                                        <div className={cx('table-wrapper')}>
                                            <ContributionTable contributions={contributions} onContributionTableChange={handleChangStateListContributions} getAllContributions={getAllContributions} />
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
                            }



                        </div>
                    </div>
                    <Footer />
                </div>


            </div>


        </>
    );
}

export default ContributionCampaign;