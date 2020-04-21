const mongoose= require('mongoose');

const postSchema=new mongoose.Schema({
    
    employmentType:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    per:{
        type:String,
        required:true
    },

    requirements:{
        type: String,
        required: true
    },
    creator:{
        type: Number

    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    appliers:[{
       ids:{type:Number}
    }],

     comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'

    }],
    
}, {
    timestamps:true

});
const Post= mongoose.model('Post',postSchema);

module.exports=Post;