const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/quick-test', {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false
})
.then(() => {
    console.log('Connected to the database.')
})
.catch(error => {
    console.log('Cannot connect to the database. ', error)
    process.exit()
})
