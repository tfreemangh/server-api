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
        .get('/api/snacks/new/teststring')
        .set({"client-sercret":"1234"})
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Created a new Snack successfully, test passed!')
          assert.end()
        })
    })

    test('/api/snacks/find/', assert => {
      request(app)
        .get('/api/snacks/find/')
        .set({"client-sercret":"1234"})
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Got a specific Snack successfully, test passed!')
          assert.end()
        })
    })

    test('/api/snacks/findall/', assert => {
      request(app)
        .get('/api/snacks/findall/')
        .set({"client-sercret":"1187"})
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Got a specific Snack successfully, test passed!')
          assert.end()
        })
    })

    test('/api/snacks/delete/', assert => {
      request(app)
        .get('/api/snacks/delete/')
        .set({"client-sercret":"1234"})
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Got a specific Snack successfully, test passed!')
          assert.end()
        })
    })

  })
})
