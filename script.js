const socket = io();

const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', (e) => {
	e.preventDefault();
	sendMessage();
});

function sendMessage() {
	const message = messageInput.value.trim();
	if (message === '') {
		return;
	}
	addMessage(`You: ${message}`);
	socket.emit('message', message);
	messageInput.value = '';
	messageInput.focus();
}

function addMessage(message) {
	const messageElement = document.createElement('p');
	messageElement.innerText = message;
	messageContainer.appendChild(messageElement);
	messageContainer.scrollTop = messageContainer.scrollHeight;
}

socket.on('message', (message) => {
	addMessage(message);
});
``
