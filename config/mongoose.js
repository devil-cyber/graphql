const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mani:mani360@@cluster0.lvrjg.mongodb.net/library?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind('Error in connecting database'));
db.once("open", function () {
    console.log('Connected sucessfully to DataBase MongoDB');
})

module.exports = db;