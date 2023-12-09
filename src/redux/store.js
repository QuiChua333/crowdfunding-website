import { configureStore } from '@reduxjs/toolkit'
import globalAppReducer from './slides/GlobalApp'
import userCampaignReducer from './slides/UserCampaign'

const store = configureStore({
  reducer: {
    globalApp: globalAppReducer,
    userCampaign: userCampaignReducer,
  },
})
export default store