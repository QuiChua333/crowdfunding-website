import { HeaderPage } from '../components/Header'
import Sidebar from './Sidebar'

function DefaultLayout({ children }) {
    return (
        <div>
            <HeaderPage />
            <div className='Container'>
                <Sidebar />
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;