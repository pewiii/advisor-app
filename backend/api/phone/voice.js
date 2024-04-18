import Twilio from 'twilio';
import models from '../../db/models.js'

const voice = 'man'

const answer = (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();

  twiml.gather({
    input: 'speech',
    action: 'https://packthemin.com/api/voice/action',
    method: 'POST',
    speechTimeout: 'auto'
  }).say({ voice }, 'Welcome to the event registration system. say register to register, or say cancel to cancel your registration.');


  res.type('text/xml');
  res.send(twiml.toString());
}

const action = (req, res) => {
  console.log(req.body.SpeechResult)
  console.log('action')
  const speechResult = req.body.SpeechResult.toLowerCase();
  if (speechResult.includes('register')) {
    registration(req, res);
  } else if (speechResult.includes('cancel')) {
    cancel(req, res);
  } else {
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.gather({
      input: 'speech',
      action: 'https://packthemin.com/api/voice/action',
      method: 'POST',
      speechTimeout: 'auto'
    }).say({ voice }, 'Sorry, I did not understand that. Please say register to register, or say cancel to cancel your registration.');
    res.type('text/xml');
    res.send(twiml.toString());
  }
}

const hint = 'I expect to hear six individual characters and digits from this list 0,1,2,3,4,5,6,7,8,9,A,X,L,R,Q,S.'

const registration = (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.gather({
    input: 'speech',
    action: 'https://packthemin.com/api/voice/offer',
    method: 'POST',
    voice,
    speechTimeout: 'auto',
    // hints: 'digits', // Provide hints for expected input (digits)
    // hints: "$OOV_CLASS_ALPHANUMERIC_SEQUENCE",
    hints: hint,
    language: 'en-US', // Set language for better recognition
    confidenceLevels: 'high', // Request high confidence levels
    speechModel: 'numbers_and_commands' // Use model optimized for numbers
  }).say({ voice }, 'Please say your 6 digit offer code, speaking each digit clearly.');
  res.type('text/xml');
  res.send(twiml.toString());
}

const offerCode = async (req, res) => {
  let speechResult = req.body.SpeechResult.toUpperCase();
  // replace any characters that are not 0,1,2,3,4,5,6,7,8,9,A,X,H,R,Q,S
  speechResult = speechResult.replace(/[^0-9AXHRQS]/g, '')
  console.log(speechResult)
  const record = await models.Record.findOne({ offerCode: speechResult })
  const twiml = new Twilio.twiml.VoiceResponse();
  if (!record) {
    twiml.gather({
      input: 'speech',
      action: 'https://packthemin.com/api/voice/offer',
      method: 'POST',
      voice,
      speechTimeout: 'auto',
      hints: hint,
      language: 'en-US',
    }).say({ voice }, 'Sorry, I did not understand that. Please say your 6 digit offer code, speaking each digit clearly.');
    res.type('text/xml');
    res.send(twiml.toString());
  } else {
    twiml.gather({
      input: 'speech',
      action: `https://packthemin.com/api/voice/verify/${record._id}`,
      method: 'POST',
      speechTimeout: 'auto',
      language: 'en-US',
    }).say({ voice }, `You entered ${speechResult.split("").join(", ")}. If this is correct, say yes. Otherwise, say no.`);
    res.type('text/xml');
    res.send(twiml.toString());
  }
}
//99b1be
//246sra
const verifyCode = async (req, res) => {
  const userId = req.params.id;
  const record = await models.Record.findById(userId);
  const speechResult = req.body.SpeechResult.toLowerCase();
  console.log(record)
  console.log(speechResult)
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.say({ voice }, `Thank You ${record.firstName}. Your registration has been completed. Goodbye.`);
  res.type('text/xml');
  res.send(twiml.toString());
  // finish
}

const cancel = (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.say({ voice }, `Your registration has been cancelled. Goodbye.`);
  res.type('text/xml');
  res.send(twiml.toString());
}

export default {
  answer,
  action,
  registration,
  cancel,
  offerCode,
  verifyCode,
}