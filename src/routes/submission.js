const express = require('express')
const router = express.Router()

const submissionController = require('../controllers/submission')

router.post('/', submissionController.create)
router.delete('/:id', submissionController.remove)
router.get('/quiz/:id', submissionController.findByQuiz)

module.exports = router