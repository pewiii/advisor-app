import sgMail from '@sendgrid/mail'
import db from '../db/index.js'
import auth from '../auth/index.js'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const FRONTEND_URL = process.env.FRONTEND_URL

// const send = async () => {
//   const msg = {
//     to: 'paulewiii3@gmail.com', // Change to your recipient
//     from: 'support@sheetprint.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   }

//   sgMail
//   .send(msg)
//   .then((response) => {
//     console.log(response[0].statusCode)
//     console.log(response[0].headers)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// }


const passwordSetup = async (req, res) => {

  try {

    const { clientId } = req.body
    const client = await db.clients.getClientById(clientId)
    if (!client) {
      res.status(404).send({ message: 'Client not found'})
    } else if (client.password) {
      res.status(400).send({ message: 'Client already setup' })
    } else {
      client.resetToken = auth.generateResetToken()
      client.resetTokenExpiration = new Date(Date.now() + 3600000 * 24);
      await client.save()
      //send email
      await sgMail.send({
        to: client.email,
        from: 'support@sheetprint.com',
        template_id: 'd-80c7eb1df75a48e1ac013e55a41ad929',
        dynamic_template_data: {
          username: client.firstName,
          //temp link
          resetLink: `${FRONTEND_URL}/setup/${client._id}/${client.resetToken}`
        }
      })
      client.emailSentAt = new Date()
      await client.save()
      res.status(200).send(client)
    }

  } catch(err) {
    console.log(err.message)
    res.status(500).send({ message: err.message })
  }
}

export default {
  passwordSetup,
}