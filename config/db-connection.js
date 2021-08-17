const mongoose = require('mongoose');

module.exports = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        })
        
        if(conn) console.log('Database Connected');
    } catch(err){
        console.log(`Error: ${err}`);
        process.exit(1);
    }
}
