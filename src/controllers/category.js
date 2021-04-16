const Category = require('../models/category')

const index = (req, res) => {
    res.send({
        message : 'Welcome to Category Controller'
    })
} 

const create = (req, res) => {

}

const update = (req, res) => {

}

const remove = (req, res) => {

}

module.exports = {
    index,
    create,
    update,
    remove
}