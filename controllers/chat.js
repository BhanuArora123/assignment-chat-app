const user = require("../models/user");
const path = require("path");
const chat = require("../models/chat");
const socketIo = require("../utils/socket");
exports.getChat = (req,res,next) => {
    let email = req.params.email;
    let username;
    let usersData;
    user.findOne({
        email:email
    })
    .then((userData) => {
        username = userData.name;
        return user.find();
    })
    .then((users) => {
        usersData = users;
        return chat.find({
            $or:[{
                sentTo:email
            },{
                sentBy:email
            }]
        })
    })
    .then((chatDoc) => {
        console.log(usersData)

        res.render(path.join(__dirname,"..","views","chat.ejs"),{
            users:usersData,
            email:email,
            username:username,
            chats:chatDoc
        });
    })
    .catch((err) => {
        console.log(err);
    })
}
exports.sendChat = (req,res,next) => {
    let chatContent = req.body.chat;
    let userDoc;
    let sentBy = req.body.sentBy;
    let sentTo = req.body.sentTo;
    user.findOne({
        email:sentBy
    })
    .then((userData) => {
        userDoc = userData;
        let chatData = new chat({
            chatContent : chatContent,
            sentBy:sentBy,
            sentTo:sentTo,
            sentName:userDoc.name
        })
        return chatData.save()
    })
    .then((chatDoc) => {
        let iocon = socketIo.getIo();
        iocon.to(sentTo).emit("chat_msg",{
            msg:chatContent,
            sentBy:sentBy,
            name:userDoc.name
        })
        res.status(200).json({
            msg:"chat sent successfully"
        })
        // add socket io connection
    })
    .catch((err) => {
        console.log(err);
    })
}