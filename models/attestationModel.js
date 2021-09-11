const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attestationModel = new Schema({
	etudiant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "etudiant",
	},
	ancadreur: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "enseignant",
	},
	departement: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "departement",
	},
	chef_departement: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "enseignant",
	},
	raison: {
		type: String,
		required: true,
	},
	specialite: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	confirmed_by_ancadreur: {
		type: Boolean,
		required: false,
		default: false
	},
	confirmed_by_chef_departement: {
		type: Boolean,
		required: false,
		default: false
	}
});

module.exports = mongoose.model("attestation", attestationModel);