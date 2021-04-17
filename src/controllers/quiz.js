const Quiz = require('../models/quiz')
const Question = require('../models/question')


//Find all quizzes
const index = (req, res) => {
    Quiz.find({})
    .then(data => {
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
}

//Create a quiz
const create = (req, res) => {
    const { user_name, categories } = req.body

    let questions = []

    categories.forEach((category_id, index) => {
        Question.find({ category_id })
        .then(q => {
            q.forEach(question => {
                questions.push(question.id)
            })

            if (index === categories.length - 1) {
                const quiz = new Quiz({
                    user_name,
                    categories,
                    questions
                })
            
                quiz.save()
                .then(data => {
                    res.send({ data })
                })
            }
        })
        .catch(error => {
            res.status(500).send({ error })
        })      
    })

}

//Delete a quiz
const remove = (req, res) => {
    const id = req.params.id

    Quiz.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            return res.status(404).send({ error : 'Quiz not found'})
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
    remove
}