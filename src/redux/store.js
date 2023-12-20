import { configureStore } from '@reduxjs/toolkit'
import globalAppReducer from './slides/GlobalApp'
import userCampaignReducer from './slides/UserCampaign'
import userReducer from './slides/User'

const store = configureStore({
  reducer: {
    globalApp: globalAppReducer,
    userCampaign: userCampaignReducer,
    user: userReducer
  },
})
export default store