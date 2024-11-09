const sendChatBtn = document.querySelector(".chat-input span")
const chatInput = document.querySelector(".chat-input  textarea")
const chatBox = document.querySelector(".chatbox");
let userMessage;
const API_KEY = "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"


const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === 'outgoing' ?
        `<p> ${message}</p>` :
        ` <span class="fa-solid fa-robot"></span>
        <p> ${message} </p>`

    chatLi.innerHTML = chatContent;
    return chatLi;
}
const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions"
    const messageElement = incomingChatLi.querySelector("p");


    const requestOption = {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer  ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": userMessage
                }
            ]
        })


    }
    fetch(API_URL, requestOption)
        .then((res => res.json()))
        .then((data) => {
            messageElement.textContent = data.choices[0].message.content;
        }).catch((error) => {
            messageElement.textContent = "Oops! Something went wrong . Please try again."
        })

}




const handleChat = () => {
    userMessage = chatInput.value;
    if (!userMessage) return;
    chatBox.append(createChatLi(userMessage, 'outgoing'))
    setTimeout(() => {
        const incomingChatLi = createChatLi('Thinking...', 'incoming')
        chatBox.append(incomingChatLi);
        generateResponse(incomingChatLi);

    }, 600);
}
sendChatBtn.onclick = () => {
    handleChat();
}

