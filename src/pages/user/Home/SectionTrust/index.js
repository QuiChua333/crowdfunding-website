import classNames from "classnames/bind";
import { useRef, useEffect, useState } from "react";


import styles from './SectionTrust.module.scss'
import images from "~/assets/images/section_trust";
const cx = classNames.bind(styles)

function SectionTrust() {
    const [active, setActive] = useState(false);
    const [opacityH2, setOpacityH2] = useState(0);
    const [opacityTitle, setOpacityTitle] = useState(0);
    const [opacitySpan1, setOpacitySpan1] = useState(0);
    const [opacitySpan2, setOpacitySpan2] = useState(0);
    const [opacitySpan3, setOpacitySpan3] = useState(0);
    const element = useRef();
    const elementTitle = useRef();
    const elementSpan1 = useRef();

    
    useEffect(() => {
        const reveal = () => {
            if (element.current) {
                let windowHeight = window.innerHeight;
                let revealTop = element.current.getBoundingClientRect().top;
                let revealTopTitle = elementTitle.current.getBoundingClientRect().top;
                var revealPoint = 250;
                setActive(revealTop < windowHeight - revealPoint)
                let opacity = 1 - (revealTop-160)/(windowHeight - revealPoint) + 0.4;
                let opacity2 = 1 - (revealTop<0? Math.abs(revealTop): revealTop-20)/(windowHeight - revealPoint) + 0.4;
                let opacity3 = 1 - (revealTop<0? Math.abs(revealTop): revealTop+100)/(windowHeight - revealPoint) + 0.4;
                let opacity4 = 1 - (revealTop<0? Math.abs(revealTop): revealTop+180)/(windowHeight - revealPoint) + 0.4;
                let opacity5 = 1 - (revealTop<0? Math.abs(revealTop): revealTop+260)/(windowHeight - revealPoint) + 0.7;
                setOpacityH2(opacity)
                setOpacityTitle(opacity2)
                setOpacitySpan1(opacity3)
                setOpacitySpan2(opacity4)
                setOpacitySpan3(opacity5)
                // setOpacityTitle(opacity - 0.1)
                // setOpacitySpan1(opacity - 0.2)
                // setOpacitySpan2(opacity - 0.3)
                // setOpacitySpan3(opacity - 0.4)
                // let opacity2 = 1 - revealTopTitle/(windowHeight);
                // // let opacity2 = opacity-1 + (1-);
                // setOpacityTitle(opacity2)
                
               
            }
        }
        window.addEventListener('scroll',reveal);

        return () => {
            window.removeEventListener('scroll',reveal);
        }
    },[active]);
    
    return (
        <div className={cx('wrapper', { active: active})} ref={element}>
            <div className={cx('content')}> 
                <h2 style={{opacity: `${opacityH2}`, transition: 'all 0.2s ease', alignItems: 'center'}}><img src={images.logo} style={{marginBottom: '4px'}}/> Trust  &  Safety</h2>
                <p className={cx('title')} ref={elementTitle} style={{opacity: `${opacityTitle}`, transition: 'all 0.2s ease'}}>We have your back.</p>
                <p className={cx('body')}>
                    <span ref={elementSpan1} style={{opacity: `${opacitySpan1}`, transition: 'all 0.2s ease'}}>With a global team dedicated to trust and safety, </span>
                    <span style={{opacity: `${opacitySpan2}`, transition: 'all 0.2s ease'}}>we’ve successfully managed fundraisers worldwide for more than a decade. </span>
                    <span style={{opacity: `${opacitySpan3}`, transition: 'all 0.2s ease'}}>Don’t worry about a thing, we’ve got you covered.</span>
                </p>
            </div>
            
        </div>
    );
}

export default SectionTrust;