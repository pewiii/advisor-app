import fs from 'fs'
import csv from 'csv-parser'
import { Readable } from 'stream'
import db from '../db/index.js'


const csvDelete = async (req, res) => {
  try {
    const { campaign } = req.body

    await db.records.deleteMany(campaign)
    const resultCampaign = await db.campaigns.update(campaign, { fileName: null })
    console.log(resultCampaign)
    res.status(201).send(resultCampaign)

  } catch(err) {
    console.log(err.message)
    res.status(400).send({ message: err.message })
  }
}


const csvUpload = async (req, res) => {
  try {
    const campaign = req.body.campaign
    const { buffer } = req.file
    
    if (!buffer || !campaign) {
      return res.status(400).send({ message: 'Missing file data or campaign'})
    }

    const records = []
    let headerSkipped = false
  
    const stream = Readable.from(buffer.toString())
  
    const processRecord = (data) => {
      if (!headerSkipped) {
        // Skip the header record
        headerSkipped = true
        return
      }
      let homeOwner = data['Homeowner'] || data['homeowner']
      homeOwner = homeOwner !== 'N/A'
  
      let netWorth = data['Net Worth'] || data['net worth']
      netWorth = netWorth === 'N/A' ? null : netWorth
  
      let political = data['Political'] || data['political']
      political = political === 'N/A' ? null : political
  
      let race = data['Race'] || data['race']
      race = race === 'N/A' ? null : race
  
      let vetInHouse = data['Veteran in Household'] || data['veteran in household'] || data['Veteran In Household']
      vetInHouse = vetInHouse !== 'N/A'
  
      const record = {
        firstName: data['First Name'],
        lastName: data['Last Name'],
        company: data['Company'],
        address1: data['Address Line 1'],
        address2: data['Address Line 2'],
        city: data['City'],
        state: data['State'],
        zip: data['Zip'] || data['Zip Code'],
        age: data['Age'] || data['age'],
        homeOwner,
        netWorth,
        political,
        race,
        vetInHouse,
        wealthRating: data['Wealth Rating'] || data['wealth rating'],
        offerCode: data['Offer Code'] || data['offer code'],
        campaign
      }

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
          const resultCampaign = await db.campaigns.update(campaign, { fileName: req.file.originalname })
          res.status(201).send(resultCampaign)
        } catch (err) {
          console.log(err.message)
          res.status(400).send({ message: err.message })
        }
      })
  } catch(err) {
    console.log(err.message)
    res.status(400).send({ message: err.message })
  }
}

export default {
  csvUpload,
  csvDelete
}