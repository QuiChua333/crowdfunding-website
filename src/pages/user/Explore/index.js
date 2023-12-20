import classNames from "classnames/bind";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import ProjectCardItem from "~/components/ProjectCardItem";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import customAxios from '~/utils/customAxios'

import baseURL from "~/utils/baseURL";
import styles from './Explore.module.scss'
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

function Explore() {
    const navigate = useNavigate()
    const location = useLocation();
    const [listFieldGrouByCategory, setListFieldGrouByCategory] = useState([])
    const searchParams = new URLSearchParams(location.search);
    const fieldParams = searchParams.get('field');
    const categoryParams = searchParams.get('category')
    const timeParams = searchParams.get('time')
    const sortParams = searchParams.get('sort')
    const textSearchParams = searchParams.get('textSearch')
    const [filter, setFilter] = useState(() => {
        const state = {
            field: fieldParams,
            category: categoryParams,
            time: timeParams || 'Tất cả',
            textSearch: textSearchParams || '',
            sort: sortParams || 'Xu hướng'
        }
        if (!categoryParams) delete state.category
        if (!fieldParams) delete state.field
        
        return {...state}
    })
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
        console.log('in',category,filter.category)
        if (category!==filter.category) {
            setFilter(prev => ({ ...prev, category, field: '' }))
        }

     
    }
    const handleFilterField = (field) => {
       if (field!==filter.field) {
        setFilter(prev => ({ ...prev, category: '', field }))
       }
    }
    const handleChangeSearchInput = (e) => {
        setFilter(prev => ({ ...prev, textSearch: e.target.value }))
    }
    const changeLocation = () => {
        const queryParams = {
            sort: filter.sort,
            textSearch: filter.textSearch,
            category: filter.category,
            field: filter.field,
            time: filter.time
        };
        if (!filter.category) delete queryParams.category
        if (!filter.field) delete queryParams.field

        const queryString = new URLSearchParams(queryParams).toString();
        const pathWithQuery = `/explore?${queryString}`;

        // Mở một trang mới hoặc cửa sổ mới
        navigate(pathWithQuery)
        setListFieldGrouByCategory(prev => {
            return [...prev].map(item => {
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
        })
        //gọi api get campaign
    
    }
    useEffect(() => {
        changeLocation()
       
    }, [filter])
    useEffect(() => {
      
    }, [listFieldGrouByCategory])
    const handleChangeTime = (e) => {
        setFilter(prev => ({
            ...prev,
            time: e.target.value
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
                            THỜI GIAN DỰ ÁN
                        </div>

                        <div>
                            <div style={{ marginTop: '16px' }}>
                                <label className={cx('inputRadioGroup-radio')}>
                                    <input type="radio" value={'Tất cả'} name="time" defaultChecked onChange={handleChangeTime} />
                                    <span className={cx('inputRadioGroup-radio-button')}></span>
                                    <span className={cx('inputRadioGroup-radio-label')}>
                                        <span>Tất cả</span>
                                    </span>
                                </label>

                                <label className={cx('inputRadioGroup-radio')}>
                                    <input type="radio" value={'Vừa phát hành'} name="time" onChange={handleChangeTime} />
                                    <span className={cx('inputRadioGroup-radio-button')}></span>
                                    <span className={cx('inputRadioGroup-radio-label')}>
                                        <span>Vừa phát hành</span>
                                    </span>
                                </label>
                                <label className={cx('inputRadioGroup-radio')}>
                                    <input type="radio" value={'Sắp kết thúc'} name="time" onChange={handleChangeTime} />
                                    <span className={cx('inputRadioGroup-radio-button')}></span>
                                    <span className={cx('inputRadioGroup-radio-label')}>
                                        <span>Sắp kết thúc</span>
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
                        <span onClick={() => setFilter(prev => ({...prev, textSearch: ''}))} className={cx('exploreLayout-main-icon-close')}><AiOutlineClose /></span>
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
                                    <span onClick={() => setFilter(prev => ({ ...prev, sort: 'InDemand' }))} className={cx({ active: filter.sort === 'InDemand' })}>InDemand</span>
                                    <span onClick={() => setFilter(prev => ({ ...prev, sort: 'Quyên góp nhiều nhất' }))} className={cx({ active: filter.sort === 'Quyên góp nhiều nhất' })}>Quyên góp nhiều nhất</span>
                                </div>
                            }

                        </div>

                    </div>

                    <div className={cx('exploreSearchResults')}>
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
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