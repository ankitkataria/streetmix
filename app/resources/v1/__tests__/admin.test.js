/* eslint-env jest */
import request from 'supertest'
import express from 'express'
import admin from '../admin'
import AdminUser from '../../../models/admin'

var mongoose = require('mongoose')

function setupMockServer () {
  const app = express()

  app.use(express.json())
  app.post('/api/v1/admin', admin.post)
  app.get('/api/v1/admin', admin.get)

  return app
}

const user = {
  _id: 'abc',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  DOB: '1997-11-12'
}

const transmission = {
  adminName: 'John Doe',
  adminEmail: 'johndoe@gmail.com',
  adminDOB: '1997-11-12'
}

describe('/adi/v1/admin', function () {
  const app = setupMockServer()

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

  afterAll((done) => {
    AdminUser.remove(user, function (err, removed) {
      if (err) {
        done.fail(err)
      }
      mongoose.connection.close()
      done()
    })
  })

  it('Should return 200 on valid admin data', function () {
    return request(app)
      .post('/api/v1/admin')
      .type('json')
      .send(JSON.stringify(transmission))
      .then((response) => {
        expect(response.statusCode).toEqual(200)
      })
  })

  it('Sould return 400 on a GET request', function () {
    return request(app)
      .get('/api/v1/admin')
      .then((response) => {
        expect(response.statusCode).toEqual(400)
      })
  })
})
