import fs from 'fs'
import csv from 'csv-parser'
import { stringify } from 'csv-stringify'
import FIFOCache from './fifoCache.js';
import { Readable } from 'stream'
// import db from '../../../db/index.js'
import db from '../../db/index.js'
import {
  S3Client,
  PutObjectCommand,
  // CreateBucketCommand,
  DeleteObjectCommand,
  // DeleteBucketCommand,
  // paginateListObjectsV2,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import models from '../../db/models.js'

const offerCache = new FIFOCache(50000)

const S3ACCESSKEYID = process.env.S3ACCESSKEYID
const S3SECRETACCESSKEY = process.env.S3SECRETACCESSKEY
const S3BUCKET = process.env.S3BUCKET

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: S3ACCESSKEYID,
    secretAccessKey: S3SECRETACCESSKEY
  }
})

// const imageUpload = async (req, res) => {
//   const file = req.file;

//   if (!file) {
//     res.status(400).send({ message: 'No file uploaded' });
//     return;
//   }

//   try {
//     const key = Date.now() + file.originalname;
//     const filePath = path.join(__dirname, 'uploads', key); // Adjust the path as needed

//     // Move the file from the temporary location to the uploads folder
//     fs.renameSync(file.path, filePath);

//     const putCommand = new PutObjectCommand({
//       Bucket: 'advisorapp',
//       Body: fs.createReadStream(filePath),
//       Key: key,
//     });

//     const result = await s3Client.send(putCommand);

//     // Delete the file from disk after successful upload to S3
//     fs.unlinkSync(filePath);

//     const image = await db.images.createImage({
//       url: `https://advisorapp.s3.amazonaws.com/${key}`,
//       key,
//     });

//     res.send(image);
//   } catch (err) {
//     console.error(err);

//     // If an error occurs, delete the file from disk before sending the error response
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     res.status(500).send({ message: 'Server error' });
//   }
// };


const imageUpload = async (req, res) => {

  const file = req.file

  if (!file) {
    res.status(400).send({ message: 'No file uploaded' })
  }

  try {
    // const key = Date.now() + file.originalname
    // const key = Date.now() + file.originalname.replace(/\s+/g, '_');
    const sanitizedFileName = file.originalname
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^a-zA-Z0-9_.-]/g, ''); // Remove or replace special characters except for alphanumerics, underscores, dots, and hyphens
    const key = Date.now() + sanitizedFileName;

    const putCommand = new PutObjectCommand({
      Bucket: S3BUCKET,
      Body: fs.createReadStream(req.file.path),
      // Body: file.buffer,
      // ContentType:'content-type',
      Key: key,
    });

    const result = await s3Client.send(putCommand);

    const image = await db.images.createImage({ url: `https://${S3BUCKET}.s3.amazonaws.com/${key}`, key })

    // console.log(result)
    res.send(image)
    fs.unlinkSync(req.file.path);
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

    // console.log(image)
    await db.images.deleteImage(image._id)

    const deleteCommand = new DeleteObjectCommand({
      Bucket: S3BUCKET,
      Key: image.key
    })

    await s3Client.send(deleteCommand)

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

function createCSVStream(data) {
  // Create a writable stream to capture the CSV string
  const csvStringifierStream = stringify({ 
    header: true,
    // formatters: {
    //   number: (value) => "'" + value, // Prepend an apostrophe to numeric fields
    // },
  });
  const csvData = [];

  // Listen for 'readable' event to capture CSV string
  csvStringifierStream.on('readable', () => {
    let chunk;
    while ((chunk = csvStringifierStream.read()) !== null) {
      csvData.push(chunk);
    }
  });

  // Push each row of data into the stringifier stream
  data.forEach(row => csvStringifierStream.write(row));

  // End the stringifier stream to trigger the 'end' event
  csvStringifierStream.end();

  // Create a readable stream from the captured CSV string
  const readable = new Readable();
  readable._read = () => {}; // Implement _read method for the Readable stream

  // Push the CSV string into the readable stream
  csvStringifierStream.on('end', () => {
    csvData.forEach(chunk => readable.push(chunk));
    readable.push(null); // Signal the end of the stream
  });

  return readable;
}

function generateRandomHex(length) {
  const characters = '0123456789ABCDEF';
  let hex = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hex += characters.charAt(randomIndex);
  }

  return hex;
}

const generateUniqueOfferCode = async () => {
  let code = null
  let i = 0;
  while (i < 100) {
    code = generateRandomHex(6)
    const record = await models.Record.findOne({ offerCode: code })
    console.log(record)
    if (!record && !offerCache.get(code)) {
      offerCache.set(code, true)
      return code
    }
    i++
  }
  return null
}

const csvCode = async (req, res) => {
  const stream = fs.createReadStream(req.file.path)
  const processedData = []
  let recordCount = 0
  stream
  .pipe(csv())
  .on('data', async (data) => {
    recordCount++
    const code = await generateUniqueOfferCode()
    // prepend ` so the field is read as text
    data.offerCode = "'" + code
    // console.log(data)
    processedData.push(data)

    if (processedData.length === recordCount) {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=processed_data.csv');
    
      const csvStream = createCSVStream(processedData)
      csvStream.pipe(res)
    }
  })
  .on('end', async () => {
    try {
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
}

export default {
  csvUpload,
  csvDelete,
  csvCode,
  imageUpload,
  imageDelete,
  getImageList
}