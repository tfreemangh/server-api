const test = require('tape')
const request = require('supertest')
const express = require('express')

const Snack = require('../models/Snack')
const app = require('../index')
let secret
let value

before(done => {
  app.on( 'APP_STARTED', () => {
    done()
  })
})

describe('API Integration Test', () => {
  it('Runs all tests', done => {
    test('/api/snacks/new', assert => {
      request(app)
        .get('/api/snacks/new/${secret}/${value}')
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Created a new Snack successfully, test passed!')
          assert.end()
        })
    })


    test('/api/snacks/:secret', assert => {
      request(app)
        .get('/api/snacks/${secret}')
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Got a specific Snack successfully, test passed!')
          assert.end()
        })
    })


    test('/api/snacks/delete/:secret', assert => {
      request(app)
        .delete('/api/snacks/delete/${secret}')
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Deleted a specific Snack successfully, test passed!')
          assert.end()
          done()
        })
    })
  })
})
