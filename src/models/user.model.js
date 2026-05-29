const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email Required"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email address" ],
        unique:[true,"Email exists"]
    },
    name:{
        type:String,
        required: [true,"Name Required"],
    },
    password:{
        type:String,
        required:[true,"Password Required"],
        minlength:[6,"passowrd should contain more than 6 character"],
        select: false
    }
},
{
    timestamps: true
})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        return next()
    }// if password is not modifies thenn next  if yes!!!
    
    const hash = await bcrypt.hash(this.password,10) //then that password gets hashed
    this.password = hash // here the hashed password stored in this.password
    return 
})


userSchema.methods.comparePassword = async function(password){

    return await bcrypt.compare(password,this.password)

}



const userModel = mongoose.model("user",userSchema) // usermodel is table and user is actual row

module.exports = userModel