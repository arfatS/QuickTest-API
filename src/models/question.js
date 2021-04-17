const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    category_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Category',
        validate: {
            validator : id => mongoose.model('Category').findById(id)
        }
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

const Question = mongoose.model('Question', questionSchema)

module.exports = Question