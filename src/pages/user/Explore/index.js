import classNames from "classnames/bind";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import ProjectCardItem from "~/components/ProjectCardItem";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import customAxios from '~/utils/customAxios'
import InfiniteScroll from "react-infinite-scroll-component";
import baseURL from "~/utils/baseURL";
import styles from './Explore.module.scss'
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

function Explore() {
    const navigate = useNavigate()
    const filterExplore = useSelector(state => state.globalApp.filterExplore)
    const [listFieldGrouByCategory, setListFieldGrouByCategory] = useState([])
    const [pathWithQuery, setPathWithQuery] = useState('')
    const [campaigns, setCampaigns] = useState([])
    const [hasMore,setHasMore] = useState(true)
    const [filter, setFilter] = useState(() => {
        const state = {
            textSearch: '',
            sort: 'Xu hướng',
            category: 'Tất cả',
            status: 'Tất cả',
            ...filterExplore
        }
        if (filterExplore.field) {
            delete state.category
        }
        return state
    })
    useEffect(() => {
        console.log(filter)
    }, [filter])
    const getListCategory = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/field/getFieldGroupByCategory`)
            setListFieldGrouByCategory([{ category: 'Tất cả', active: false }].concat(res.data.data.map(item => {
                return {
                    ...item,
                    active: false,
                    showMore: false,
                    listFields: item.listFields.map(item => ({ field: item, active: false }))
                }
            })).map(item => {
                if (item.category === filter.category) {
                    if (item.category !== 'Tất cả') {
                        return {
                            ...item,
                            showMore: true,
                            active: true,
                            listFields: item.listFields.map(item2 => {
                                return { ...item2, active: false }
                            })
                        }
                    }
                    else {
                        return { ...item, active: true }
                    }
                }
                else {
                    if (item.category !== 'Tất cả') {
                        return {
                            ...item,
                            active: false,
                            showMore: item.listFields.some(item2 => item2.field === filter.field),
                            listFields: item.listFields.map(item2 => {
                                if (item2.field === filter.field) return { ...item2, active: true }
                                else return { ...item2, active: false }
                            })
                        }
                    }
                    else {
                        return {
                            ...item,
                            active: false
                        }
                    }
                }
            }))

        } catch (error) {

        }
    }

    const boxFilterElement = useRef();
    useEffect(() => {
        function handleClickOutside(event) {
            if (boxFilterElement.current && !boxFilterElement.current.contains(event.target)) {
                setActiveBoxFilter(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [boxFilterElement]);
    const [activeBoxFilter, setActiveBoxFilter] = useState(false);
    useEffect(() => {
        getListCategory()
    }, [])
    const getAllCampaign = async () => {
        try {
            const res = await customAxios.get(pathWithQuery)
            // setLoadingData(false)
            console.log(res.data.data)

            setCampaigns(res.data.data)
            // setCampaignsOrigin(res.data.data.campaigns)

        } catch (error) {

        }
    }
    useEffect(() => {
        setListFieldGrouByCategory(prev => {
            const nextState = [...prev].map(item => {
                if (item.category === filter.category) {
                    if (item.category !== 'Tất cả') {
                        return {
                            ...item,
                            showMore: true,
                            active: true,
                            listFields: item.listFields.map(item2 => {
                                return { ...item2, active: false }
                            })
                        }
                    }
                    else {
                        return { ...item, active: true }
                    }
                }
                else {
                    if (item.category !== 'Tất cả') {
                        return {
                            ...item,
                            active: false,
                            showMore: item.listFields.some(item2 => item2.field === filter.field),
                            listFields: item.listFields.map(item2 => {
                                if (item2.field === filter.field) return { ...item2, active: true }
                                else return { ...item2, active: false }
                            })
                        }
                    }
                    else {
                        return {
                            ...item,
                            active: false
                        }
                    }
                }
            })
            return nextState

        })
        let queryParams = { searchString: filter.textSearch, sort: filter.sort, status: filter.status };
        if (filter.category) {
            queryParams.category = filter.category
        }
        if (filter.field) {
            queryParams.field = filter.field
        }
        const queryString = new URLSearchParams(queryParams).toString();
        const pathWithQuery = `${baseURL}/campaign/getAllCampaignsExplore?${queryString}`;
        setPathWithQuery(pathWithQuery)

    }, [filter])
    useEffect(() => {
        if (pathWithQuery) {
            getAllCampaign();
        }
    }, [pathWithQuery])
    const getMoreCmapigns = async () => {
        if (campaigns.length < 200) {
            try {
                
            } catch (error) {
                
            }
        } 
        else setHasMore(false)
    }
    const handleClickShowMore = (index, category) => {
        if (category !== 'Tất cả') {
            setListFieldGrouByCategory(prev => {
                return [...prev].map((item, index2) => {
                    if (index2 === index) {
                        return {
                            ...item,
                            showMore: !item.showMore
                        }
                    }
                    else return item
                })
            })
        }
        if (category !== filter.category) {
            setFilter(prev => {
                let nextState = { ...prev, category }
                delete nextState.field
                return nextState
            })
        }


    }
    const handleFilterField = (field) => {
        if (field !== filter.field) {
            setFilter(prev => {
                let nextState = { ...prev, field }
                delete nextState.category
                return nextState
            })
        }
    }
    const handleChangeSearchInput = (e) => {
        setFilter(prev => ({ ...prev, textSearch: e.target.value }))
    }


  
    const handleChangeStatus = (e) => {
        setFilter(prev => ({
            ...prev,
            status: e.target.value
        }))
    }
    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('subHeader')}>

            </div> */}
            {/* Banner  */}
            <div className={cx('banner')}>
                <h2 className={cx('title')}>
                    Chiến Dịch Give Fun
                </h2>

                <p className={cx('description')}>
                    Tài trợ cho các dự án mới và đột phá, bao gồm cả các dự án thành công từ Give Fun InDemand
                </p>
            </div>

            <div className={cx('container')}>
                <nav className={cx('exploreFilters')}>
                    <h2 style={{ fontWeight: '600' }}>
                        Lọc theo
                    </h2>

                    <div className={cx('exploreFilters-categories')}>
                        <div className={cx('exploreFilters-subheader')}>
                            LĨNH VỰC
                        </div>

                        <div>
                            {
                                listFieldGrouByCategory.map((item, index) => {
                                    return <div key={index} className={cx('categoryNavItem', { active: item.active })}>
                                        <h4 onClick={() => handleClickShowMore(index, item.category)}>{item.category}
                                            {item.category !== 'Tất cả' &&
                                                <>
                                                    {!item.showMore ? <FaAngleDown style={{ fontSize: '12px' }} /> : <FaAngleUp style={{ fontSize: '12px' }} />}
                                                </>
                                            }

                                        </h4>
                                        {
                                            item.showMore &&
                                            <ul className={cx('list-field')}>
                                                {
                                                    item.listFields.map((item2, index2) => {

                                                        return <li onClick={() => handleFilterField(item2.field)} key={index2} className={cx('field-item', { active: item2.active })}>{item2.field}</li>
                                                    })
                                                }

                                            </ul>
                                        }
                                    </div>
                                })
                            }


                        </div>



                    </div>
                    <div className={cx('separate')}>

                    </div>

                 
                    <div className={cx('projectTimingFilter')}>

                        <div className={cx('projectTimingFilter-subheader')}>
                            TRẠNG THÁI DỰ ÁN
                        </div>

                        <div>
                            <div style={{ marginTop: '16px' }}>
                                <label className={cx('inputRadioGroup-radio')}>
                                    <input type="radio" value={'Tất cả'} name="status" defaultChecked onChange={handleChangeStatus} />
                                    <span className={cx('inputRadioGroup-radio-button')}></span>
                                    <span className={cx('inputRadioGroup-radio-label')}>
                                        <span>Tất cả</span>
                                    </span>
                                </label>

                                <label className={cx('inputRadioGroup-radio')}>
                                    <input type="radio" value={'Đang gây quỹ'} name="status" onChange={handleChangeStatus} />
                                    <span className={cx('inputRadioGroup-radio-button')}></span>
                                    <span className={cx('inputRadioGroup-radio-label')}>
                                        <span>Đang gây quỹ</span>
                                    </span>
                                </label>
                                <label className={cx('inputRadioGroup-radio')}>
                                    <input type="radio" value={'InDemand'} name="status" onChange={handleChangeStatus} />
                                    <span className={cx('inputRadioGroup-radio-button')}></span>
                                    <span className={cx('inputRadioGroup-radio-label')}>
                                        <span>InDemand</span>
                                    </span>
                                </label>
                                <label className={cx('inputRadioGroup-radio')}>
                                    <input type="radio" value={'Đã kết thúc'} name="status" onChange={handleChangeStatus} />
                                    <span className={cx('inputRadioGroup-radio-button')}></span>
                                    <span className={cx('inputRadioGroup-radio-label')}>
                                        <span>Đã kết thúc</span>
                                    </span>
                                </label>
                            </div>
                        </div>


                    </div>
                </nav>
                <div className={cx('exploreLayout-main')}>
                    <div className={cx('exploreLayout-main-search')}>
                        <span className={cx('exploreLayout-main-icon-search')}><AiOutlineSearch /></span>
                        <input type="text" placeholder="Search for campaigns" className={cx('exploreLayout-main-input')} value={filter.textSearch} onChange={handleChangeSearchInput} />
                        <span onClick={() => setFilter(prev => ({ ...prev, textSearch: '' }))} className={cx('exploreLayout-main-icon-close')}><AiOutlineClose /></span>
                    </div>

                    <div className={cx('exploreLayout-main-separate')}>

                    </div>

                    <div className={cx('sort-by')}>
                        <span className={cx('label')}>Theo</span>

                        <div onClick={() => setActiveBoxFilter(prev => !prev)} className={cx('box-filter')} ref={boxFilterElement}>
                            <span>{filter.sort} <FaAngleDown className={cx('icon', { active: activeBoxFilter })} /></span>
                            {
                                activeBoxFilter &&
                                <div className={cx('dropdownBoxFilter')} >
                                    <span onClick={() => setFilter(prev => ({ ...prev, sort: 'Xu hướng' }))} className={cx({ active: filter.sort === 'Xu hướng' })}>Xu hướng</span>
                                    <span onClick={() => setFilter(prev => ({ ...prev, sort: 'Quyên góp nhiều nhất' }))} className={cx({ active: filter.sort === 'Quyên góp nhiều nhất' })}>Quyên góp nhiều nhất</span>
                                </div>
                            }

                        </div>

                    </div>

                    <div className={cx('exploreSearchResults')}>
                        <InfiniteScroll 
                        dataLength={campaigns.length}
                        next={getMoreCmapigns}
                        hasMore={hasMore}>
                            {
                                campaigns?.map((item,index) => {
                                    return <ProjectCardItem key={index} campaign={item}/>   
                                })
                            }
                        </InfiniteScroll>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button className={cx('btn-view-all')} >VIEW ALL TRENDING</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Explore;