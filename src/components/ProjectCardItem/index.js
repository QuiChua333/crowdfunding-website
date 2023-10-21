import classNames from "classnames/bind";
import styles from './ProjectCardItem.module.scss'
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { useState } from "react";


const cx = classNames.bind(styles);

function ProjectCardItem() {

    const [favourite, setFavourite] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('card-image')}> 
                <img src="https://c2.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,w_auto,g_center,q_auto:best,dpr_1.3,f_auto/efsrksh7v2aabxggp5rr" alt="project-image"/>
            </div>

            <div className={cx('card-info')}>
                <div className={cx('card-status')}>
                    <span className={cx('status')}>FUNDING</span>
                    
                    {favourite?<AiTwotoneHeart className={cx('heart-active')}/> : <AiOutlineHeart className={cx('heart')}/> }
                      
                       
                    
                </div>

                <h2 className={cx('card-title')}>Litheli: Electric Utility Wagon with Power Bank</h2>
                <p className={cx('card-description')}>Pure Electric Drive | 0.6~1.3m/s Speeds Matching Paces| Load Up to 132lbs | 74Wh Power Bank Battery</p>
                <p className={cx('card-category')}>ENERGY & GREEN TECH</p>

                <div className={cx('card-progress')}> 
                    <div className={cx('money-info')}>
                        <div className={cx('money')}>
                            <span className={cx('current-money')}>180000</span>
                            <span className={cx('unit-money')}>VNĐ</span>
                        </div>
                        <span className={cx('percent')}>25.78%</span>
                    </div>
                    <div className={cx('progressbar')}>
                        <div className={cx('progressbar-value')}>

                        </div>
                    </div>

                    <div className={cx('days-left')}>
                         <AiFillClockCircle style={{color: 'rgb(173 172 172)'}}/>
                        <span>2 days left</span> 
                        
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProjectCardItem;