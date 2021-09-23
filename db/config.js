const mongoose = require('mongoose');


const dbConection = async ()=>{

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        }).then( resp => {
            console.log( `Connecion to MongoDB is OK!` );
        }).catch( err => {
            console.log( `Error connecion: `, err );
        })
}


module.exports = {
    dbConection
}