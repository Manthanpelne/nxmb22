const {UserModel}=require("../models/usermodel")

const valid = async(req,res,next)=>{
   const {email} = req.body

   try {
    if(req.url=="/login"){
        const user = await UserModel.find({email})
        if(user.length){
            next()
        }else{
            res.status(400).send({"msg":"User not registered! Register first"})
        }
    }else{
        next()
    }
   } catch (error) {
    console.log(error)
   }
}

module.exports = {valid}