import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter your name"],
    maxLength: [50, "Your name cannot exceed 50 charactor"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role : {
    type : String,
    default : "user"
  },
  resetPasswordToken : String,
  resetPasswordExpire : Date
},{timestamps : true});


//Encrypting password before saving the user
userSchema.pre('save' , async function (next) {
     if(!this.isModified("password")){
      next()
     }

     this.password = await bcrypt.hash(this.password , 10)
})


export default mongoose.model('User' , userSchema)