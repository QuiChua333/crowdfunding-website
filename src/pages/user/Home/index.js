import ProjectCardItem from "~/components/ProjectCardItem";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import customAxios from '~/utils/customAxios'
import images from "~/assets/images/category_interest";

import styles from './Home.module.scss'
import SectionTrust from "./SectionTrust";
import { useEffect, useState } from "react";
import baseURL from "~/utils/baseURL";

const cx = classNames.bind(styles);

function Home() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };
    const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
        const { carouselState: { currentSlide } } = rest;
        return (
            //     <div className="carousel-button-group mb-4  gap-4 flex justify-end 
            //     items-center w-full">
            //       <button className='block p-3 bg-slate-300' onClick={() => 
            //       previous()}> <FiChevronLeft /></button>
            //       <button onClick={() => next()}><span className='block p-3 bg-slate-300' ><BiChevronRight /></span></button>
            //    </div>

            <div className={cx('d-flex', 'justify-content-between', 'button-group')} style={{ width: '100px' }} >
                <div onClick={() =>
                    previous()} className={cx('icon-switch', 'icon-back')} >
                    <FaAngleLeft className={cx('icon')} />
                </div>
                <div onClick={() => next()} className={cx('icon-switch', 'icon-next')}>
                    <FaAngleRight className={cx('icon')} />
                </div>
            </div>

        );
    };
    const [campaigns,setCampaigns] = useState([])
    const getPopulateCampaigns = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/campaign/getPopulateCampaigns`);
            setCampaigns(res.data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getPopulateCampaigns()
    }, [])
    useEffect(() => {
        console.log(campaigns)
    },[])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('list-popular-projects')} style={{ marginTop: '60px' }}>
                    <div className="d-flex justify-content-between">
                        <h3 className={cx('title')}>
                            DỰ ÁN PHỔ BIẾN
                        </h3>

                        {/* <div className={cx('d-flex','justify-content-between','button-group')} style={{ width: '100px' }}>
                            <div className={cx('icon-switch', 'icon-back')}>
                                <FaAngleLeft className={cx('icon')} />
                            </div>
                            <div className={cx('icon-switch', 'icon-next')}>
                                <FaAngleRight className={cx('icon')} />
                            </div>
                        </div> */}
                    </div>
                    {/* <div className={cx('d-flex justify-content-between')} style={{ marginTop: '28px' }}>
                    
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                    </div> */}
                    <div className={cx('carsousel-wrapper')} style={{ marginTop: '28px' }} >
                        <Carousel itemClass={cx('carousel')} responsive={responsive} arrows={false} renderButtonGroupOutside={true} customButtonGroup={<ButtonGroup />}>

                            {
                                campaigns?.map((item,index) => {
                                    return  <div key={index} style={{ marginLeft: '16px' }}><ProjectCardItem campaign={item} /></div>
                                })
                            }
                            

                        </Carousel>
                    </div>
                </div>
                <div className={cx('category-interest')} style={{ marginTop: '100px' }}>
                    <h2 className={cx('title')}>
                        Những lĩnh vực nào bạn đang quan tâm?
                    </h2>

                    <p className={cx('content')}>
                        Khám phá các dự án dành riêng cho bạn và nhận được những đề xuất tuyệt vời khi bạn chọn sở thích của mình.
                    </p>

                    <p className={cx('content')}>
                        Hoặc khám phá các danh mục hàng đầu của chúng tôi
                    </p>

                    <div className="d-flex flex-wrap" style={{ width: '100%', marginTop: '16px' }}>
                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.home} />
                            </div>

                            <div className={cx('categoryText')} >
                                VẬT DỤNG TRONG NHÀ
                            </div>
                        </Link>

                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.phone} />
                            </div>

                            <div className={cx('categoryText')} >
                                ĐIỆN THOẠI & PHỤ KIỆN

                            </div>
                        </Link>

                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.travel} />
                            </div>

                            <div className={cx('categoryText')} >
                                DU LỊCH & HOẠT ĐỘNG NGOÀI TRỜI

                            </div>
                        </Link>

                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.health} />
                            </div>

                            <div className={cx('categoryText')} >
                                SỨC KHỎE & THỂ HÌNH

                            </div>
                        </Link>

                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.audio} />
                            </div>

                            <div className={cx('categoryText')} >
                                ÂM THANH

                            </div>
                        </Link>

                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.film} />
                            </div>

                            <div className={cx('categoryText')} >
                                PHIM

                            </div>
                        </Link>
                    </div>
                </div>
                <div className={cx('backTheProjectSection-imageWrapper')} style={{ marginTop: '60px' }}>
                    <div className={cx('backTheProjectSection-iamge')}>
                        <h2 className={cx('title')}>
                            Cơ hội mới, thành công mới
                        </h2>

                        <p className={cx('content')}>
                            Give Fun là điểm đén của bạn để khám phá những đổi mới tinh tế trong công nghệ, thiết kế và nhiều lĩnh vực khác, thường đi kèm với ưu đãi đặc biệt và giá ưu đãi cho những người ủng hộ sớm. Hãy ủng hộ một dự án, chia sẻ ý kiến và phản hồi của bạn với nhóm dự án - và tham gia vào rủi ro và phúc lợi của việc mang sản phẩm mới vào cuộc sống.
                        </p>

                        <Link className={cx('link')} to="/">
                            <p>Tìm hiểu thêm về Give Fun <AiOutlineRight /></p>
                        </Link>
                    </div>
                </div>


            </div>

            <div style={{ marginTop: '60px', width: '100vw' }} className="d-flex justify-content-center"><SectionTrust /></div>
        </div>

    )
}

export default Home;
