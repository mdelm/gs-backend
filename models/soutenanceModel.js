const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const soutenanceModel = new Schema({
	stage: {
		type: Schema.Types.ObjectId,
		ref: "stage"
	},

	date_de_soutenance: {
		type: String,
		require: true
	},

	salle: {
		type: Schema.Types.ObjectId,
		ref: "salle"
	},

	jurys: [{
		type: Schema.Types.ObjectId,
		ref: "enseingnant"
	}],

	repport_pdf: {
		type: String
	},

	page_de_garde: {
		type: String
	}
});

module.exports = mongoose.model("soutenance", soutenanceModel);