import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import baseURL from "~/utils/baseURL";
import customAxios from '~/utils/customAxios'
function AdminRoutes() {

    const [isAdmin, setAdmin] = useState(false)
    const checkAdmin = async () => {
        try {
            const token = localStorage.getItem('accessToken') || false
            if (!token) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
            }
            else {
                const res = await customAxios.get(`${baseURL}/user/checkAdmin`)
                if (!res.data.data) {
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    window.location.href = '/login'
                }
                setAdmin(true)
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        checkAdmin();
    }, [])
    return (
        <>
            {
                isAdmin &&
                <Outlet />
            }
        </>
    );
}

export default AdminRoutes;