const express = require('express')

const Snack = require('../models/Snack')
const router = express.Router()

router.get('/snacks/findall/', (req, res, next) => {
  var secretid = req.headers['client-secret']
  if (process.env.ADMIN_ID != secretid ) {
    res.status(400).send({'error': 'Invalid client secret'})
  }

  req.app.locals.db.collection('snacks').find({}).toArray((err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }

    if (result === undefined || result.length === 0) {
      res.status(400).send({'error':'No snacks in database'})
    } else {
      res.status(200).send(result)
    }
  })
})

router.get('/snacks/find', (req, res, next) => {
  var secretid = req.headers['client-secret'];
  if (secretid == null) {
    res.status(400).send({'error': 'Invalid client secret'})
  }

  req.app.locals.db.collection('snacks').find({ "newSnack.secret": secretid}).toArray((err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined || result.length == 0) {
      res.status(400).send(({'error': 'Invalid client secret'})
    }
    res.status(200).send(result)
  })
})

router.get('/snacks/new/:value', (req, res, next) => {
  var secretid = req.headers['client-secret']
  const newSnack = new Snack(secretid, req.params.value)

  req.app.locals.db.collection('snacks').deleteOne({
      "newSnack.secret": secretid
  }, (err, result) => {
      if (err) {
        res.status(400).send({'error': err})
      }
      req.app.locals.db.collection('snacks').insertOne({
        newSnack
      }, (err, result) => {
        if (err) {
          res.status(400).send({'error': err})
        }
        res.status(200).send(result)
      })
    })
  })

 router.get('/snacks/delete/', (req, res, next) => {
  var secretid = req.headers['client-secret']
  req.app.locals.db.collection('snacks').deleteMany({"newSnack.secret": secretid}, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

module.exports = router
