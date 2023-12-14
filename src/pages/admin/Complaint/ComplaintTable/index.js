import classNames from 'classnames/bind';

import styles from './ComplaintTable.module.scss';
import ComplaintRow from './ComplaintRow';
import { IoSquareOutline, IoCheckboxSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ComplaintTable({}) {
    const listComplaintDefault = [
        {
            id: '1',
            title: '1 TÔI GẶP MỘT SỐ VẤN ĐỀ KHI CHUYỂN KHOẢN CẦN ĐƯỢC HỖ TRỢ 1 TÔI GẶP MỘT SỐ VẤN ĐỀ KHI CHUYỂN KHOẢN CẦN ĐƯỢC HỖ TRỢ',
            date: '21/12/2023',
            content: 'Vào ngày tôi có ủng hộ một dự án, nhưng khi chuyển khoản thì tui gặp vấn đề.',
            images: [
                'https://png.pngtree.com/thumb_back/fw800/background/20230523/pngtree-sad-pictures-for-desktop-hd-backgrounds-image_2690576.jpg',
            ],
            user: {
                name: 'Nguyễn Văn A',
                avatar: 'https://static.kino.de/2e/2e/16/c6ea460b1e9969c368a455212c_ZmMgYTBlNjIwYTdmZmZmIDE5MjAgMTA4MAMyZWNhMGU2M2E1Mg==_is-avatar-the-last-airbender-animated-nick-series-on-netflix.jpeg',
                email: 'nguyenvana@gmail.com',
            },
            responsed: {
                content: 'ok bạn nha',
                date: '21/12/2023',
                images: [
                    'https://png.pngtree.com/thumb_back/fw800/background/20230523/pngtree-sad-pictures-for-desktop-hd-backgrounds-image_2690576.jpg',
                ],
            },
            isResponsed: false,
            isChecked: false,
        },
        {
            id: '2',
            title: '2 TÔI GẶP MỘT SỐ VẤN ĐỀ KHI CHUYỂN KHOẢN CẦN ĐƯỢC HỖ TRỢ',
            date: '20/12/2023',
            content: 'Vào ngày tôi có ủng hộ một dự án, nhưng khi chuyển khoản thì tui gặp vấn đề.',
            images: [
                'https://png.pngtree.com/thumb_back/fw800/background/20230523/pngtree-sad-pictures-for-desktop-hd-backgrounds-image_2690576.jpg',
            ],
            user: {
                name: 'Nguyễn Văn B',
                avatar: 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
                email: 'nguyenvanb@gmail.com',
            },
            responsed: {
                content: 'ok bạn nha',
                date: '21/12/2023',
                images: [
                    'https://png.pngtree.com/thumb_back/fw800/background/20230523/pngtree-sad-pictures-for-desktop-hd-backgrounds-image_2690576.jpg',
                ],
            },
            isResponsed: false,
            isChecked: false,
        },
        {
            id: '3',
            title: '3 TÔI GẶP MỘT SỐ VẤN ĐỀ KHI CHUYỂN KHOẢN CẦN ĐƯỢC HỖ TRỢ',
            date: '20/12/2023',
            content: 'Vào ngày tôi có ủng hộ một dự án, nhưng khi chuyển khoản thì tui gặp vấn đề.',
            images: [
                'https://png.pngtree.com/thumb_back/fw800/background/20230523/pngtree-sad-pictures-for-desktop-hd-backgrounds-image_2690576.jpg',
            ],
            user: {
                name: 'Nguyễn Văn C',
                avatar: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
                email: 'nguyenvanc@gmail.com',
            },
            responsed: {
                content: 'ok bạn nha',
                date: '21/12/2023',
                images: [
                    'https://png.pngtree.com/thumb_back/fw800/background/20230523/pngtree-sad-pictures-for-desktop-hd-backgrounds-image_2690576.jpg',
                ],
            },
            isResponsed: false,
            isChecked: false,
        },
    ];
    const [listComplaint, setListComplaint] = useState([...listComplaintDefault]);
    const [isCheckAll, setCheckAll] = useState(false);

    const handleClickCheckALl = () => {
        setCheckAll((prev) => !prev);
        setListComplaint((prev) => {
            const nextState = [...prev].map((item, index) => {
                return { ...item, isChecked: !isCheckAll };
            });
            return nextState;
        });
    };
    const handleSetChecked = (indexChange, checked) => {
        setListComplaint((prev) => {
            const nextState = [...prev].map((item, index) => {
                if (index === indexChange) {
                    return { ...item, isChecked: checked };
                } else return { ...item };
            });
            return nextState;
        });
    };
    useEffect(() => {
        const checkAll = listComplaint.every((item) => item.isChecked === true);
        setCheckAll(checkAll);
    }, [listComplaint]);

    return (
        <div className={cx('wrapper')}>
            <table>
                <thead>
                    <th className={cx('checkbox')}>
                        <span onClick={handleClickCheckALl}>
                            {!isCheckAll ? (
                                <IoSquareOutline style={{ fontSize: '26px', color: '#ccc' }} />
                            ) : (
                                <IoCheckboxSharp style={{ fontSize: '26px', color: '#000' }} />
                            )}
                        </span>
                    </th>
                    <th>TIÊU ĐỀ</th>
                    <th>THÔNG TIN NGƯỜI DÙNG</th>
                    <th>NGÀY</th>
                    <th>TRẠNG THÁI</th>
                    <th></th>
                </thead>
                <tbody>
                    {listComplaint.map((item, index) => {
                        return <ComplaintRow key={index} item={item} index={index} setChecked={handleSetChecked} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ComplaintTable;
