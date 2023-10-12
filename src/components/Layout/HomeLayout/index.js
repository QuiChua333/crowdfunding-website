import {HeaderHome} from "../components/Header";
import Sidebar from "../DefaultLayout/Sidebar";
import Section from "./Section";

function HomeLayout({ children }) {
    return (
        <div>
            <HeaderHome />
            <Section />
            <div className='Container'>
                <Sidebar />
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default HomeLayout;