const Submission = require('../models/submission')
const Quiz = require('../models/quiz')
const Question = require('../models/question')

//Create a submission 
const create = (req, res) => {
    const {quiz_id, choices} = req.body
    let no_of_correct = 0
    let no_of_incorrect = 0

    Quiz.findById(quiz_id)
    .then(quiz => {
        quiz.questions.forEach((question_id, index) => {
            Question.findById(question_id)
            .then(question => {
                if (question.answer === choices[index]) {
                    no_of_correct++
                } else {
                    no_of_incorrect++
                }

                if (index === quiz.questions.length - 1) {
                    const submission = new Submission({
                        quiz_id,
                        choices,
                        no_of_correct,
                        no_of_incorrect,
                        total_points : no_of_correct - no_of_incorrect
                    })
                    
                    submission.save()
                    .then(data => {
                        res.send({ data })
                    })
                }
            })
        })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
    
}

//Delete a submission
const remove = (req, res) => {
    const id = req.params.id

    Submission.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            return res.status(404).send({ error : 'Submission not found.'})
        }
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
}

//Find submissions by quiz
const findByQuiz = (req, res) => {
    const quiz_id = req.params.id

    Submission.find({ quiz_id })
    .then(data => {
        if (!data.length) {
            return res.status(404).send({ error : 'No submissions for this quiz.'})
        }
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
} 

module.exports = {
    create,
    remove,
    findByQuiz
}