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
            User.create({name:req.body.name,identity:req.body.id,email:req.body.email,password:req.body.password,type:"jobseeker",employment:req.body.employment},function(err,user){
                if (err){console.log('error in  signing up');
                return}

                return res.render('signin',{title:"sign in"});
            })
            }
            else{
                return res.redirect('back');
            }

    });
    
}
//creating a user
module.exports.create=function(req,res)
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
            User.create({name:req.body.name,identity:req.body.id,email:req.body.email,password:req.body.password,type:"recruiter"},function(err,user){
                if (err){console.log('error in  signing up');
                return}

                return res.render('signin',{title:"sign in"});
            })
            }
            else{
                return res.redirect('back');
            }

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
module.exports.apply=function(req,res){
    User.find({}).populate('post').exec(function(err,users){
        User.findById(req.params.id,function(err,user){
            console.log(user.post);
              return res.render('apply',{title:user.name,u:user});
        });
        
    });
}
module.exports.createSession=function(req,res)
{
    return res.redirect('/');
}


// action for logging out
module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}