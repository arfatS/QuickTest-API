const express = require('express')
const router = express.Router()

const submissionController = require('../controllers/submission')

router.get('/', submissionController.index)
router.post('/:id', submissionController.create)
router.delete('/:id', submissionController.remove)

module.exports = router