import classNames from "classnames/bind";
import styles from './Dropdown.module.scss'
const cx = classNames.bind(styles)
function DropDown({ active, activeHeader, listFieldGrouByCategory, style }) {
    const handleClickField = (filed) => {
        const queryParams = { field: filed };

         const queryString = new URLSearchParams(queryParams).toString();

    // Tạo đường dẫn với tham số truy vấn
    const pathWithQuery = `/explore?${queryString}`;

    // Mở một trang mới hoặc cửa sổ mới
    window.location.href = pathWithQuery
    }
    const handleClickCategory = (category) => {
        const queryParams = { category: category };

         const queryString = new URLSearchParams(queryParams).toString();

    // Tạo đường dẫn với tham số truy vấn
    const pathWithQuery = `/explore?${queryString}`;

    window.location.href = pathWithQuery
    }
    return (
        <div className={cx('wrapper', { active, activeHeader })} style={style}>
            <div className={cx('inner')}>
                <div className={cx('banner-wrapper')}>
                    <a onClick={() => handleClickCategory('Tất cả')} className={cx('label-banner')}>Khám Phá Toàn Bộ Dự Án</a>
                    <div className={cx('banner')}>
                        <img src="https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,w_auto,g_center,q_auto:best,dpr_1.3,f_auto/homepage/cf-bg-desktop-lg.jpg" />
                        <p className={cx('description')}>
                            GIVE FUN
                        </p>
                    </div>

                </div>
                <div className={cx('categories')}>
                    {
                        listFieldGrouByCategory.map((item, index) => {
                            return <div key={index} className={cx('category', {third: index===2, second: index===1, first: index===0})}>
                                <a onClick={() => handleClickCategory(item.category)} className={cx('label')}>{item.category}</a>

                                <div className={cx('list-field', {first: index===0})}>
                                    
                                    {
                                        item.listFields.map((item2, index2) => {
                                          
                                                return <div onClick={() => handleClickField(item2)} key={index2} className={cx('field-item')} ><span><a>{item2}</a></span></div>
                                        })
                                    }
                                </div>
                            </div>
                        })
                    }
                
                </div>

            </div>
        </div>
    );
}

export default DropDown;