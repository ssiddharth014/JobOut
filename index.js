const express=require('express');
const cookieParser=require('cookie-parser');
//const http=require('http');
//const path=require('path');
const port=process.env.PORT || 5000;
const app=express();
//layout
const expressLayouts= require('express-ejs-layouts');
const db=require('./config/mongoose');

db();

// used for session cookie
const session = require('express-session');
//passport for users
const passport=require('passport');


const reversedObject=require('reverse-object-order');


const passportLocal= require('./config/passport-local-strategy');

//const MongoStore=require('connect-Mongo')(session);

//middleware for post request
app.use(express.urlencoded());
//middleware for cookie
app.use(cookieParser());

// middleware for layouts
app.use(expressLayouts);
// set up of view engines

app.set('view engine','ejs');
app.set('views','./views');

//app.use('/uploads',express.static(__dirname + '/uploads'));

//extract styles and scripts for sub pages
app.set('layout extractStyles',true);

app.set('layout extractScripts',true);
app.use(express.static('./assets'));

// middlewaare 
// mongo store us used to store the session  cookie in the db
/*
app.use(session({
    name:'social-house',
    secret:"blahsomething",
    saveUnintialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 *100)
    }
}));
app.use(express.session({
    name:'jobout',
    secret: 'keyboard cat',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new MongoStore({
        url: 'mongodb+srv://foodshalauser:foodshala@foodshalacluster-xsd3l.mongodb.net/test?retryWrites=true&w=majority',
        touchAfter: 24 * 3600 // time period in seconds
    })
}));*/
app.use(session({
    name:'jobout',
    secret: 'keyboard cat',
    saveUninitialized: false, // don't create session until something stored
    resave: false,
    cookie:{
        maxAge:(1000 *60 * 100)
    }
    })
    );/*
    store: new MongoStore({
        url: "mongodb+srv://jobout:jobout@jobout-cqnps.mongodb.net/test?retryWrites=true&w=majority",
        autoRemove: 'disabled'
    })
}));*/
//app.use(flash());
//app.use(customMware.setflash);
app.use(passport.initialize());
app.use(passport.session());
// this miidleware calls the setauthenticated function and usees the session cookie to feed the view with users info
app.use(passport.setAuthenticatedUser);



 // middleware : use express router 

app.use('/',require('./routers/index'));

app.listen(port,function(err,){
 
    if (err){
        console.log(`error in running the server : ${err}`);
    }



    console.log(`server is up and running at port :${port}`);
}); 