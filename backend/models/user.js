import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      max: 50
    },
    userName: {
      type: String,
      unique: true,
      required: true,
      min: 3,
      max: 10
    },
    password: {
      type: String,
      required: true,
      min: 6
    }
  }, 
  { timestamps: true }
)

export default mongoose.model('User', userSchema)