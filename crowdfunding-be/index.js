import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connect from './config/database.js'
import { CampaignRouter, CategoryRouter, ContributionRouter, FieldRouter, ItemRouter, PerkRouter, ReportRouter, UserRouter, GiftRouter } from './routes/index.js'
const PORT = process.env.PORT || 4000
const app = express();

// Cấu hình file tĩnh
// import path from 'path'
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.join(__dirname ,'public')));




app.use(cors())
app.use(express.json({
    limit: '500mb'
}));


app.use('/campaign',CampaignRouter)
app.use('/category',CategoryRouter)
app.use('/contribution',ContributionRouter)
app.use('/field',FieldRouter)
app.use('/item',ItemRouter)
app.use('/perk',PerkRouter)
app.use('/report',ReportRouter)
app.use('/user',UserRouter)
app.use('/gift',GiftRouter)


app.get('/', (req,res) => {
    res.send('Hello from server side')
})

app.listen(PORT, async () => {
    await connect();
    console.log(`Server is running at PORT ${PORT}`);
})