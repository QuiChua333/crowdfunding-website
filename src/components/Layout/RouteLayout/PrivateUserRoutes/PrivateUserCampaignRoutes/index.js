import { Navigate, Outlet, useParams } from "react-router-dom";
import baseURL from "~/utils/baseURL";
import customAxios from '~/utils/customAxios'
import { useEffect, useState } from "react";
import PageNotFound from "~/pages/PrefixPage/PageNotFound";
function PrivateUserCampaignRoutes() {
    const {id} = useParams()
    const [isMatched, setMatched] = useState(null)
    const checkCampaignOfUser = async () => {
        try {
            const token = localStorage.getItem('accessToken') || false
            if (!token) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
            }
            else {
                const res = await customAxios.get(`${baseURL}/campaign/checkCampaignOfUser/${id}`)
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
        checkCampaignOfUser();
    }, [])
    return (
        // isMatched? <Outlet /> : <Navigate to='/login'/>
        <>
            {isMatched && <Outlet />}
            {isMatched === false &&  <PageNotFound />}
        </>

    );
}

export default PrivateUserCampaignRoutes;