// Firebase構成情報をセットアップ
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebaseプロジェクトに接続
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener('DOMContentLoaded', function () {
    const chatLog = document.getElementById('chat-log');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function () {
        const messageText = messageInput.value;
        if (messageText.trim() !== '') {
            // Firebase Realtime Databaseにメッセージを保存
            database.ref('chat').push({
                message: messageText
            });
            messageInput.value = '';
        }
    });

    // Firebase Realtime Databaseからメッセージをリアルタイムで取得
    database.ref('chat').on('child_added', function (snapshot) {
        const messageText = snapshot.val().message;
        const messageElement = document.createElement('div');
        messageElement.textContent = messageText;
        chatLog.appendChild(messageElement);
    });
});
