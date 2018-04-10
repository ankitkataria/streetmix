var AdminUser = require('../../models/admin.js')
var logger = require('../../../lib/logger.js')

exports.post = function (req, res) {
  var handleFindUser = function (err, user) {
    if (err) {
      logger.error(err)
      res.status(500).send('Error finding an Admin user with the given email')
      return
    }

    if (!user) {
      res.status(404).send('An Admin user with the given email not found')
    }

    if (user.DOB === body.adminDOB && user.name === body.adminName) {
      res.status(200).send('Admin user validated')
    } else {
      res.status(401).send('Incorrect credentials entered')
    }
  }

  var body
  try {
    body = req.body
  } catch (e) {
    res.status(400).send('Could not parse body as JSON.')
    return
  }
  AdminUser.findOne({email: body.adminEmail}, handleFindUser)
}

exports.get = function (req, res) {
  res.status(400).send('GET requests not allowed')
}
