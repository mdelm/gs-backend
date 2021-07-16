const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrepriseModel = new Schema({

	nom: {
		type: String,
		required: true
	},

	adresse: {
		type: String,
		required: true
	},

	telephone: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	fax: {
		type: String,
		required: true
	},

	specialite: {
		type: String,
		required: true
	}

});

module.exports = mongoose.model("entreprise", EntrepriseModel);