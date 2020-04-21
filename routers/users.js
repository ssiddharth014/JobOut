const express=require('express');

//6
const passport=require('passport');
//2
const router=express.Router();

//4
const usersController=require('../controllers/user_controller');



//5
//making profile page accessible only when a user is signed in
//router.get('/profile',usersController.profile);-> if this is used profile page is aacessible even when a user is not signed in

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);


router.get('/signUp',usersController.signUp);
router.get('/jobseekerSignup',usersController.jobseekerSignup);
router.get('/signIn',usersController.signIn);
router.get('/jobseekerSignin',usersController.jobseekerSignin);
router.get('/apply/:id',usersController.apply);

router.post('/create',usersController.create);
router.post('/jobseekercreate',usersController.jobseekercreate);
router.get('/auth/google',passport.authenticate("google",{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate("google",{failureRedirect : '/users/signIn'}),usersController.createSession);

//router.post('/update/:id',usersController.update);
//router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.post('/create-session',passport.authenticate("local",
{failureRedirect :'/users/signIn'}),
usersController.createSession
);



// logout route
router.get('/signOut',usersController.destroySession);
//router.get('/signOut',usersController.destroySession);

module.exports=router;