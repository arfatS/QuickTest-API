const Submission = require('../models/submission')
const Quiz = require('../models/quiz')
const Question = require('../models/question')
const Ranking = require('../models/ranking')

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
                        updateRanking(data)
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

//Update Ranking with latest submission
const updateRanking = (submission) => {
    Quiz.findById(submission.quiz_id)
    .then(quiz => {
        const user_name = quiz.user_name
        
        Ranking.findOne({ user_name })
        .then(ranking => {
            if (ranking) {
                let no_of_attempts = ranking.no_of_attempts + 1
                let average_score = ((ranking.average_score * ranking.no_of_attempts) + submission.total_points) / (no_of_attempts)
                let highest_score = ranking.highest_score
                
                console.log(`PrevScore : ${(ranking.average_score * ranking.no_of_attempts)} NewScore : ${(ranking.average_score * ranking.no_of_attempts) + submission.total_points}`)

                if (submission.total_points > highest_score) {
                    highest_score = submission.total_points
                }
                
                Ranking.findByIdAndUpdate(ranking._id,{
                    average_score,
                    highest_score,
                    no_of_attempts
                })
                .then(console.log)

            } else {
                const ranking = new Ranking({
                    user_name,
                    average_score : submission.total_points,
                    highest_score : submission.total_points,
                    no_of_attempts : 1
                })

                ranking.save()
                .then(console.log)
            }
        })
    })
    .catch(error => {
        res.status(500).send({error})
    })
}

module.exports = {
    create,
    remove,
    findByQuiz
}