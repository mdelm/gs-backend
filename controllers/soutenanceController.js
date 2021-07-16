const soutenanceModel = require("../models/soutenanceModel");
const salleModel = require("../models/salleModel");
const enseignantModel = require('../models/enseignantModel');
const stageModel = require("../models/stageModel");

exports.addSoutenance = (req, res) => {
	soutenanceModel.create(req.body, (err, soutenance) => {
		if (err) {
			res.json({ message: "error add soutenance", status: 500, data: [] });
		} else {
			res.json({ message: "soutenance added successfully", status: 200, data: soutenance });
		}
	});
};

exports.getSoutenance = (req, res) => {
	soutenanceModel.find({}, async (err, soutenances) => {
		if (err) {
			res.json({ message: "error fetching soutenances", status: 500, data: [] });
		} else {
			res.json({ message: "all soutenances in the database", status: 200, data: soutenances });
		}
	});
};

exports.getSoutenanceByEtudiant = async (req, res) => {

			// Stage - Studient
			let stage = (await stageModel.find({}))
				.filter(st => st.binome.includes(req.params.etud_id));
			if (stage.length !== 0) 
				stage = stage[0];
			else {
				res.json({ message: "no stage availbale", status: 500, data: [] });
				return;
			}

			// Soutenance - Stage
			const soutenance = await soutenanceModel.findOne({ stage: stage._id });

			// Jurys - Soutenance
			const jurys = await enseignantModel.find({ _id: { $in: soutenance.jurys } });

			// Salle - Soutenance
			const salle = await salleModel.findOne({ _id: soutenance.salle });

			res.json({ 
				message: "all soutenances in the database", 
				status: 200, 
				data: {
					stage: stage,
					jurys: jurys,
					salle: salle,
					date_de_soutenance: soutenance.date_de_soutenance
				} 
			});
};