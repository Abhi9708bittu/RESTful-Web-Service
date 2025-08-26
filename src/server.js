const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/people_db';
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', true);
mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('MongoDB connected');
	})
	.catch((err) => {
		console.error('MongoDB connection error:', err);
		process.exit(1);
	});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
const personRouter = require('./routes/person');
app.use('/person', personRouter);

app.get('/', (req, res) => {
	res.redirect('/person');
});

app.use((req, res) => {
	res.status(404).send('Not Found');
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
