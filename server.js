const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
	console.log('A user connected');

	socket.on('message', (message) => {
		console.log(`Message received: ${message}`);
		io.emit('message', `${socket.id.slice(0, 6)}: ${message}`);
	});

	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
