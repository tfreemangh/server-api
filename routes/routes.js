const express = require('express')

const Snack = require('../models/Snack')
const router = express.Router()

router.get('/snacks', (req, res, next) => {
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

router.get('/snacks/:secret', (req, res, next) => {
  var query = {"secret" : req.params.secret };
  req.app.locals.db.collection('snacks').find(query).toArray((err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined || result.length === 0) {
      res.status(400).send({'error':'No snack in database'})
    } else {
      res.status(200).send(result)
    }
  })
})

router.get('/snacks/new/:secret/:value', (req, res, next) => {
  const newSnack = new Snack(req.params.secret, req.params.value)
  req.app.locals.db.collection('snacks').deleteOne({
      'secret': req.params.secret
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



router.delete('/snacks/delete/:secret', (req, res, next) => {
  req.app.locals.db.collection('snacks').deleteOne({
    'snacks': req.params.secret
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

module.exports = router
