import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Upload from '~/pages/Upload'
import { HeaderOnlyLayout } from '~/components/Layout'

// Public routes
const publicRoutes = [
    { path: '/', component: Home},
    { path: '/following', component: Following},
    { path: '/upload', component: Upload}
]

const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }