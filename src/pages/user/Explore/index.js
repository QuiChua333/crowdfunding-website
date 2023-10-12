import classNames from "classnames/bind";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import ProjectCardItem from "~/components/ProjectCardItem";

import styles from './Explore.module.scss'

const cx = classNames.bind(styles);

function Explore() {
    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('subHeader')}>

            </div> */}
            {/* Banner  */}
            <div className={cx('banner')}>
                <h2 className={cx('title')}>
                    Indiegogo Campaigns
                </h2>

                <p className={cx('description')}>
                    Fund new and groundbreaking projects, including hits from Indiegogo InDemand
                </p>
            </div>

            <div className={cx('container')}>
                <nav className={cx('exploreFilters')}>
                    <h2>
                        Filter results
                    </h2>

                    <div className={cx('exploreFilters-categories')}>
                        <div className={cx('exploreFilters-subheader')}>
                            CATEGORY
                        </div>

                        <div>
                            <div className={cx('categoryNavItem')}>
                                All Categories
                            </div>
                            <div className={cx('categoryNavItem', 'categoryNavItem--topLevel')}>
                                All Categories
                            </div>
                            <div className={cx('categoryNavItem', 'categoryNavItem--topLevel')}>
                                All Categories
                            </div>
                            <div className={cx('categoryNavItem', 'categoryNavItem--topLevel')}>
                                All Categories
                            </div>
                        </div>



                    </div>
                    <div className={cx('separate')}>

                    </div>

                    <div  className={cx('projectTimingFilter')}>

                    <div className={cx('projectTimingFilter-subheader')}>
                    PROJECT TIMING
                        </div>

                        <div>
                            <div className={cx('categoryNavItem')}>
                                All Categories
                            </div>
                            <div className={cx('categoryNavItem')}>
                                All Categories
                            </div>
                            <div className={cx('categoryNavItem')}>
                                All Categories
                            </div>
                            <div className={cx('categoryNavItem')}>
                                All Categories
                            </div>
                        </div>
               
        
                    </div>
                </nav>
                <div className={cx('exploreLayout-main')}>
                    <div className={cx('exploreLayout-main-search')}>
                        <span className={cx('exploreLayout-main-icon-search')}><AiOutlineSearch /></span>
                        <input type="text" placeholder="Search for campaigns" className={cx('exploreLayout-main-input')}/>
                        <span className={cx('exploreLayout-main-icon-close')}><AiOutlineClose /></span>
                    </div>

                    <div className={cx('exploreLayout-main-separate')}>

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