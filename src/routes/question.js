const express = require('express')
const router = express.Router()

const questionController = require('../controllers/question')

router.get('/', questionController.index)
router.post('/', questionController.create)
router.put('/:id', questionController.update)
router.delete('/:id', questionController.remove)

module.exports = router