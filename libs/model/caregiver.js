var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Caregiver

var Caregiver = new Schema({
	name: { type: String, required: true },
	interests: { type: String, required: true },
	modified: { type: Date, default: Date.now }
});

Caregiver.path('name').validate(function (v) {
	return v.length > 5 && v.length < 70;
});

module.exports = mongoose.model('Caregiver', Caregiver);
