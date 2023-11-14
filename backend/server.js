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
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

// const upload = multer({ storage: storage });
app.post('/login', auth.login)

app.post('/uploads/csv/add', auth.verifyToken, upload.single('file'), api.uploads.csvUpload)
app.post('/uploads/csv/delete', auth.verifyToken, api.uploads.csvDelete)

app.post('/uploads/image/add', auth.verifyToken, upload.single('file'), api.uploads.imageUpload)
app.post('/uploads/image/delete', auth.verifyToken, api.uploads.imageDelete)
app.get('/images', auth.verifyToken, api.uploads.getImageList)

app.post('/admin/login', auth.adminLogin)



// app.post('/admin/register', auth.register)

app.post('/clients/add', auth.verifyToken, api.clients.create)
app.post('/clients/update', auth.verifyToken, api.clients.update)
app.post('/clients/delete', auth.verifyToken, api.clients.destroy)
app.get('/clients', auth.verifyToken, api.clients.getList)
app.get('/clients/:clientId', auth.verifyToken, api.clients.get)
app.post('/clients/setup', auth.verifyToken, comm.email.passwordSetup)

app.get('/users', auth.verifyToken, auth.requireAdmin, api.users.getList)
app.post('/users/add', auth.verifyToken, auth.requireAdmin, auth.adminRegister)
app.post('/users/update', auth.verifyToken, auth.requireAdmin, auth.adminUpdate)
app.post('/users/delete', auth.verifyToken, auth.requireAdmin, api.users.destroy)

app.post('/campaigns/add', auth.verifyToken, upload.single('file'), api.campaigns.create)
app.post('/campaigns/update', auth.verifyToken, upload.single('file'), api.campaigns.update)
app.get('/campaigns', auth.verifyToken, api.campaigns.getList)

app.get('/client-setup/:clientId/:resetToken', api.clients.getSetupClient)
app.post('/client-setup/:clientId/:resetToken', api.clients.setupClient)

app.post('/templates/add', auth.verifyToken, api.templates.create)
app.post('/templates/update', auth.verifyToken, api.templates.update)
// app.post('/templates/delete', auth.verifyToken, api.templates.destroy)
app.get('/templates', auth.verifyToken, api.templates.getList)
// app.get('/templates/:templateId', api.templates.get)


app.post('/offer-code', api.offers.handleOfferCode)
app.post('/rsvp', api.offers.rsvp)

app.listen(API_PORT, () => {
  console.log(`Listening on port ${API_PORT}`)
})