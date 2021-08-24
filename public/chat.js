window.onload = () => {
    document.getElementById("send").addEventListener("click", () => {
        let sentTo = document.getElementById("sendTo").value;
        let sentBy = document.getElementById("emailId").getAttribute("data-email")
        console.log(sentBy)
        let chat = document.getElementById("chatContent").value;
        console.log("i am done");
        fetch("/sendChat", {
            method: "POST",
            body: JSON.stringify({
                chat: chat,
                sentTo: sentTo,
                sentBy: sentBy
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                let chatBox = document.getElementById("chatBox");
            chatBox.innerHTML += `
                <div class="container d-flex justify-content-evenly flex-column align-items-start bg-success text-light w-75 mt-3">
                    <div>${document.getElementById("emailId").getAttribute("data-name")}</div>
                    <div>${chat}</div>
                </div>
            `
            })
    })
}