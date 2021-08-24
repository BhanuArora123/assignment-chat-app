const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    chats: [
        {
            chatId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"chat",
                required:true
            }
        }
    ]
})
module.exports = mongoose.model("user", userSchema);