import mongoose from 'mongoose'

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const dbName = process.env.MONGODB_DATABASE
let connectionString = process.env.MONGODB_CONNECTION_STRING

if(!connectionString){
  connectionString = `mongodb+srv://${username}:${password}@cluster0.sqypy.mongodb.net/${dbName}?retryWrites=true&w=majority`
}

mongoose.
  connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection established'))
  .catch(console.log)

export default mongoose.connection
