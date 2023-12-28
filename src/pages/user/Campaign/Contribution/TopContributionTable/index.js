import classNames from "classnames/bind";

import styles from './TopContributionTable.module.scss'
import TopContributionRow from "./TopContributionRow";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import formatMoney from "~/utils/formatMoney";
import convertDate from "~/utils/convertDate2";

const cx = classNames.bind(styles)

function TopContributionTable({listUserContribution, setShowModalGivePerk,setUserContributionGivePerk}) {
    
    return (
        <div className={cx('wrapper')}>
            <table>
                <thead>
                    <tr>
                        <th className={cx('top')}>TOP</th>
                        <th className={cx('email')}>EMAIL HỆ THỐNG</th>
                        <th className={cx('num')}>SỐ LƯỢT ĐÓNG GÓP</th>
                        <th className={cx('total')}>TỔNG TIỀN ĐÓNG GÓP</th>
                        <th className={cx('action')}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUserContribution?.map((item, index) => {
                            return <TopContributionRow key={index} userContribution={item} index={index} setShowModalGivePerk={setShowModalGivePerk} setUserContributionGivePerk={setUserContributionGivePerk}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TopContributionTable;