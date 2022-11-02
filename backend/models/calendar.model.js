const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
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
	color: String
}, {
	timestamps: true
});

const Calendar = new mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;

