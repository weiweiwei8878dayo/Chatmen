document.addEventListener('DOMContentLoaded', function () {
    const chatLog = document.getElementById('chat-log');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // メッセージをローカルストレージから読み込む
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    // ローカルストレージから読み込んだメッセージを表示する
    storedMessages.forEach(function (messageText) {
        const messageElement = document.createElement('div');
        messageElement.textContent = messageText;
        chatLog.appendChild(messageElement);
    });

    sendButton.addEventListener('click', function () {
        const messageText = messageInput.value;
        if (messageText.trim() !== '') {
            const messageElement = document.createElement('div');
            messageElement.textContent = messageText;
            chatLog.appendChild(messageElement);

            // メッセージをローカルストレージに保存
            storedMessages.push(messageText);
            localStorage.setItem('chatMessages', JSON.stringify(storedMessages));

            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });
});
