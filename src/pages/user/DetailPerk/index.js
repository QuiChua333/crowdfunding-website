import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './DetailPerk.module.scss';
import ItemDetailPerk from '~/components/ItemDetailPerk';
import ItemDetailPerkSelect from '~/components/ItemDetailPerkSelect';
import { useLocation } from 'react-router-dom';
import ModalDetailPerk from './ModalDetailPerk'

const cx = classNames.bind(styles);


function DetailPerk() {

  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const itemPerkSelectedFirst = location.state;
  // fetch cái list perk theo id của project 
  var listAllPerk = [
    {
        id: 'perk1',
        image: 'https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_762,g_center,q_auto:best,dpr_1.3,f_auto,h_506/mtixazdzdtgna6xcucwv',
        name: 'Camera Sling 9L - Early Bird',
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
        quantity: 24,
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
      setListSelected(prev => {
        return [...prev, {...newItem, oldIndex:index}]
      })
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
        addItemIntoListSelected(listPerks[i]);
      }
    }
  }, [listPerks.length]);


  const addItemIntoListSelected = (item) => {
    setListSelected(prev => {
      return [...prev, item];
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


  return (
    <div style={{width: '100%'}} className={cx('disableSelect')}>
      <p style={{width: '100%', textAlign: 'center', margin: '6px 0 20px', fontSize: '28px', fontWeight: 'bold', color: '#207d5d', borderBottom: '1px solid #ccc'}}>GIVEFUND</p>
      <div style={{display: 'flex', height: '100%', padding: '10px 140px', margin: '10px 0'}}>
        <div style={{width: '52%', marginRight: '30px'}}>
          <p style={{fontSize: '20px', fontWeight: '600', marginLeft: '20px'}}>Danh sách quà tặng có thể thêm</p>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
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

        <div style={{width: '48%', marginLeft: '30px'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: '20px', fontWeight: '600', marginLeft: '20px', marginBottom: '20px'}}>Your Contribution<span style={{fontSize: '14px', fontWeight: '500', marginLeft: '10px', color: '#616161'}}>(<span>{listSelected.length}</span> item)</span></span>
            <div style={{display: 'flex', flexDirection: 'column', height: '360px', overflowY: 'scroll'}}>
              {
              listSelected.map((item, index) => {
                return <ItemDetailPerkSelect setPerkSelected={setPerkSelected} item={item} key={index} index={index} setIsOpenModalUpdate={setIsOpenModalUpdate} setIsOpenModal={setIsOpenModal}/>
              })
            }
            </div>
          </div>

          <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', padding: '30px 40px', border: '1px solid #ccc', borderRadius: '4px'}}>
            <span style={{fontSize: '20px', fontWeight: '600', marginBottom: '20px', marginLeft: '-20px'}}>Contribution summary</span>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '17px', fontWeight: '300'}}>
              <span>Subtotal</span>
              <span>$25</span>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '17px', fontWeight: '300', marginTop: '6px'}}>
              <span>Shipping</span>
              <span>$15</span>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '24px', fontWeight: '450', marginTop: '30px'}}>
              <span>Total</span>
              <span>$40</span>
            </div>

            <div style={{height: '1px', backgroundColor: '#ccc', marginTop: '10px'}}></div>

            <button className={cx('btn-checkout')} type="button">PROCEED TO CHECKOUT</button>
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