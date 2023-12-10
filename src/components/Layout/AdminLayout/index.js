
import AdminSidebar from "./AdminSidebar";
import Footer from "../components/Footer";
import AdminHeader from "./AdminHeader";
import { useState } from "react";
function AdminLayout({ children }) {
    const [title, setTitle] = useState('Quản lý dự án');
    return (
        <div>
            <div className='Container' style={{ display: 'flex' }}>
                <div>
                    <AdminSidebar setTitle={setTitle} />
                </div>
                <div style={{ flex: '1', minHeight: '100vh'}}>
                        <AdminHeader title={title} />
                    <div className='content' style={{ padding: '30px 50px 30px 50px' }}>
                        {children}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default AdminLayout;