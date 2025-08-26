const mongoose = require('mongoose');
const path = require('path');
const Person = require(path.join(__dirname, '..', 'models', 'Person'));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/people_db';

const indianNames = [
	'Ram',
	'Nitin',
	'Prince',
	'Shyam',
	'Rohan',
	'Aryan',
	'Rahul',
	'Ankit',
	'Amit',
	'Vikram'
];

async function run() {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('Connected to MongoDB');

		const people = await Person.find().sort({ createdAt: 1 }).limit(10);

		if (people.length > 0) {
			for (let i = 0; i < people.length; i++) {
				people[i].name = indianNames[i % indianNames.length];
				await people[i].save();
			}
			console.log(`Updated names for ${people.length} existing people.`);
		}

		if (people.length < 10) {
			const toInsert = [];
			for (let i = people.length; i < 10; i++) {
				toInsert.push({
					name: indianNames[i],
					age: 20 + (i % 15),
					gender: i % 2 === 0 ? 'Male' : 'Other',
					mobile: `555-1${(100 + i).toString().slice(-3)}`
				});
			}
			if (toInsert.length) {
				await Person.insertMany(toInsert);
				console.log(`Inserted ${toInsert.length} new people.`);
			}
		}
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		await mongoose.disconnect();
		console.log('Disconnected from MongoDB');
	}
}

run();
