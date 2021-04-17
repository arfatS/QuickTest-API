const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
    user_name : {
        type : String,
        required : true,
    },
    categories : {
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Category',
            validate: {
                validator : id => mongoose.model('Category').findById(id)
            }
        }],
        required : true,

    },
    questions : {
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Question',
            validate: {
                validator : id => mongoose.model('Question').findById(id)
            }
        }],
        required : true
    }
},{
    timestamps : true
})

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz
