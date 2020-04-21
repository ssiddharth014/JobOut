const mongoose= require('mongoose');

mongoose.connect("mongodb+srv://foodshalauser:foodshala@foodshalacluster-xsd3l.mongodb.net/test?retryWrites=true&w=majority");

const db=mongoose.connection;


db.on('error',console.error.bind(console,"error in connecting to mongodb"));






db.once('open',function(){
    console.log('connected to database :: mongodb');
});

module.exports=db;