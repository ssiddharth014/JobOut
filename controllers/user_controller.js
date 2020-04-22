const User=require('../models/user');
const Post= require('../models/post');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){


        return res.render('user_profile',{
        title:"PROFILE",
       profile_user:user

    });

    });
    
}





module.exports.signUp=function(req,res){

// if the user is already signin 
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signup',{
        title: "SIGN UP"
    });
}

module.exports.jobseekerSignup=function(req,res){

// if the user is already signin 
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('jobseekerSignup',{
        title: "SIGN UP"
    });
}


module.exports.signIn=function(req,res){

// if the user is already signin 
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signin',{
        title: "SIGN IN"
    });
}


module.exports.jobseekerSignin=function(req,res){

// if the user is already signin 
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('jobseekerSignin',{
        title: "SIGN IN"
    });
}



//creating a user
module.exports.jobseekercreate=function(req,res)
{

    if (req.body.password!=req.body.confirm_password)
    {
        res.redirect('back');
    }


    User.findOne({email:req.body.email},function(err,user){

        if (err){
            console.log('error in finding user in signing up');
            return}

            if (!user){
            User.create({name:req.body.name,identity:req.body.id,email:req.body.email,password:req.body.password,type:"jobseeker",employment:req.body.employment},function(err,u){
                if (err){console.log('error in  signing up');
                return}
                else if(u){
                    return res.render('signin',{title:"sign in"});
            }
            });
            }
            else{
                return res.redirect('back');
            }

    });
    return res.render('signin',{title:"sign in"});
    
}
//creating a user
module.exports.create=function(req,res)
{

    if (req.body.password!=req.body.confirm_password)
    {
        console.log("password err");
        res.redirect('back');
    }


    User.findOne({email:req.body.email},function(err,user){

        if (err){
            console.log('error in finding user in signing up');
            return}

            if (!user){
            User.create({name:req.body.name,identity:req.body.id,email:req.body.email,password:req.body.password,type:"recruiter"},function(err,u){
                if (err){
                    console.log('error in  signing up');
                return}

                return res.render('signin',{title:"sign in"});
            });
            }
            else{
                return res.redirect('back');
            }

    });
    
}



module.exports.apply=function(req,res){
    console.log("here");
    Post.find({}).
    populate('user').
    populate({
        path:'applications',
        populate :{path:'user'}
     })
    .exec(function(err,posts)

{

    User.find({},function(err,users){



        return res.render('applications',{
            title:"Applications",
            posts:posts,
            all_users:users
        });

    });


        
    });
}

/*module.exports.update= async function(req,res){
    console.log('heree')
       if (req.user.id==req.params.id)
       {
        try{
              let user=await User.findById(req.params.id);
              User.uploadedAvatar(req,res,function(err){
                 if (err){console.log('********multer eror',err)}

                    user.name=req.body.name;
                    user.email=req.body.email;
                    if (req.file){{}
                        user.avatar=User.avatarPath + '/' + req.file.filename;
                        user.save();
                    }
                    return res.redirect('back');
              });
        }
        catch(err){
            return res.redirect('back');
        }

       }
       else
       {

       }
}*/

//create session
module.exports.applications=function(req,res){
    
    
    User.find({}).populate('post').exec(function(err,users){
    Post.find({},function(err,posts){

        User.findById(req.params.id,function(err,u){

             console.log("qwqwq");
                return res.render('apply',{
            title:"Applied",
            posts:posts,
            users:users,
            user:u
        });

        });
               

            

            

        });
        
    
});

}
module.exports.createSession=function(req,res)

{
   // req.flash('success','Logged in Successfully');

    return res.redirect('/');
}


// action for logging out
module.exports.destroySession=function(req,res){
    req.logout();
  //  req.flash('success','Logged Out');
    return res.redirect('/');
}