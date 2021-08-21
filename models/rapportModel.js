const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rapportModel = new Schema({
	nom: {
		type: String,
		required: true
	},
	filename: {
		type: String,
		required: true
	},
	etudiant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'etudiant'
	},
	departement: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'departement'
	},
	stage: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "stage"
	}
});

module.exports = mongoose.model("rapport", rapportModel);