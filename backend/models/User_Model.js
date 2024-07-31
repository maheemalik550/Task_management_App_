
const {mongoose } = require("mongoose");


const users = new mongoose.Schema({
    full_name:{
        type:"String",
        require:true
    },
    phone_number: {
        type: String,
        required: true,
         maxlength: 11
      },
      profileImage: {
        type: String,
        default: '' 
    },
      email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      login_count: {
        type: Number,
        required: true,
        default: 0,
      },
})

const userSchema = mongoose.model("users",users)
module.exports = {userSchema}