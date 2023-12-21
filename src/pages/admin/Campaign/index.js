import classNames from "classnames/bind";
import styles from './Campaign.module.scss'
import { FaAngleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import CampaignTable from "./CampaignTable";
import Filter from "../components/Filter";
import Search from "../components/Search";
import baseURL from "~/utils/baseURL";
import customAxios from '~/utils/customAxios'
const cx = classNames.bind(styles)
function CampaignManagement() {
    const [isOpenDropdownAction, setOpenDropdownAction] = useState(false)
    const [numberSelected, setNumberSelected] = useState(0)
    const [filter,setFilter] = useState({
        textSearch: '',
        status: 'Tất cả'

    })
    const handleClickItemFilter = (item) => {
        setFilter(prev => ({...prev, status: item}))
    }
    const handleChangeSearchInput = (value) => {
        setFilter(prev => ({...prev, textSearch: value}))
    }
    useEffect(() => {
        let tmp = [...campaignsOrigin];
        if (filter.status!=='Tất cả') tmp = tmp.filter(item => item.status === filter.status);
        if (filter.textSearch!=='') {
            const value = filter.textSearch.trim().toLowerCase();
            tmp = tmp.filter(item => item.title.toLowerCase().includes(value) || item.owner.fullName.toLowerCase().includes(value))
        }
        setCampaigns([...tmp])
    },[filter])

    const [campaigns, setCampaigns] = useState([])
    const [campaignsOrigin, setCampaignsOrigin] = useState([])
    const getAllCampaigns = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/campaign/getAllCampaigns`)
            setCampaigns(res.data.data)
            setCampaignsOrigin(res.data.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getAllCampaigns()
    }, [])
    const handleChangStateListCampaign = (listCampaign) => {
        setNumberSelected(prev => {
            const num = listCampaign.reduce((acc, cur) => acc + cur.isChecked ? 1 : 0,0);
            return num
        })
    }


return (
    <div className={cx('wrapper')}>
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
            <Filter listConditions={['Tất cả', 'Chờ xác nhận', 'Đang gây quỹ', 'Đang tạm ngưng', 'Đã kết thúc']} handleClickItem={handleClickItemFilter} />
        </div>
        <div style={{ marginTop: '40px' }}>
            {
                campaigns.length > 0 &&
                <CampaignTable campaigns={campaigns} onCampaignTableChange={handleChangStateListCampaign} />
            }
        </div>
    </div>
);
}

export default CampaignManagement;