/* eslint-env jest */
import request from 'supertest'
import express from 'express'
import admin from '../admin'
import AdminUser from '../../../models/admin'

var mongoose = require('mongoose')

// setting up mock server and setting up mock routes
function setupMockServer () {
  const app = express()

  app.use(express.json())
  app.post('/api/v1/admin', admin.post)
  app.get('/api/v1/admin', admin.get)

  return app
}

// test data to be intitially inserted in the admin collection for testing
const user = {
  _id: 'abc',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  DOB: '1997-11-12'
}

// data to transmitted through post to validate if an admin user
const transmission = {
  adminName: 'John Doe',
  adminEmail: 'johndoe@gmail.com',
  adminDOB: '1997-11-12'
}

describe('/adi/v1/admin', function () {
  const app = setupMockServer()

  // setting up the test database with the mock admin user before any test is executed
  beforeAll((done) => {
    mongoose.connect('mongodb://127.0.0.1:27017/test')

    let db = mongoose.connection

    db.on('error', (err) => {
      done.fail(err)
    })

    db.once('open', () => {
      done()
      var newAdmin = AdminUser(user)
      newAdmin.save()
    })
  })

  // clearing the test databse and closing connection
  afterAll((done) => {
    AdminUser.remove(user, function (err, removed) {
      if (err) {
        done.fail(err)
      }
      mongoose.connection.close()
      done()
    })
  })

  // to test if the user is a valid admin
  it('Should return 200 on valid admin data', function () {
    return request(app)
      .post('/api/v1/admin')
      .type('json')
      .send(JSON.stringify(transmission))
      .then((response) => {
        expect(response.statusCode).toEqual(200)
      })
  })

  // to test that api return 400 on accessing through browser
  it('Sould return 400 on a GET request', function () {
    return request(app)
      .get('/api/v1/admin')
      .then((response) => {
        expect(response.statusCode).toEqual(400)
      })
  })
})
