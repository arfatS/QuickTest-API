const mongoose = require('mongoose')

const submissionSchema = mongoose.Schema({
    question_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Question'
    },
    choice : {
        type : String,
        required : true
    },
    is_correct : {
        type : Boolean,
        required : true
    }
})

const Submission = mongoose.model('Submission', submissionSchema)

module.exports = Submission