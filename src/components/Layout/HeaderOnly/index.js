import {HeaderPage } from "../components/Header";



function HeaderOnlyLayout({ children }) {
    return (
        <div >
            <HeaderPage isFixed={false}/>
            <div className='Container'> 
                {children}
            </div>
        </div>
    );
}

export default HeaderOnlyLayout;