import express from 'express'
import ShipWreck from '../models/ship-wreck.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    let applyFilters = {}

    for (let key in req.body.filters) {
      if (key === "depth") {
        applyFilters[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        applyFilters[key] = req.body.filters[key];
      }
    }

    const ships = await ShipWreck.find(applyFilters)
    res.status(200).json(ships)
  } catch (err) {
    res.status(500).json(err)
  }
})

export default router
