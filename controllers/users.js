const path = require("path");

const user = require("../models/user");

exports.getHome = (req,res,next) => {
    res.render(path.join(__dirname,"..","views","index.ejs"));
}
exports.getUser = (req,res,next) => {
    //display Users
    user.find()
    .then((users) => {
        res.render(path.join(__dirname,"..","views","users.ejs"),{
            users:users
        });
    })
    .catch((err) => {
        console.log(err);
    })
}
exports.createUser = async (req,res,next) => {
    let name = req.body.name;
    let email = req.body.email;
    let registeredUser = await user.findOne({email:email});
    if(registeredUser){
        return res.status(422).json({
            msg:"user already exists"
        })
    }
    let userData = new user({
        name:name,
        email:email
    })
    let userDoc = await userData.save();
    res.redirect("/users");
}