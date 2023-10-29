import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import db from '../db/index.js'

const JWT_KEY = process.env.JWT_KEY

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.email,
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

const adminRegister = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!password) {
      throw ({ message: 'Password required' })
    }
    const hashedPassword = await hashPassword(password)
    const user = await db.users.createUser({ email, password: hashedPassword, firstName: req.body.firstName, lastName: req.body.lastName })
    res.status(201).send(user)
  } catch(err) {
    console.log(err.message)
    res.sendStatus(400)
  }
}

const adminLogin = async (req, res) => {

  const { email, password } = req.body
  const user = await db.users.getUser({ email })
  if (!user) {
    return res.sendStatus(401)
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
      superUser: user.isAdmin
    } 
  })
}

const register = (req, res) => {
  res.sendStatus(201)
}

const login = () => (req, res) => {
  res.sendStatus(401)
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



export default {
  adminRegister,
  adminLogin,
  register,
  login,
  verifyToken,
  hashPassword
}