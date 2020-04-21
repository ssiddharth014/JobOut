const Post=require('../models/post');

const User=require('../models/user');



module.exports.create= async  function(req,res){
	try{
		let posts=await Post.create({

         employmentType:req.body.employmentType,
         profile:req.body.profile,
         salary:req.body.salary,

         per:req.body.per,



		requirements:req.body.requirements,
		creator:req.user.identity,
		user:req.user._id

	});

		if(req.xhr){
			console.log('xhr');
			return res.status(200).json({
				data:{
					post:posts
				},
				message:"Post created"


			});
		}
		console.log('nxhr');
		return res.redirect ('back');
	}
	catch(err)
	{
		console.log('error',err);
		return;
	}
}
/*
module.exports.create=function(req,res){
	Post.create({
		content:req.body.content,
		user:req.user._id

	},function(err,posts){
		if (err){console.log('error');return;}
		console.log(posts.user.name);
		return res.redirect('back');
	});
}
*/


module.exports.destroy=function(req,res){
	Post.findById(req.params.id,function(err,post){



		if (post.user==req.user.id)
		{



			post.remove();
			Comment.deleteMany({
				post:req.params.id},
				function(err){
					return res.redirect('back');
				});
		}
		else
		{
          return res.redirect('back');
		}

	});
	}

module.exports.setup=function(req,res){


	Post.findById(req.params.id2,function(err,post){
		if(post)
		{
			post.appliers.push({ids:req.params.id1});
			post.save();
			User.findOne({identity:req.params.id1},function(err,user){
				if(user)
				{
					user.post.push(post._id);
					user.save();
					console.log(user);
				}
			})
			console.log(post);
			return res.redirect('/');
		}
		if(err)
		{
			console.log("eror in creating",err)
			return ;
		}
	})

}
