const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Users',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});


module.exports = mongoose