const socketio = require("socket.io");

let ioObj;
module.exports = {
    setIo:async (server) => {
        ioObj = await socketio(server);
        return ioObj;
    },
    getIo:() => {
        if(!ioObj){
            throw new Error("socket error");
        }
        return ioObj;
    }
}