const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 8000
const app = express()

//Mongoose connect
require('./src/db/mongoose')

//App middlewares
app.use(cors({ origin : 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//App routes
app.use('/category', require('./src/routes/category'))
app.use('/question', require('./src/routes/question'))
app.use('/quiz', require('./src/routes/quiz'))
app.use('/submission', require('./src/routes/submission'))
app.use('/ranking', require('./src/routes/ranking'))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
