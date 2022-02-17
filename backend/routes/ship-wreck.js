import express from 'express'
import ShipWreck from '../models/ship-wreck.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const ships = await ShipWreck.find()
    res.status(200).json(ships)
  } catch (err) {
    res.status(500).json(err)
  }
})

export default router
