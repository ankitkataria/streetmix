var AdminUser = require('../../models/admin.js')
var logger = require('../../../lib/logger.js')

exports.post = function (req, res) {
  /*
    Validating User input to be valid through regular expression
  */
  var validateData = function (data) {
    var emailRE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    var dateRE = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/
    return dateRE.test(data.adminDOB) && emailRE.test(data.adminEmail)
  }

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

  if (validateData(body)) {
    AdminUser.findOne({email: body.adminEmail}, handleFindUser)
  } else {
    res.status(422).send('Invalid Email or DOB format')
  }
}

exports.get = function (req, res) {
  res.status(400).send('GET requests not allowed')
}
