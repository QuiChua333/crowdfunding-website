import Home from '~/pages/user/Home'
import Following from '~/pages/Following'
import Upload from '~/pages/Upload'
import { DefaultLayout, HeaderOnlyLayout, AdminLayout } from '~/components/Layout'
import { HomeLayout } from '~/components/Layout'
import Explore from '~/pages/user/Explore'
import SignUp from '~/pages/SignUp'
import Login from '~/pages/Login'
import ForgetPassword from '~/pages/FogetPassword'
import { BasicCampaign, ContentCampaign, PerksCampaign, NewPerk, ItemsCampaign, NewItem, TeamCampaign, FundingCampaign, SettingCampaign } from '~/pages/user/Campaign'
import Payment from '~/pages/user/Payment'
import { EditProfile, EditSetting } from '~/pages/user/Profile/EditProfile'
import { ViewCampaigns } from '~/pages/user/Profile/ViewProfile'

import { CampaignManagement, UserManagement, VerifyCampaignManagement, ProgressAndContributeManagement, ComplaintManagement } from '~/pages/admin'
import DetailProject from '~/pages/user/DetailProject'
import DetailPerk from '~/pages/user/DetailPerk'

import { PrefixCampaign } from '~/pages/PrefixPage'


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
    { path: '/campaigns/:id/edit/team', component : TeamCampaign, layout: null},
    { path: '/campaigns/:id/edit/funding', component : FundingCampaign, layout: null},
    { path: '/campaigns/:id/edit/settings', component :SettingCampaign , layout: null},
    { path: '/projects/:id/payments/new/checkout', component :Payment , layout: null},
    { path: '/individuals/:id/edit/profile', component :EditProfile , layout: HeaderOnlyLayout},
    { path: '/individuals/:id/edit/settings', component :EditSetting , layout: HeaderOnlyLayout},
    { path: '/individuals/:id/campaigns', component :ViewCampaigns , layout: HeaderOnlyLayout},
    { path: '/sign-up', component: SignUp, layout: null},
    { path: '/login', component: Login, layout: null},
    { path: '/forgot', component: ForgetPassword, layout: null},




    // admin

    { path: '/admin/campaigns', component :CampaignManagement , layout: AdminLayout},
    { path: '/admin/users', component :UserManagement , layout: AdminLayout},
    { path: '/admin/verify-campaign', component :VerifyCampaignManagement , layout: AdminLayout},
    { path: '/admin/progress-contribute', component :ProgressAndContributeManagement , layout: AdminLayout},
    { path: '/admin/complaint', component :ComplaintManagement , layout: AdminLayout},
    { path: '/admin', component :CampaignManagement , layout: AdminLayout},


    { path: '/project/:id/detail', component: DetailProject, layout: DefaultLayout},
    { path: '/project/perk/detail', component: DetailPerk, layout: null},



    // Prefix page
    { path: '/start-a-campaign', component: PrefixCampaign, layout: HeaderOnlyLayout},

]

const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }