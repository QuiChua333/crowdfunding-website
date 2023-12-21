import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './DetailPerk.module.scss';
import ItemDetailPerk from '~/components/ItemDetailPerk';
import ItemDetailPerkSelect from '~/components/ItemDetailPerkSelect';
import { useLocation } from 'react-router-dom';
import ModalDetailPerk from './ModalDetailPerk'
import formatMoney from '~/utils/formatMoney';

const cx = classNames.bind(styles);


function DetailPerk() {

  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const itemPerkSelectedFirst = location.state;
  const [quantityContribute,setQuantityContribute] = useState(0)
  // fetch cái list perk theo id của project 
  var listAllPerk = [
    {
        id: 'perk1',
        image: 'https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_762,g_center,q_auto:best,dpr_1.3,f_auto,h_506/mtixazdzdtgna6xcucwv',
        name: 'Camera Sling 9L - Early New',
        price: 95,
        des: 'Save $25 by ordering today on Indiegogo. SHIPPING, VAT & DUTIES: Please note that the shipping fee covers ALL applicable shipping, VAT, and duties. You will not need pay any fees upon arrival. WANT TO ADD MORE ITEMS? If youd like to add other bags to your order you can do so on the following page after selecting this perk.',
        includeItems: [
            {
                name: 'Camera Sling 9L',
                options: [
                    {
                        name: 'Color',
                        itemsOption: ['Black', 'White', 'Gray'],
                    },
                    {
                        name: 'Size',
                        itemsOption: ['X', 'XL', '2xL'],
                    }
                ],
                // optionsSelected: [{name: '', value: ''}]
            }
        ],
        claimed: 10,
        quantity: 10,
        estimateShipping: 'December 2023',
        idProject: 'project1'
    },
    {
        id: 'perk2',
        image: 'https://c2.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_762,g_center,q_auto:best,dpr_1.3,f_auto,h_506/qnop6zs3pd2fozxak09u',
        name: 'Camera Sling 12L - Early Bird',
        price: 115,
        des: 'Save $25 by ordering today on Indiegogo. SHIPPING, VAT & DUTIES: Please note that the shipping fee covers ALL applicable shipping, VAT, and duties. You will not need pay any fees upon arrival. WANT TO ADD MORE ITEMS? If youd like to add other bags to your order you can do so on the following page after selecting this perk.',
        includeItems: [
            {
                name: 'Camera Sling 12L',
            }
        ],
        claimed: 8,
        quantity: 19,
        estimateShipping: 'October 2023',
        idProject: 'project1'
    },
    {
        id: 'perk3',
        image: 'https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_762,g_center,q_auto:best,dpr_1.3,f_auto,h_506/cyhnaum5uqrshdb4qbgr',
        name: 'Camera Sling 18L - Early Bird',
        price: 185,
        des: 'Save $35 by ordering today on Indiegogo. SHIPPING, VAT & DUTIES: Please note that the shipping fee covers ALL applicable shipping, VAT, and duties. You will not need pay any fees upon arrival. WANT TO ADD MORE ITEMS? If youd like to add other bags to your order you can do so on the following page after selecting this perk.',
        includeItems: [
            {
                name: 'Camera Sling 18L', 
                options: [
                  {
                      name: 'Color',
                      itemsOption: ['Black', 'White', 'Gray'],
                  }
              ],
            }
        ],
        claimed: 8,
        quantity: 19,
        estimateShipping: 'September 2023',
        idProject: 'project1'
    },
    {
        id: 'perk4',
        image: 'https://c2.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_762,g_center,q_auto:best,dpr_1.3,f_auto,h_506/dhtcxfnltlwrbwgwfxnd',
        name: 'One of Each Bag',
        price: 385,
        des: 'Save $95 by ordering today on Indiegogo. SHIPPING, VAT & DUTIES: Please note that the shipping fee covers ALL applicable shipping, VAT, and duties. You will not need pay any fees upon arrival. WANT TO ADD MORE ITEMS? If youd like to add other bags to your order you can do so on the following page after selecting this perk.',
        includeItems: [
            {
                name: 'Camera Sling 9L',
                options: [
                    {
                        name: 'Color',
                        itemsOption: ['Black', 'Stone', 'Sage', 'Rust'],
                    }
                ]
            },
            {
                name: 'Camera Sling 12L',
                options: [
                    {
                        name: 'Color',
                        itemsOption: ['Black', 'Stone', 'Sage', 'Rust'],
                    }
                ]
            },
            {
                name: 'Camera Sling 18L',
                options: [
                    {
                        name: 'Color',
                        itemsOption: ['Black', 'Stone', 'Sage', 'Rust'],
                    }
                ]
            },
        ],
        claimed: 7,
        quantity: 19,
        estimateShipping: 'July 2023',
        idProject: 'project1'
    },
  ]
  const [listSelected, setListSelected] = useState([])
  const [listPerks, setListPerks] = useState([]);
  const [perkSelected, setPerkSelected] = useState({});

  const handleSelectedItem = (index, newItem) => {
      setListPerks(prev => {
        const next = [...prev].map((item, index2) => {
            if (index2===index){
              return {...item, isSelected: true}
            }
            else return item;
        })
        return next;
      })
      addItemIntoListSelected({...newItem},index)
  }

  useEffect(() => {
    let arr = listAllPerk.map(item => {
      if (item.id === itemPerkSelectedFirst.id)
      {
        return (
          {
            ...item, 
            isSelected: true,
            includeItems: item.includeItems.map(itemInclude => {
              if (itemInclude.options && itemInclude.options.length > 0)
              {
                return {
                  ...itemInclude,
                  optionsSelected: itemInclude.options.map(i => {
                    return {
                      name: i.name,
                      value: i.itemsOption[0]
                    }
                  })
                }
              }
              else {
                return itemInclude;
              }
            })
          }
        )
      }
      else {
        return (
          {
            ...item, 
            isSelected: false,
            includeItems: item.includeItems.map(itemInclude => {
              if (itemInclude.options && itemInclude.options.length > 0)
              {
                return {
                  ...itemInclude,
                  optionsSelected: itemInclude.options.map(i => {
                    return {
                      name: i.name,
                      value: i.itemsOption[0]
                    }
                  })
                }
              }
              else {
                return itemInclude;
              }
            })
          }
        )
      }
    })
    setListPerks(arr);
  }, []);

  useEffect(() => {
    for (let i = 0; i < listPerks.length; i++) {
      if (listPerks[i].isSelected === true)
      {
        addItemIntoListSelected(listPerks[i],i);
      }
    }
  }, [listPerks.length]);

  useEffect(() => {
    setQuantityContribute(prev => {
      const res = listSelected.reduce((acc,cur) => {return acc + cur.quantityOrder},0);
      return res;
    })
  }, [listSelected]);

  const addItemIntoListSelected = (item,index) => {
    setListSelected(prev => {
      return [...prev, {
        ...item,
        oldIndex: index,
        quantityOrder: 1,
      }];
    })
  }

  const handleEditListSelected = (index, newItem) => {
    setListSelected(prev => {
      return [...prev].map((item2, index2) => {
        if (index2 === index) {
          return {
            ...newItem
          }
        }
        else {
          return item2;
        }
      })
    })
  }
  const handleChangeQuantityOrder = (type,index) => {
      setListSelected(prev => {
        return [...prev].map((item2, index2) => {
          if (index2 === index) {
            return {
              ...item2,
              quantityOrder: type==='sub'? item2.quantityOrder - 1 : item2.quantityOrder + 1
            }
          }
          else {
            return item2;
          }
        })
      })
  }

  const handleClickRemoveItem = (index) => {
    for (let i = 0; i < listPerks.length; i++) {
      if (listPerks[i].id === listSelected[index].id) {
        listPerks[i].isSelected = false;
      }
    }
    setListSelected(prev => {
      let res = [...prev];
      res.splice(index, 1);
      return res
    })
}
  
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(() => {
      const res = listSelected.reduce((acc,cur) => {return acc + cur.quantityOrder*cur.price}, 0);
      return res;
    })
  }, [listSelected])


  return (
    <div className={cx('disableSelect', 'wrapper')}>
      <p className={cx('title-website')}>GIVE-FUN</p>
      <div className={cx('container-body')}>
        <div className={cx('container-body-1')}>
          <p className={cx('title')}>Danh sách quà tặng có thể thêm</p>
          <div className={cx('custom-scroll')}>
            {
              listPerks.map((item, index) => {
                return (
                  <ItemDetailPerk 
                    index={index}
                    key={index} 
                    item={item}
                    setPerkSelected={setPerkSelected}
                    setIsOpenModal={setIsOpenModal}
                    setIsOpenModalUpdate={setIsOpenModalUpdate}/>
                )
              })
            }
          </div>
        </div>

        <div className={cx('container-body-2')}>
          <div className={cx('container-1')}>
            <span className={cx('title')}>Đóng góp của bạn<span className={cx('value')}>(<span>{quantityContribute}</span> item)</span></span>
            <div className={cx('custom-scroll-2')}>
              {
                listSelected.map((item, index) => {
                  return <ItemDetailPerkSelect setPerkSelected={setPerkSelected} item={item} key={index} index={index} setIsOpenModalUpdate={setIsOpenModalUpdate} setIsOpenModal={setIsOpenModal} handleChangeQuantityOrder={handleChangeQuantityOrder} handleClickRemoveItem={handleClickRemoveItem}/>
                })
              }
            </div>
          </div>

          <div className={cx('container-2')}>
            <div className={cx('container-total')}>
              <span>Tổng tiền: </span>
              <span>{formatMoney(total)}</span>
            </div>

            <div className={cx('separate')}></div>

            <button className={cx('btn-checkout')} type="button">TIẾP TỤC THANH TOÁN</button>
          </div>
          
        </div>
      </div>
      {
        isOpenModal && <ModalDetailPerk handleEditListSelected={handleEditListSelected} isOpenModalUpdate={isOpenModalUpdate} handleSelectedItem={handleSelectedItem} itemPerk={perkSelected} setIsOpenModal={setIsOpenModal}/>
      }
    </div>
  )
}

export default DetailPerk