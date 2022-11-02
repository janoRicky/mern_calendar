const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
	uuid: {
		type: String,
		require: true,
		trim: true,
		default: uuidv4()
	},
	name: {
		type: String,
		trim: true
	},
	description: String,
	date_start: Date,
	date_end: Date,
}, {
	timestamps: true
});

const Event = new mongoose.model('Event', eventSchema);


module.exports = Event;
