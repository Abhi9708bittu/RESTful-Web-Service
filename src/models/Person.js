const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		age: { type: Number, required: true, min: 0 },
		gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
		mobile: { type: String, required: true, trim: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Person', personSchema);
