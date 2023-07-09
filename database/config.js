const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_CONECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });
    
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error starting database');
    }
}

module.exports = {
    dbConnection
}