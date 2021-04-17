const Category = require('../models/category')


//Get all categories
const index = (req, res) => {
    Category.find({})
    .then(data => {
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
} 

//Create category
const create = (req, res) => {
    if (!req.body.category) {
        return res.status(400).send({ error : 'Category field is required.'})
    }

    const category = new Category({
        category : req.body.category
    })

    category.save()
    .then(data => {
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
}

//Update category
const update = (req, res) => {
    if (!req.body.category) {
        return res.status(400).send({ error : 'Category field is required.'})
    }

    const id = req.params.id
    Category.findByIdAndUpdate(id, req.body)
    .then(data => {
        if (!data) {
            return res.status(404).send({ error : 'Category not found.'})
        }
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
}

//Delete Category
const remove = (req, res) => {
    const id = req.params.id

    Category.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            return res.status(404).send({ error : 'Category not found.'})
        }
        res.send({ data })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
}


module.exports = {
    index,
    create,
    update,
    remove
}