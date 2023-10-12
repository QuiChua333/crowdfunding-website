import Home from '~/pages/user/Home'
import Following from '~/pages/Following'
import Upload from '~/pages/Upload'
import { HeaderOnlyLayout } from '~/components/Layout'
import { HomeLayout } from '~/components/Layout'
import Explore from '~/pages/user/Explore'
import { BasicCampaign } from '~/pages/user/Campgains'

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout},
    { path: '/following', component: Following},
    { path: '/upload', component: Upload},
    { path: '/explore/:type', component : Explore, layout: HeaderOnlyLayout },
    { path: '/campaigns/:id/edit/basic', component : BasicCampaign, layout: null}
]

const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }