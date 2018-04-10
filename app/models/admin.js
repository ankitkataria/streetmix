var mongoose = require('mongoose')

// the schema for admins
var adminSchema = new mongoose.Schema({
  _id: { type: String, index: { unique: true } },
  name: String,
  email: String,
  DOB: String
  // created_at: Date,
  // updated_at: Date
})

// middleware to add created and updated at timestamps
// adminSchema.pre('save', function (next) {
//   var now = new Date()
//   this.updated_at = now
//   this.created_at = this.created_at || now
//   next()
// })

module.exports = mongoose.model('AdminUser', adminSchema)
