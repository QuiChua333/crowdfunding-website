import { Navigate, Outlet } from "react-router-dom";

function AdminRoutes() {
    const token = localStorage.getItem('accessToken') || false
    return (
        token? <Outlet /> : <Navigate to='/login'/>
    );
}

export default AdminRoutes;