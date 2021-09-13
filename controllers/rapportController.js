const rapportModel = require("../models/rapportModel");
const etudiantModel = require("../models/etudiantModel");
const departementModel = require("../models/departementModel");
const stageModel = require("../models/stageModel");
const path = require("path");

exports.uploadRapport = async (req, res) => {
	try {
		const file = req.file;
		if (!file) {
			return res.json({ status: 400, message: "No File" });
		}

		const etudiant = await etudiantModel.findOne({ _id: req.query.etudId });
		const departement = await departementModel.findOne({ _id: req.query.depId });
		const stage = await stageModel.findOne({ _id: req.query.stageId });

		if (etudiant && departement && stage) {
			rapportModel.create({ 
				nom: file.originalname, 
				filename: file.filename, 
				etudiant: etudiant._id,
				departement: departement._id,
				stage: stage._id
			}, (rapport, err) => {
				if (err) {
					console.log(err);
					res.json({ status: 500 });
				} else {
					// console.log(rapport);
					return res.json({ status: 201, message: "File uploaded successfully", data: rapport });
				}
			});
		} else {
			res.json({ status: 404, message: "Etudiant Not Found" });
		}
	} catch (err) {
		console.log(err);
	}
};

exports.getRapportByStage = async (req, res) => {
	try {
		const result = await rapportModel.findOne({ stage: req.params.stageId });
		if (result) {
			return res.json({ status: 200, data: result });
		}

		res.json({ status: 404, message: "rapport not found", data: null });
	} catch(err) {
		console.log(err);
		res.json({ status: 500, data: null });
	}
};

exports.getRapports = async (req, res) => {
	try {
		const result = await rapportModel.find();
		res.json({ message: "All rapports in the system", status: 200, data: result });
	} catch(err) {
		console.log(err);
		res.json({ status: 500, data: [] });
	}
};

exports.downloadRapport = async (req, res) => {
	rapportModel.findOne((err, rapport) => {
		if (err) {
			console.log(err);
			res.json({ status: 500 })
		} else {
			// console.log("hello>> " + rapport.filename);
			const filepath = path.join(__dirname, "..", "uploads", "rapports", rapport.filename);
			res.sendFile(filepath);
		}
	});
};