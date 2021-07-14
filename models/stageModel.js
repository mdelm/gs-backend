const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stageModel = new Schema({
	sujet: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	binome: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "etudiant"
	}],
	date_debut: {
		type: String,
		required: true,
	},
	date_fin: {
		type: String,
		required: true
	},
	nom_entreprise: {
		type: String,
		required: true
	},
	adresse_entreprise: {
		type: String,
		required: true 
	},
	fax_entreprise: {
		type: String,
		required: true
	},
	telephone_entreprise: {
		type: String,
		required: true
	},
	email_entreprise: {
		type: String,
		required: true
	},
	encadrant_professionnel: {
		type: String,
		required: true
	},
	email_encadrant_professionnel: {
		type: String,
		required: true
	},
	encadrant_universitaire_principale: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "enseignant"
	},
	co_encadreur: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "enseignant"
	}]
});

module.exports = mongoose.model("stage", stageModel);