import { Navigate, Outlet, useParams } from "react-router-dom";
import baseURL from "~/utils/baseURL";
import customAxios from '~/utils/customAxios'
import PageNotFound from "~/pages/PrefixPage/PageNotFound";
import { useEffect, useState } from "react";

function PrivateUserIndividualsRoutes() {
    const {id} = useParams()
    const [isMatched, setMatched] = useState(null)
    const checkIndividualOfUser = async () => {
        try {
            const token = localStorage.getItem('accessToken') || false
            if (!token) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
            }
            else {
                const res = await customAxios.get(`${baseURL}/user/checkIndividualOfUser/${id}`)
                if (!res.data.data) {
                    setMatched(false)
                }
                else {
                    setMatched(true)
                }
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        checkIndividualOfUser();
    }, [])
    return (
        // isMatched? <Outlet /> : <Navigate to='/login'/>
        <>
            {isMatched && <Outlet />}
            {isMatched === false && <PageNotFound />}
        </>

    );
}

export default PrivateUserIndividualsRoutes;