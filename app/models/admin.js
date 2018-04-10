var mongoose = require('mongoose')

// the schema for admins
var adminSchema = new mongoose.Schema({
  _id: { type: String, index: { unique: true } },
  name: String,
  email: String,
  DOB: String
})

module.exports = mongoose.model('AdminUser', adminSchema)
