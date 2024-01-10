import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import auth from './auth/index.js'
import api from './api/index.js'
import multer from 'multer'
import comm from './comm/index.js'

import mongoose from './db/connect.js'



const API_PORT = process.env.API_PORT
const app = express()

app.use(morgan('tiny'))
app.use(cors())
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '100mb' }))
app.use(express.json({ limit: '10mb' }))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage })

// app.post('/uploads/csv/add', auth.verifyToken, upload.single('file'), api.uploads.csvUpload)
// app.post('/uploads/csv/delete', auth.verifyToken, api.uploads.csvDelete)

// app.post('/uploads/image/add', auth.verifyToken, upload.single('file'), api.uploads.imageUpload)
// app.post('/uploads/image/delete', auth.verifyToken, api.uploads.imageDelete)
// app.get('/images', auth.verifyToken, api.uploads.getImageList)



// **** Admin routes ****
app.post('/admin/login', auth.adminLogin)

app.get('/admin/campaigns/title/:campaignTitle', auth.verifyToken, api.admin.campaigns.checkTitle)
app.get('/admin/campaigns', auth.verifyToken, api.admin.campaigns.getList)
app.get('/admin/campaigns/:campaignId', auth.verifyToken, api.admin.campaigns.get)
app.post('/admin/campaigns', auth.verifyToken, api.admin.campaigns.create)
app.post('/admin/campaigns/:campaignId', auth.verifyToken, api.admin.campaigns.update)
app.delete('/admin/campaigns/:campaignId', auth.verifyToken, auth.requireAdmin, api.admin.campaigns.delete)

app.get('/admin/clients', auth.verifyToken, api.admin.clients.getList)
app.get('/admin/clients/:clientId', auth.verifyToken, api.admin.clients.get)
app.post('/admin/clients', auth.verifyToken, api.admin.clients.create)
app.post('/admin/clients/:clientId', auth.verifyToken, api.admin.clients.update)
app.delete('/admin/clients/:clientId', auth.verifyToken, auth.requireAdmin, api.admin.clients.delete)

app.get('/admin/templates', auth.verifyToken, api.admin.templates.getList)
app.get('/admin/templates/:templateId', auth.verifyToken, api.admin.templates.get)
app.post('/admin/templates', auth.verifyToken, api.admin.templates.create)
app.post('/admin/templates/:templateId', auth.verifyToken, api.admin.templates.update)
app.delete('/admin/templates/:templateId', auth.verifyToken, auth.requireAdmin, api.admin.templates.delete)

app.get('/admin/users', auth.verifyToken, auth.requireAdmin, api.admin.users.getList)
app.get('/admin/users/:userId', auth.verifyToken, auth.requireAdmin, api.admin.users.get)
app.post('/admin/users', auth.verifyToken, auth.requireAdmin, api.admin.users.create)
app.post('/admin/users/:userId', auth.verifyToken, auth.requireAdmin, api.admin.users.update)
app.delete('/admin/users/:userId', auth.verifyToken, auth.requireAdmin, api.admin.users.delete)



// **** Client Routes ****
app.post('/login', auth.login)
// app.post('/clients/add', auth.verifyToken, api.clients.create)
// app.post('/clients/update', auth.verifyToken, api.clients.update)
// app.post('/clients/delete', auth.verifyToken, auth.requireAdmin, api.clients.destroy)
// app.get('/clients', auth.verifyToken, api.clients.getList)
// app.get('/clients/:clientId', auth.verifyToken, api.clients.get)
// app.post('/clients/setup', auth.verifyToken, comm.email.passwordSetup)

// app.get('/users', auth.verifyToken, auth.requireAdmin, api.users.getList)
// app.post('/users/add', auth.verifyToken, auth.requireAdmin, auth.adminRegister)
// app.post('/users/update', auth.verifyToken, auth.requireAdmin, auth.adminUpdate)
// app.post('/users/delete', auth.verifyToken, auth.requireAdmin, api.users.destroy)

// app.post('/campaigns/add', auth.verifyToken, upload.single('file'), api.campaigns.create)
// app.post('/campaigns/update', auth.verifyToken, upload.single('file'), api.campaigns.update)
// app.get('/campaigns', auth.verifyToken, api.campaigns.getList)
// app.post('/campaigns/delete', auth.verifyToken, auth.requireAdmin, api.campaigns.destroy)

// app.post('/templates/add', auth.verifyToken, api.templates.create)
// app.post('/templates/update', auth.verifyToken, api.templates.update)
// app.post('/templates/delete', auth.verifyToken, auth.requireAdmin, api.templates.destroy)
// app.get('/templates', auth.verifyToken, api.templates.getList)


// app.get('/client-setup/:clientId/:resetToken', api.clients.getSetupClient)
// app.post('/client-setup/:clientId/:resetToken', api.clients.setupClient)


// app.get('/client/campaigns', auth.verifyToken, api.campaigns.getClientCampaigns)


app.post('/offer-code', api.offers.handleOfferCode)
// app.post('/rsvp', api.offers.rsvp)

app.listen(API_PORT, () => {
  console.log(`Listening on port ${API_PORT}`)
})