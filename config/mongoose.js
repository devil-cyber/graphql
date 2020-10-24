const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind('Error in connecting database'));
db.once("open", function () {
    console.log('Connected sucessfully to DataBase MongoDB');
})

module.exports = db;