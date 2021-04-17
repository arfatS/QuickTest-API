const mongoose = require('mongoose')

const submissionSchema = mongoose.Schema({
    quiz_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Quiz',
        validate: {
            validator : id => mongoose.model('Quiz').findById(id)
        }
    },
    choices : {
        type : Array,
        required : true
    },
    no_of_correct : {
        type : Number,
        required : true
    },
    no_of_incorrect : {
        type : Number,
        required : true
    },
    total_points : {
        type : Number,
        required : true
    }
},{
    timestamps : true
})

const Submission = mongoose.model('Submission', submissionSchema)

module.exports = Submission