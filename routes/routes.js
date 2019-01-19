const express = require('express')

const Snack = require('../models/Snack')
const router = express.Router()

router.get('/snacks/:secret', (req, res, next) => {
  req.app.locals.db.collection('snacks').findOne({
    '_secret': req.params.secret
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined) {
      res.status(400).send({'error':'No Snacks. Invalid client secret.'})
    } else {
      res.status(200).send(result)
    }
  })
})

router.post('/snacks/new', (req, res, next) => {
  const newSnack = new Snack(req.body.secret, req.body.value)
  req.app.locals.db.collection('snacks').deleteOne({
      '_secret': req.params.secret
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
    '_secret': req.params.secret
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

module.exports = router
