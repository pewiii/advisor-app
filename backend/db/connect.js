import mongoose from 'mongoose'

const {
  DB_DATABASE,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_HOST
} = process.env


mongoose.connect(
  `mongodb:${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  {
    authSource: "admin",
    user: DB_USER,
    pass: DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log("Database Connected")
}).catch(err => {
  console.log(err)
})


export default {
  mongoose
}
