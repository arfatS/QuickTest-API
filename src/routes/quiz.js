const express = require('express')
const router = express.Router()

const quizController = require('../controllers/quiz')

router.get('/', quizController.index)
router.post('/', quizController.create)
router.delete('/:id', quizController.remove)

module.exports = router