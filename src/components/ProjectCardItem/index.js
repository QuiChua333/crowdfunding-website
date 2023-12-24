import classNames from "classnames/bind";
import styles from './ProjectCardItem.module.scss'
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";
import { useState } from "react";
import formatMoney from "~/utils/formatMoney";


const cx = classNames.bind(styles);

function ProjectCardItem({campaign}) {

    const [favourite, setFavourite] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('card-image')}> 
                <img src={campaign?.cardImage?.url} alt="project-image"/>
            </div>

            <div className={cx('card-info')}>
                <div className={cx('card-status')}>
                    <span className={cx('status')}>{campaign?.status}</span>
                    
                    {favourite?<AiTwotoneHeart className={cx('heart-active')}/> : <AiOutlineHeart className={cx('heart')}/> }
                      
                       
                    
                </div>

                <h2 className={cx('card-title')}>{campaign.title}</h2>
                <p className={cx('card-description')}>{campaign.tagline}</p>
                <p className={cx('card-category')}>{campaign.field}</p>

                <div className={cx('card-progress')}> 
                    <div className={cx('money-info')}>
                        <div className={cx('money')}>
                            <span className={cx('current-money')}>{formatMoney(campaign.currentMoney)}</span>
                            <span className={cx('unit-money')}>VNĐ</span>
                        </div>
                        <span className={cx('percent')}>{(campaign.percentProgress % 100 === 0) ? campaign.percentProgress : campaign.percentProgress.toFixed(2)}%</span>
                    </div>
                    <div className={cx('progressbar')}>
                        <div className={cx('progressbar-value')} style={{width: campaign.percentProgress >= 100 ? '100%' : `${campaign.percentProgress}%`}}>

                        </div>
                    </div>

                    <div className={cx('days-left')}>
                         <AiFillClockCircle style={{color: 'rgb(173 172 172)'}}/>
                        <span>Còn {campaign.daysLeft}</span> 
                        
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProjectCardItem;