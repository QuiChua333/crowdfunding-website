import {HeaderPage } from "../components/Header";
import Footer from "../components/Footer";


function HeaderOnlyLayout({ children }) {
    return (
        <div >
            <HeaderPage />
            <div className='Container'> 
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default HeaderOnlyLayout;