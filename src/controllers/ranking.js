const Ranking = require('../models/ranking')

const getRankings = (req, res) => {
    Ranking.find({}).sort({average_score : -1})
    .then(data => {
        res.send({data})
    })
    .catch(error => {
        res.status(500).send({error})
    })
}

module.exports = {
    getRankings
}