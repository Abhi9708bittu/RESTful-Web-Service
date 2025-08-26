const express = require('express');
const Person = require('../models/Person');
const router = express.Router();

// GET /person - list all persons
router.get('/', async (req, res) => {
	const people = await Person.find().sort({ createdAt: -1 });
	res.render('person/index', { people });
});

// POST /person - show create form
router.get('/new', (req, res) => {
	res.render('person/new');
});

router.post('/', async (req, res) => {
	try {
		const { name, age, gender, mobile } = req.body;
		await Person.create({ name, age, gender, mobile });
		res.redirect('/person');
	} catch (err) {
		res.status(400).send('Error creating person: ' + err.message);
	}
});

// PUT /person/:id - show edit form
router.get('/:id/edit', async (req, res) => {
	const person = await Person.findById(req.params.id);
	if (!person) return res.status(404).send('Person not found');
	res.render('person/edit', { person });
});

router.put('/:id', async (req, res) => {
	try {
		const { name, age, gender, mobile } = req.body;
		await Person.findByIdAndUpdate(
			req.params.id,
			{ name, age, gender, mobile },
			{ runValidators: true }
		);
		res.redirect('/person');
	} catch (err) {
		res.status(400).send('Error updating person: ' + err.message);
	}
});

// DELETE /person/:id - show delete confirmation
router.get('/:id/delete', async (req, res) => {
	const person = await Person.findById(req.params.id);
	if (!person) return res.status(404).send('Person not found');
	res.render('person/delete', { person });
});

router.delete('/:id', async (req, res) => {
	try {
		await Person.findByIdAndDelete(req.params.id);
		res.redirect('/person');
	} catch (err) {
		res.status(400).send('Error deleting person: ' + err.message);
	}
});

module.exports = router;
