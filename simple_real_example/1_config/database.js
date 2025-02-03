const mongoose = require("mongoose");
// to create a connection with mongodb you should create cluster then take link from mongodb website 
const DbConnection = ()=> {
    // to make your connection secure use (.env) you must install (npm i dotenv) use it i server.js file 
    mongoose.connect(`mongodb+srv://marselhanani1:${process.env.password}@cluster0.smbml.mongodb.net/RealExample?retryWrites=true&w=majority&appName=Cluster0`, {useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => console.log('Connected to MongoDB'))
       .catch(err => console.error('Could not connect to MongoDB:', err));
}

module.exports = DbConnection;// don't forget this line 