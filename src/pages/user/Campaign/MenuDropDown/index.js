import classNames from "classnames/bind";

import styles from './MenuDropDown.module.scss'
const cx = classNames.bind(styles)

function MenuDropDown({ menu, onClickItem, index }) {
    const handleClickItem = (item) => {
        onClickItem(item,index)
    }
    return (
        <div className={cx('category-menu')}>
            {
                menu.map((item, index) => {
                    return (
                        <div className={cx('categoryMenu-sub')} key={index}>
                            <div className={cx('categoryMenu-sub-header')}>
                                {item.category}
                            </div>

                            {
                                item.listItem.map((item2, index2) => {
                                    return (
                                        <div onClick={() => handleClickItem(item2)} key={index2} className={cx('categoryMenu-sub-item')}>
                                            {item2}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default MenuDropDown;