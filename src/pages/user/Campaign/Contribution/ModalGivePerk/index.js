import classNames from "classnames/bind";
import styles from './ModalGivePerk.module.scss'
import { useDispatch } from "react-redux";
import { setLoading, setMessageBox } from "~/redux/slides/GlobalApp";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineSearch, AiFillCaretDown, AiFillCaretUp, AiOutlineSave } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { BiMap, BiMapPin, BiSitemap, BiPhoneCall, BiMessageSquareDetail } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import ItemPayment from "~/pages/user/Payment/ItemPayment";
import customAxios from '~/utils/customAxios'
import formatDate from "~/utils/formatDate";
import formatMoney from "~/utils/formatMoney";
import baseURL from "~/utils/baseURL";
import ModalPerkOption from "./ModalPerkOption";
import { toast } from "react-toastify";
import convertDate from "~/utils/convertDate2";
import ItemPerk from "./ItemPerk";
import ItemSelected from "./ItemSelected";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles)
function ModalGivePerk({ setShowModalGivePerk, contribution, handleChangeStatus, userContributionGivePerk }) {
    const { id } = useParams()
    const dispatch = useDispatch();
    const [listPerks, setListPerks] = useState([])
    const [listPerksSelected, setListPerksSelected] = useState([])
    const getListPerkByCampaign = async () => {
        try {
            const res = await customAxios.get(`${baseURL}/perk/getPerksHasListItemsByCampaignId/${id}`)
            setListPerks(res.data.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    const [perkInModal, setPerkInModal] = useState({})
    useEffect(() => {
        getListPerkByCampaign()
    }, [])
    const [showModalOption, setShowModalOption] = useState(false)
    const handleShowModalOption = (item) => {
        setPerkInModal({ ...item })
        setShowModalOption(true)
    }
    const handleAddIntoListPerksSelected = (item) => {
        setListPerksSelected(prev => {
            const state = [...prev];
            state.push({
                perkId: item._id,
                perkImage: item.image.url,
                perkTitle: item.title,
                quantity: 1,
                price: item.price,
                options: item.items.reduce((acc, cur) => {
                    if (cur.optionsSelected && cur.optionsSelected.length > 0) {
                        return (

                            [...acc, {
                                name: cur.item.name,
                                optionsString: cur.optionsSelected.map(i => i.value).join('/')
                            }]
                        )
                    } else {
                        return [...acc, {
                            name: cur.item.name,
                            optionsString: ''
                        }]
                    }
                }, [])
            })
            return state
        })
        setListPerks(prev => [...prev].map(item2 => {
            if (item2._id === item._id) {
                return {
                    ...item2,
                    isSelected: true
                }
          
            }
            else return item2
        }))
        setShowModalOption(false)
    }
    const handleClickSubItemSelected = (id) => {
        setListPerksSelected(prev => [...prev].map(item => {
            if (item.perkId === id) {
                return {
                    ...item,
                    quantity: item.quantity - 1 === 0 ? item.quantity : item.quantity - 1
                }
            }
            else return item
        }))
    }
    const handleClickAddItemSelected = (id) => {
        setListPerksSelected(prev => [...prev].map(item => {
            if (item.perkId === id) {
                const quantityAvailable = listPerks.find(i=> i._id === id).quantity
                return {
                    ...item,
                    quantity: item.quantity === quantityAvailable ? item.quantity : item.quantity + 1
                }
            }
            else return item
        }))
    }
    const handleRemoveItemSelected = (id) => {
        setListPerksSelected(prev => [...prev].filter(item => item.perkId !== id))
        console.log('id',id)
        setListPerks(prev => [...prev].map(item2 => {
            console.log('item2',item2._id)
            if (item2._id === id) {
                return {
                    ...item2,
                    isSelected: false
                }
          
            }
            else return item2
        }))
    }

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('body')}>
                    <h3 className={cx('title')}>TẶNG ĐẶC QUYỀN</h3>
                    <p className={cx('description')}>Tên người dùng hệ thống: {userContributionGivePerk.user?.fullName}</p>
                    <p className={cx('description')}>Email: {userContributionGivePerk.user?.email}</p>
                    <div style={{ marginBottom: '32px' }}>
                        <div className={cx('perk-inner')}>
                            <div className={cx('list-perks-wrapper')}>
                                <label className={cx('label')}>Danh sách các đặc quyền</label>
                                <div className={cx('list-perks')}>
                                    {
                                        listPerks.map((perk, index) => {
                                            return <ItemPerk key={index} item={perk} handleClickItem={handleShowModalOption} />
                                        })
                                    }
                                </div>
                            </div>

                            <div className={cx('list-perks-selected')}>
                                <label className={cx('label')}>Danh sách chọn</label>
                                <div className={cx('list-perks-selected')}>

                                    {
                                        listPerksSelected.map((item, index) => {
                                            return <ItemSelected item={item} key={index} handleClickSub={handleClickSubItemSelected} handleClickAdd={handleClickAddItemSelected}
                                                handleRemove={handleRemoveItemSelected}
                                            />
                                        })

                                    }

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={cx('section-button')}>



                        <a className={cx('btn', 'btn-ok')}>Xác nhận</a>

                    </div>
                    <span onClick={() => setShowModalGivePerk(false)} className={cx('editFile-icon')}><IoCloseSharp style={{ color: '#7a69b3', fontSize: '22px' }} /></span>
                </div>
            </div>
            {
                showModalOption &&
                <ModalPerkOption perk={perkInModal} setShowModalOption={setShowModalOption} handleAddPerk={handleAddIntoListPerksSelected} />
            }
        </>
    );
}

export default ModalGivePerk;