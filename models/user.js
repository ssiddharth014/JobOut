const mongoose= require('mongoose');

const userSchema=new mongoose.Schema({
	identity:{ type:Number,
      },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true

    },
    name:{
        type: String,
        required:true

    },
    employment:{
    	type:String
    },
    type:{
    	type:String
    },
    post:[{type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'

    }],
}, {
    timestamps:true

});


const User= mongoose.model('User',userSchema);

module.exports=User;