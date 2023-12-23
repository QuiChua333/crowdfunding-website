import express from 'express'
import { CampaignController } from "../controllers/index.js";
import checkToken from '../middlewares/auth.js'
const router = express.Router();


router.get('/getCampaignById/:id',CampaignController.getCampaignById)
router.patch('/CKEUpload',CampaignController.CKEUpload)
router.patch('/editCampaign/:id',checkToken,CampaignController.editCampaign)
router.patch('/launchCampaign/:id',checkToken,CampaignController.launchCampaign)
router.patch('/changeCardImage/:id',checkToken,CampaignController.changeCardImage)
router.post('/createNewCampaign',checkToken,CampaignController.createNewCampaign)
router.get('/getTeamMember/:id',CampaignController.getTeamMember)
router.post('/sendInvitation',checkToken,CampaignController.sendInvitation)
router.get('/team/:tokenLinkInvitation',CampaignController.handleAcceptInvitationCampaign)
router.delete('/:id/deleteMember/:memberId',checkToken,CampaignController.deleteMember)
router.get('/getQuantityCampaignByUser/:id',CampaignController.getQuantityCampaingnPerUser)
router.get('/getCampaignsOfUserId/:id',CampaignController.getCampaignsOfUserId)
router.get('/getAllCampaigns',checkToken,CampaignController.getAllCampaigns)
router.get('/checkCampaignOfUser/:idCampaign',checkToken,CampaignController.checkCampaignOfUser)
router.patch('/adminChangeStatusCampaign/:idCampaign',checkToken,CampaignController.adminChangeStatusCampaign)
router.delete('/adminDeleteCampaign/:idCampaign',checkToken,CampaignController.adminDeleteCampaign)



router.get('/', (req, res) => {
    res.send('Welcome to Campaign')
})

export default router