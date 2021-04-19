const express = require('express')
const router = express.Router()

const rankingController = require('../controllers/ranking')

router.get('/', rankingController.getRankings)

module.exports = router