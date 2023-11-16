import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import db from '../db/index.js'
import crypto from 'crypto'

const JWT_KEY = process.env.JWT_KEY

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.email,
    isAdmin: user.isAdmin
    // Add any other user-specific data
  };

  const secret = JWT_KEY
  const options = {
    expiresIn: '1h', // Token expiration time
  };

  return jwt.sign(payload, secret, options);
}

const hashPassword = (password) => {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)

}

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
    return
  }
  res.sendStatus(401)
}

const adminRegister = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!password) {
      throw ({ message: 'Password required' })
    }
    const hashedPassword = await hashPassword(password)
    const user = await db.users.createUser({ email, password: hashedPassword, firstName: req.body.firstName, lastName: req.body.lastName, isAdmin: req.body.isAdmin })
    res.status(201).send(user)
  } catch(err) {
    console.log(err.message)
    res.sendStatus(400)
  }
}

const adminUpdate = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!password) {
      throw ({ message: 'Password required' })
    }
    const hashedPassword = await hashPassword(password)
    const user = await db.users.updateUser(req.body._id, { email, password: hashedPassword, firstName: req.body.firstName, lastName: req.body.lastName, isAdmin: req.body.isAdmin })
    // const user = await db.users.createUser({ email, password: hashedPassword, firstName: req.body.firstName, lastName: req.body.lastName })
    res.status(201).send(user)
  } catch(err) {
    console.log(err.message)
    res.sendStatus(400, { message: err.message })
  }
}

const adminLogin = async (req, res) => {
  try {

    //temp
    // req.body.firstName = 'Paul'
    // req.body.lastName = 'Watson'
    // req.body.isAdmin = true
    // await adminRegister(req, res)
    // return

    const { email, password } = req.body
    const emailRegex = new RegExp(email, 'i');
    const user = await db.users.getUser({ email: emailRegex })
    if (!user || !user.password) {
      throw('Invalid user')
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.sendStatus(401)
    }
    const token = generateToken(user)
    res.send({
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
        userType: 'admin',
        isAdmin: user.isAdmin
      }
    })
  } catch(err) {
    res.status(400).send({ message: 'Invalid email or password' })
  }
}

const register = (req, res) => {
  res.sendStatus(201)
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const emailRegex = new RegExp(email, 'i');
    const client = await db.clients.getFullClient({ email: emailRegex })
    if (!client || !client.password) {
      throw('Invalid user')
    }
    const validPassword = await bcrypt.compare(password, client.password)
    if (!validPassword) {
      return res.sendStatus(401)
    }
    const token = generateToken(client)
    res.send({
      token,
      user: {
        email: client.email,
        firstName: client.firstName,
        _id: client._id,
        userType: 'user',
        superUser: false
      }
    })
  } catch(err) {
    console.log(err.message)
    res.status(400).send({ message: 'Invalid email or password'})
  }
}


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }
  jwt.verify(token.replace('Bearer ', ''), JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' })
    }
    req.user = decoded;
    next()
  })
}

const generateResetToken = () => {
  return crypto.randomBytes(20).toString('hex');
}



export default {
  adminRegister,
  adminLogin,
  register,
  login,
  verifyToken,
  hashPassword,
  generateResetToken,
  requireAdmin,
  adminUpdate
}