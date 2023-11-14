import fs from 'fs'
import csv from 'csv-parser'
import { Readable } from 'stream'
import db from '../db/index.js'
import {
  S3Client,
  PutObjectCommand,
  // CreateBucketCommand,
  DeleteObjectCommand,
  // DeleteBucketCommand,
  // paginateListObjectsV2,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

const S3ACCESSKEYID = process.env.S3ACCESSKEYID
const S3SECRETACCESSKEY = process.env.S3SECRETACCESSKEY

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: S3ACCESSKEYID,
    secretAccessKey: S3SECRETACCESSKEY
  }
})


const imageUpload = async (req, res) => {

  const file = req.file

  if (!file) {
    res.status(400).send({ message: 'No file uploaded' })
  }

  try {
    const key = Date.now() + file.originalname

    const putCommand = new PutObjectCommand({
      Bucket: 'advisorapp',
      Body: file.buffer,
      // ContentType:'content-type',
      Key: key,
    });

    const result = await s3Client.send(putCommand);

    const image = await db.images.createImage({ url: `https://advisorapp.s3.amazonaws.com/${key}`, key })

    // console.log(result)
    res.send(image)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Server error' })
  }

}

const getImageList = async (req, res) => {
  try {
    const images = await db.images.getList()
    res.send(images)
  } catch (err) {
    res.status(500).send({ message: 'Server error' })
  }
}


const imageDelete = async (req, res) => {
  try {
    const image = req.body

    console.log(image)

    const deleteCommand = new DeleteObjectCommand({
      Bucket: 'advisorapp',
      Key: image.key
    })

    await s3Client.send(deleteCommand)
    await db.images.deleteImage(image._id)

    res.sendStatus(201)
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ message: 'Server error' })
  }
}







const csvDelete = async (req, res) => {
  try {
    const { campaign } = req.body

    await db.records.deleteMany(campaign)
    const resultCampaign = await db.campaigns.update(campaign, { fileName: null })
    console.log(resultCampaign)
    res.status(201).send(resultCampaign)

  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: err.message })
  }
}



const csvUpload = async (req, res) => {
  try {
    const campaign = req.body.campaign
    // const { buffer } = req.file

    // if (!buffer || !campaign) {
    //   return res.status(400).send({ message: 'Missing file data or campaign'})
    // }



    const records = []
    let headerSkipped = false

    // const stream = Readable.from(buffer.toString())
    const stream = fs.createReadStream(req.file.path)

    const processRecord = (data) => {
      if (!headerSkipped) {
        // Skip the header record
        headerSkipped = true
        return
      }
      const keys = Object.keys(data)
      const record = {
        campaign
      }

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const lowKey = key.toLowerCase()
        const item = data[key] === 'N/A' ? null : data[key]

        switch (lowKey) {
          case 'homeowner':
            record.homeOwner = Boolean(item)
            break
          case 'net worth':
            record.netWorth = item
            break
          case 'political':
            record.political = item
            break
          case 'race':
            record.race = item
            break
          case 'veteran in household':
            record.vetInHouse = Boolean(item)
            break
          case 'first name':
            record.firstName = item
            break
          case 'last name':
            record.lastName = item
            break
          case 'company':
            record.company = item
            break
          case 'address line 1':
            record.address1 = item
            break
          case 'address line 2':
            record.address2 = item
            break
          case 'city':
            record.city = item
            break
          case 'state':
            record.state = item
            break
          case 'zip':
            record.zip = item
            break
          case 'zip code':
            record.zip = item
            break
          case 'age':
            record.age = item
            break
          case 'wealth rating':
            record.wealthRating = item
            break
          case 'offer code':
            record.offerCode = item
            break
        }

      }

      // let homeOwner = data['Homeowner'] || data['homeowner']
      // homeOwner = homeOwner !== 'N/A'

      // let netWorth = data['Net Worth'] || data['net worth']
      // netWorth = netWorth === 'N/A' ? null : netWorth

      // let political = data['Political'] || data['political']
      // political = political === 'N/A' ? null : political

      // let race = data['Race'] || data['race']
      // race = race === 'N/A' ? null : race

      // let vetInHouse = data['Veteran in Household'] || data['veteran in household'] || data['Veteran In Household']
      // vetInHouse = vetInHouse !== 'N/A'

      // const record = {
      //   firstName: data['First Name'],
      //   lastName: data['Last Name'],
      //   company: data['Company'],
      //   address1: data['Address Line 1'],
      //   address2: data['Address Line 2'],
      //   city: data['City'],
      //   state: data['State'],
      //   zip: data['Zip'] || data['Zip Code'],
      //   age: data['Age'] || data['age'],
      //   homeOwner,
      //   netWorth,
      //   political,
      //   race,
      //   vetInHouse,
      //   wealthRating: data['Wealth Rating'] || data['wealth rating'],
      //   offerCode: data['Offer Code'] || data['offer code'],
      //   campaign
      // }

      records.push(record)
    }

    stream
      .pipe(csv())
      .on('data', async (data) => {
        processRecord(data)
      })
      .on('end', async () => {
        try {
          await db.records.createMany(records)
          const resultCampaign = await db.campaigns.update(campaign, { fileName: req.file.originalname, fileRecords: records.length })
          res.status(201).send(resultCampaign)
          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            }
          });
        } catch (err) {
          console.log(err.message)
          res.status(400).send({ message: err.message })
        }
      })
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: err.message })
  }
}

export default {
  csvUpload,
  csvDelete,
  imageUpload,
  imageDelete,
  getImageList
}