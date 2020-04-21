const express=require('express');
const cookieParser=require('cookie-parser');
//const path=require('path');
const port=process.env.PORT || 5000;
const app=express();
//layout
const expressLayouts= require('express-ejs-layouts');
const db=require('./config/mongoose');

//db();

// used for session cookie
const session = require('express-session');
//passport for users
const passport=require('passport');





const passportLocal= require('./config/passport-local-strategy');

const MongoStore=require('connect-Mongo')(session);
//middleware for post request
app.use(express.urlencoded());
//middleware for cookie
app.use(cookieParser());

// middleware for layouts
app.use(expressLayouts);
// set up of view engine

app.set('view engine','ejs');
app.set('views','./views');

//app.use('/uploads',express.static(__dirname + '/uploads'));

//extract styles and scripts for sub pages
app.set('layout extractStyles',true);

app.set('layout extractScripts',true);
app.use(express.static('./assets'));


// middlewaare 
// mongo store us used to store the sessio  cookie in the db

app.use(session({
    name:'social-house',
    secret:"blahsomething",
    saveUnintialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 *100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err||'connect mongodb set up ok');
        }
    )
}));


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