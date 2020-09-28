const UserModel=require('./UserSchema')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
exports.login=async function(req,res){

    let user=await UserModel.findOne({email:req.body.email})

    if(!user)
    {
        res.json({success:false,message:"User with given Email does not exist"});
       
    }


    const userRo=getUserRo(user);

    res.json({success:true,data:userRo,message:'Login successfull'});

  




}


exports.register=async function(req,res){

    let user=await UserModel.findOne({email:req.body.email})
    console.log(user);
    if(user)
    {
        res.json({success:false,message:"User with given Email already exist"});
        
    }

    const newUser=new UserModel();
    newUser.email=req.body.email;
    newUser.password=req.body.password;
    newUser.name=req.body.name;
   


    newUser.save().then((User)=>{

        
        const userRo=getUserRo(newUser);


    res.json({success:true,data:userRo,message:'Register successfull'})



    }).catch(error=>{
        if(error)
        {
            res.json({success:false,message:'Unable to register',error:error})
    
        }
    
    })


    


}

const getUserRo=(user)=>{

    console.log(user);
   

    return ({
        uId:user._id,
        name:user.name,
        email:user.email,
       
        token:generateJwtToken(user),
    });

}

const generateJwtToken=(user)=>{

    return jwt.sign({user},"webRtcPataran")

}

