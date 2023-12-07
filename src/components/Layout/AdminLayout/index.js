
import AdminSidebar from "./AdminSidebar";
import Footer from "../components/Footer";
import AdminHeader from "./AdminHeader";
import { useState } from "react";
function AdminLayout({ children }) {
    const [title,setTitle] = useState('Quản lý dự án');
    return (
        <div>
            <div className='Container' style={{ display: 'flex' }}>
                <AdminSidebar setTitle={setTitle}/>
                <div style={{flex: '1'}}>
                    <AdminHeader title={title}/>
                    <div className='content' style={{ padding: '30px 50px 30px 50px'}}>
                        {children}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default AdminLayout;