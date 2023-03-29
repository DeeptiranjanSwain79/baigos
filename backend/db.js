const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect('mongodb+srv://admin:admin@cluster0.hmzhfhc.mongodb.net/?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log(`Mongodb connected to the server: ${data.connection.host}`);
        });
}

module.exports = connectDatabase;