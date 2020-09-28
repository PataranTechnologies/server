const Mongoose=require('mongoose')

const UserSchema=Mongoose.Schema({

    name:{
        type:String,
        require:true,
        
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
   

})




module.exports=Mongoose.model("UserDb",UserSchema);
