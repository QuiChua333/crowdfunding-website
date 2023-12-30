import classNames from "classnames/bind";

import styles from './CampaignTable.module.scss'
import CampaignRow from "./CampaignRow";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import convertDate from "~/utils/convertDate";

const cx = classNames.bind(styles)

function CampaignTable({campaigns, onCampaignTableChange, getAllCampaigns}) {
    const [listCampaigns,setlistCampaigns] = useState([]);
    const [isCheckAll,setCheckAll] = useState(false) 
    useEffect(() => {
        setlistCampaigns(prev => {
            const state = [...campaigns].map(item => {
                let dateString = '';
                let endDateString = ''
                if (item.startDate) {
                    dateString =  convertDate(item.startDate)
                    let endDate =  new Date(item.startDate) 
                    endDate.setDate(endDate.getDate() + item.duration)
                    endDateString= convertDate(endDate)
                
                }
                
                return {
                    id: item._id,
                    title: item.title,
                    goal: (item.goal/1000000).toFixed(2) + ' triệu',
                    status: item.status,
                    startDate: dateString,
                    endDate: endDateString,
                    ownerName: item.owner.fullName,
                    isChecked: false,
                    currentMoney: (item.currentMoney/1000000).toFixed(2) + ' triệu',
                    
                }
            })
            return state
        })
    },[campaigns])
    
    const handleClickCheckAll = () => {
        setCheckAll(prev => !prev);
        setlistCampaigns(prev => {
            const nextState = [...prev].map((item,index) => {
                    return {...item, isChecked: !isCheckAll}
            })
            return nextState;
        })
    }
    const handleSetChecked = (indexChange,checked) => {
        setlistCampaigns(prev => {
            const nextState = [...prev].map((item,index) => {
                if (index===indexChange) {
                    return {...item, isChecked: checked}
                }
                else return {...item}
            })  
            return nextState;
        })
    }
    useEffect(()=> {
        const checkAll = listCampaigns.length > 0 ? listCampaigns.every(item => item.isChecked === true) : false;
        setCheckAll(checkAll)
  
        onCampaignTableChange([...listCampaigns])

    },[listCampaigns])
    
    return (
        <div className={cx('wrapper')}>
            <table>
                <thead>
                    <tr>
                    
                        <th className={cx('title')}>TÊN CHIẾN DỊCH</th>
                        <th className={cx('goal')}>MỤC TIÊU</th>
                        <th className={cx('status')}>TRẠNG THÁI</th>
                        <th className={cx('endDate')}>NGÀY KẾT THÚC</th>
                        <th className={cx('startDate')}>QUỸ HIỆN TẠI</th>
                        <th className={cx('owner')}>CHỦ SỞ HỮU</th>
                        <th className={cx('action')}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listCampaigns?.map((item, index) => {
                            return <CampaignRow key={index} campaign={item} index={index} setChecked={handleSetChecked} getAllCampaigns={getAllCampaigns}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default CampaignTable;