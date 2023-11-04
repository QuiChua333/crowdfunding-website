import Home from '~/pages/user/Home'
import Following from '~/pages/Following'
import Upload from '~/pages/Upload'
import { DefaultLayout, HeaderOnlyLayout } from '~/components/Layout'
import { HomeLayout } from '~/components/Layout'
import Explore from '~/pages/user/Explore'
import SignUp from '~/pages/SignUp'
import Login from '~/pages/Login'
import ForgetPassword from '~/pages/FogetPassword'
import { BasicCampaign, ContentCampaign, PerksCampaign, NewPerk, ItemsCampaign, NewItem } from '~/pages/user/Campaign'

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout},
    { path: '/following', component: Following},
    { path: '/upload', component: Upload},
    { path: '/explore/:type', component : Explore, layout: HeaderOnlyLayout },
    { path: '/campaigns/:id/edit/basic', component : BasicCampaign, layout: null},
    { path: '/campaigns/:id/edit/story', component : ContentCampaign, layout: null},
    { path: '/campaigns/:id/edit/perks/table', component : PerksCampaign, layout: null},
    { path: '/campaigns/:id/edit/perks/new', component : NewPerk, layout: null},
    { path: '/campaigns/:id/edit/items/table', component : ItemsCampaign, layout: null},
    { path: '/campaigns/:id/edit/items/new', component : NewItem, layout: null},
    { path: '/sign-up', component: SignUp, layout: null},
    { path: '/login', component: Login, layout: null},
    { path: '/forgot', component: ForgetPassword, layout: null},
]

const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }