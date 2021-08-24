const express = require("express");

const mongoose = require("mongoose");
const app = express();

const socketIo = require("./utils/socket");

const path = require("path");

const userRouter = require("./routes/user");

const chatRouter = require("./routes/chat");

app.set("view engine","ejs");

app.set("views","views");

app.use("/public",express.static(path.join(__dirname,"public")))

app.use(express.urlencoded({
    extended:false
}));

app.use(express.json());

app.use(userRouter);

app.use(chatRouter);

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.kpq9o.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`)
.then((result) => {
    let server = app.listen(3000);
    return socketIo.setIo(server)
})
.then((iocon) => {
    iocon.on("connect_error",(err) => {
        console.log(err);
    })
    iocon.on("connection",(socket) => {
        console.log("client Connected")
        socket.on("emailId",(data) => {
            socket.join(data.email);
        })
    })

})
.catch((err) => {
    console.log(err);
})