const Question = require('../models/question')

//Find all questions
const index = (req, res) => {
    Question.find({})
    .then(data => {
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
}

//Create question
const create = (req, res) => {
    const { category_id, body, options, answer } = req.body

    const question = new Question({
        category_id,
        body,
        options,
        answer
    })

    question.save()
    .then(data => {
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
}

//Update question
const update = (req, res) => {
    const id = req.params.id

    Question.findByIdAndUpdate(id, req.body)
    .then(data => {
        if (!data) {
            return res.status(404).send({ error : 'Question not found'})
        }
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
}

//Delete question
const remove = (req, res) => {
    const id = req.params.id

    Question.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            return res.status(404).send({ error : 'Question not found'})
        }
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
}

//Find questions by category
const findByCategory = (req, res) => {
    const category_id = req.params.id

    Question.find({ category_id })
    .then(data => {
        if (!data.length) {
            return res.status(404).send({ error : 'No questions under this category.'})
        }
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
}


module.exports = {
    index,
    create,
    update,
    remove,
    findByCategory
}