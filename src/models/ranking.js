const mongoose = require('mongoose')

const rankingSchema = mongoose.Schema({
    user_name : {
        type : String,
        required : true,
        unique : true
    },
    average_score : {
        type : Number,
        required : true
    },
    highest_score : {
        type : Number,
        required : true
    },
    no_of_attempts : {
        type : Number,
        required : true
    }
},{
    timestamps : true
})

const Ranking = mongoose.model('Ranking', rankingSchema)

module.exports = Ranking