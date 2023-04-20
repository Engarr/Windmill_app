const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

app.use(cors());
app.get('/api/test', (req, res) => {
	const time = new Date();
	res.json('hello world 2 ' + time);
});

if (process.env.API_PORT) {
	app.listen(process.env.API_PORT);
	console.log('server running');
}

module.exports = app;
