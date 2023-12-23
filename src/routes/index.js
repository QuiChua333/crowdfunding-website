import Home from '~/pages/user/Home'
import { DefaultLayout, HeaderOnlyLayout, AdminLayout } from '~/components/Layout'
import { HomeLayout } from '~/components/Layout'
import Explore from '~/pages/user/Explore'
import SignUp from '~/pages/auth/SignUp'
import Login from '~/pages/auth/Login'
import ForgetPassword from '~/pages/auth/FogetPassword'
import { BasicCampaign, ContentCampaign, PerksCampaign, NewPerk, ItemsCampaign, NewItem, TeamCampaign, FundingCampaign, SettingCampaign } from '~/pages/user/Campaign'
import Payment from '~/pages/user/Payment'
import { EditProfile, EditSetting } from '~/pages/user/Profile/EditProfile'
import { ViewCampaigns } from '~/pages/user/Profile/ViewProfile'
import { CampaignManagement, UserManagement, VerifyCampaignManagement, ProgressAndContributeManagement, ComplaintManagement } from '~/pages/admin'
import DetailProject from '~/pages/user/DetailProject'
import DetailPerk from '~/pages/user/DetailPerk'
import VerifyUser from '~/pages/user/VerifyUser'
import { PrefixCampaign, SuccessVerifyInvitation } from '~/pages/PrefixPage'
import ProfilePersonal from '~/pages/user/Profile/ViewProfile/ProfilePersonal'
import TemplateEmailVerify from '~/pages/auth/TemplateEmailVerify'
import ResetPassword from '~/pages/auth/ResetPassword'
import Contributes from '~/pages/user/Profile/ViewProfile/Contributes'

const loginRoutes = [
    { path: '/sign-up', component: SignUp, layout: null },
    { path: '/login', component: Login, layout: null },
]
// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/explore', component: Explore, layout: HeaderOnlyLayout },
    { path: '/forgot', component: ForgetPassword, layout: null },
    { path: '/users/verify/:tokenLinkVerifyEmail', component: TemplateEmailVerify, layout: null },
    { path: '/user/:id/update-new-password/:tokenResetPassword', component: ResetPassword, layout: null },
    { path: '/project/:id/detail', component: DetailProject, layout: DefaultLayout },
    { path: '/project/:id/perk/detail', component: DetailPerk, layout: null },
    { path: '/project/:id/payments/new/checkout', component: Payment, layout: null },
    { path: '/individuals/:id/campaigns', component: ViewCampaigns, layout: HeaderOnlyLayout },
    { path: '/individuals/:id/profile', component: ProfilePersonal, layout: HeaderOnlyLayout },
    { path: '/start-a-campaign', component: PrefixCampaign, layout: HeaderOnlyLayout },
    { path: '/givefun/verify-user/:tokenLinkVerifyUser', component: VerifyUser, layout: null },
    { path: '/campaigns/team/invitation/:tokenLinkInvitation', component: SuccessVerifyInvitation, layout: null },
]
const adminRoutes = [
    { path: '/admin/campaigns', component: CampaignManagement, layout: AdminLayout },
    { path: '/admin/users', component: UserManagement, layout: AdminLayout },
    { path: '/admin/verify-campaign', component: VerifyCampaignManagement, layout: AdminLayout },
    { path: '/admin/progress-contribute', component: ProgressAndContributeManagement, layout: AdminLayout },
    { path: '/admin/complaint', component: ComplaintManagement, layout: AdminLayout },
    { path: '/admin', component: CampaignManagement, layout: AdminLayout },

]
const privateUserRoutes = {
    campaigns: [
        { path: '/campaigns/:id/edit/basic', component: BasicCampaign, layout: null },
        { path: '/campaigns/:id/edit/story', component: ContentCampaign, layout: null },
        { path: '/campaigns/:id/edit/perks/table', component: PerksCampaign, layout: null },
        { path: '/campaigns/:id/edit/perks/:idPerk', component: NewPerk, layout: null },
        { path: '/campaigns/:id/edit/items/table', component: ItemsCampaign, layout: null },
        { path: '/campaigns/:id/edit/items/:idItem', component: NewItem, layout: null },
        { path: '/campaigns/:id/edit/team', component: TeamCampaign, layout: null },
        { path: '/campaigns/:id/edit/funding', component: FundingCampaign, layout: null },
        { path: '/campaigns/:id/edit/settings', component: SettingCampaign, layout: null },
    ],
    individuals: [
        { path: '/individuals/:id/edit/profile', component: EditProfile, layout: HeaderOnlyLayout },
        { path: '/individuals/:id/edit/settings', component: EditSetting, layout: HeaderOnlyLayout },
        { path: '/individuals/:id/contributions', component: Contributes, layout: HeaderOnlyLayout },

    ]   
    
}

export { publicRoutes, privateUserRoutes, loginRoutes, adminRoutes }