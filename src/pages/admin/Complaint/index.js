import classNames from "classnames/bind";
import styles from './Complaint.module.scss'
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import ComplaintTable from "./ComplaintTable";
import Filter from "../components/Filter";
import Search from "../components/Search";
const cx = classNames.bind(styles)
function ComplaintManagement() {
    const [isOpenDropdownAction, setOpenDropdownAction] = useState(false)
    const [numberSelected, setNumberSelected] = useState(1)
    const handleClickItemFilter = (item) => {
        console.log(item)
    }
    const handleChangeSearchInput = (value) => {
        console.log(value)
    }
    return (
        <div className={cx('wrapper')}>
            <div style={{marginBottom: '24px', maxWidth: '600px'}}>
                <Search handleChangeInput={handleChangeSearchInput}/>
            </div>
            <div className={cx('table-action')}>
                <div style={{opacity: numberSelected==0 && '0'}}>
                    <span ><strong style={{ display: 'inline-block', minWidth: '12px' }}>{numberSelected}</strong> selected</span>
                    <div style={{ display: 'inline-block', marginLeft: '24px', position: 'relative' }}>
                        <a onClick={(e) => { e.preventDefault(); setOpenDropdownAction(prev => !prev) }} href="#" className={cx('btn', 'btn-ok')} >Xóa
                        </a>
                    </div>
                </div>
                <Filter listConditions={['Tất cả','Đã phản hồi','Chưa phản hồi']} handleClickItem={handleClickItemFilter}/>
            </div>
            <div style={{ marginTop: '40px' }}>
                <ComplaintTable  />
            </div>
        </div>
    );
}

export default ComplaintManagement;