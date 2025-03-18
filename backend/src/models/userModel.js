import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    fullName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    profilePic:{
        type: String,
        default: ""
   },
   
},
{
    timestamps:true //InBuilt tool tells mongodb to add createdAt and updatedAt by default no need to add in schema in custom form
}
)

const User = model("User",UserSchema)
export default User;