import { model, Schema } from "mongoose";

const messageSchema = new Schema({
    senderId:{
        type: Schema.Types.ObjectId, //This implies that this will store mongodb's unique key _id
        ref: "User", // this establishes a relationship between two databases like a foreign key
        required: true,
    },
    recieverId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    textMessage:{
        type:String,
    },
    imageMessage:{
        type:String,
    }
})

const Message = model("Message",messageSchema)
export default Message