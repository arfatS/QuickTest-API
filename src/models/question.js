const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    category_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Category'
    },
    body : {
        type : String,
        required : true,
        trim : true
    },
    options : {
        type : Array,
        required : true
    },
    answer : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

questionSchema.virtual('submissions',{
    ref : 'Question',
    localField : '_id',
    foreignField : 'question_id'
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question