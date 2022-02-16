import mongoose from 'mongoose'

const ShipWreck = new mongoose.Schema({
  recrd : String,
  vesslterms : String,
  feature_type : String,
  chart : String,
  latdec : Number,
  londec : Number,
  gp_quality : String,
  depth : Number,
  sounding_type : String,
  history : String,
  quasou : String,
  watlev : String,
  coordinates : []
}, { collection : 'shipwrecks' });

export default mongoose.model('Ship', ShipWreck)
