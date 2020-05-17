const mongoose = require('mongoose');


mongoose.connect( 'mongodb+srv://projekt:farmmanager2020@cluster0-wjiml.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
