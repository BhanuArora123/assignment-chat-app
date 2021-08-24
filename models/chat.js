const mongoose = require("mongoose");
const schema = mongoose.Schema;

const chatSchema = new schema({
    chatContent:{
        type:String,
        required:true
    },
    sentBy:{
        type:String,
        required:true
    },
    sentTo:{
        type:String,
        required:true,
    },
    sentName:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("chat",chatSchema);