import React from 'react'
import images from '~/assets/images'
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FaMobileScreenButton, FaLocationDot, FaFacebook, FaTwitter, FaYoutube, FaInstagram} from "react-icons/fa6";
import { FiMail } from 'react-icons/fi'
const cx = classNames.bind(styles);


function Footer() {
  return (
    <div className={cx('container-footer')}>
      <div className={cx('content-1')}>
          <img className={cx('img-logo')} src={images.logo_web} alt="logo"/>
          <p className={cx('title-web')}>Give Fund</p>
          <p className={cx('desc')}>Nền tảng gây quỹ cộng đồng trực tuyến tiện lợi, tin cậy và minh bạch.</p>
      </div>
      <div className={cx('content-2')}>

        <div className={cx('content-col-1')}>
          <a href="">
            <h3>Giới thiệu</h3>
          </a>
          <a href="">
            <h3>Điều khoản - Điều kiện</h3>
          </a>
          <a href="">
            <h3>Chính sách cá nhân</h3>
          </a>
          <a href="">
            <h3>Về chúng tôi</h3>
          </a>
        </div>

        <div className={cx('content-col-2')}>
          <div className={cx('content-row')}>
            <p><FaMobileScreenButton/> Hotline: </p>
            <p className={cx('ms-3 fst-italic')}>0379361211</p>
          </div>

          <div className={cx('content-row')}>    
            <p><FiMail/> Email: </p>
            <p className={cx('ms-3 fst-italic')}>hotro@givefund.com</p>
          </div>
          
          <div className={cx('content-row')}>           
            <p><FaLocationDot /> Vị trí: </p>
            <p className={cx('ms-3 fst-italic')}>Số 999, Hoàng Văn Thống, Biên Hòa, TPHCM</p>
          </div>
          
          <p>&copy; givefund.vn - All Rights Reserved</p>
        </div>

        <div className={cx('content-col-3')}>
          <a href=""><FaFacebook className={cx('me-4 text-white')}/></a>
          <a href=""><FaTwitter className={cx('me-2 text-white')}/></a>
          <a href=""><FaYoutube className={cx('ms-2 text-white')}/></a>
          <a href=""><FaInstagram className={cx('ms-4 text-white')}/></a>
        </div>
      </div>
    </div>
  )
}

export default Footer