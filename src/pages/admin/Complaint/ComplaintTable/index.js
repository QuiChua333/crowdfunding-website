import classNames from 'classnames/bind';

import styles from './ComplaintTable.module.scss';
import ComplaintRow from './ComplaintRow';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ComplaintTable({reports, getAllReports, handleViewReport}) {

    const [listReports, setListReports] = useState([]);
    useEffect(() => {
        setListReports(prev => {
            const state = [...reports].map(item => {
                return {
                    ...item,
                    isChecked: false
                    
                }
            })
            return state
        })
    },[reports])

    return (
        <div className={cx('wrapper')}>
            <table>
                <thead>
                    <th>TIÊU ĐỀ</th>
                    <th>THÔNG TIN NGƯỜI DÙNG</th>
                    <th>NGÀY</th>
                    <th>TRẠNG THÁI</th>
                    <th></th>
                </thead>
                <tbody>
                    {listReports?.map((item, index) => {
                        return <ComplaintRow key={index} report={item} index={index} getAllReports={getAllReports} handleViewReport={handleViewReport}/>;
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ComplaintTable;
