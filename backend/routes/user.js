import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const router = express.Router()
const saltRounds = 10

router.post('/register', async(req, res) => {
  try{
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const userToCreate = new User({
      email: req.body.email,
      userName: req.body.userName,
      password: hashedPass
    })

    const createdUser = await User.create(userToCreate)
    res.status(200).json({ 
      _id: createdUser._id, 
      userName: createdUser.userName 
    })

  } catch(err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try{
    const user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).json('wrong email or password')

    const validPass = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if(!validPass) return res.status(400).json('wrong email or password')

    res.status(200).json({ 
      _id: user._id, 
      userName: user.userName 
    })

  } catch (err){
    res.status(500).json(err)
  }
})



export default router