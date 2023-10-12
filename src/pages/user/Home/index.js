import ProjectCardItem from "~/components/ProjectCardItem";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import images from "~/assets/images/category_interest";

import styles from './Home.module.scss'
import SectionTrust from "./SectionTrust";

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

           <div className={cx('d-flex','justify-content-between','button-group')} style={{ width: '100px' }} >
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
                    <div  className={cx('carsousel-wrapper')} style={{ marginTop: '28px' }} >
                    <Carousel  responsive={responsive} arrows={false} renderButtonGroupOutside={true}  customButtonGroup={<ButtonGroup />}>
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                        <ProjectCardItem />
                    </Carousel>
                    </div>
                </div>
                <div className={cx('category-interest')} style={{ marginTop: '100px' }}>
                    <h2 className={cx('title')}>
                        Which categories interest you?
                    </h2>

                    <p className={cx('content')}>
                        Discover projects just for you and get great recommendations when you select your interests.
                    </p>

                    <p className={cx('content')}>
                        Or explore our top categories
                    </p>

                    <div className="d-flex flex-wrap" style={{ width: '100%' }}>
                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.home} />
                            </div>

                            <div className={cx('categoryText')} >
                                HOME
                            </div>
                        </Link>

                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.phone} />
                            </div>

                            <div className={cx('categoryText')} >
                                Phones & Accessories

                            </div>
                        </Link>

                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.travel} />
                            </div>

                            <div className={cx('categoryText')} >
                                Travel & Outdoors

                            </div>
                        </Link>

                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.health} />
                            </div>

                            <div className={cx('categoryText')} >
                                Health & Fitness

                            </div>
                        </Link>

                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.audio} />
                            </div>

                            <div className={cx('categoryText')} >
                                Audio

                            </div>
                        </Link>

                        <Link to="/" className={cx('column')}>
                            <div className={cx('categoryIcon')}>
                                <img src={images.film} />
                            </div>

                            <div className={cx('categoryText')} >
                                Film

                            </div>
                        </Link>
                    </div>
                </div>
                <div className={cx('backTheProjectSection-imageWrapper')} style={{ marginTop: '60px' }}>
                    <div className={cx('backTheProjectSection-iamge')}>
                        <h2 className={cx('title')}>
                            Back the project, take the ride
                        </h2>

                        <p className={cx('content')}>
                            Indiegogo is your destination for clever innovations in tech, design, and more, often with special perks and pricing for early adopters. Back a campaign, share your ideas and feedback with the project team - and join the risks and rewards of bringing new products to life.
                        </p>

                        <Link className={cx('link')} to="/">
                            <p>Learn about crowdfunding <AiOutlineRight /></p>
                        </Link>
                    </div>
                </div>

                
            </div>

            <div style={{ marginTop: '60px', width: '100vw' }} className="d-flex justify-content-center"><SectionTrust /></div>
        </div>

    )
}

export default Home;
