const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    category : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

categorySchema.virtual('questions',{
    ref : 'Question',
    localField : '_id',
    foreignField : 'category_id'
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category