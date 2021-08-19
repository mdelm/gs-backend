const rapportModel = require("../models/rapportModel");
const etudiantModel = require("../models/etudiantModel");
const departementModel = require("../models/departementModel");
const path = require("path");

exports.uploadRapport = async (req, res) => {
	try {
		const file = req.file;
		if (!file) {
			return res.json({ status: 400, message: "No File" });
		}

		const etudiant = await etudiantModel.findOne({ _id: req.query.etudId });
		const departement = await departementModel.findOne({ _id: req.query.depId });

		if (etudiant && departement) {
			rapportModel.create({ 
				nom: file.originalname, 
				filename: file.filename, 
				etudiant: etudiant._id,
				departement: departement._id,
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
	rapportModel.findOne((rapport, err) => {
		if (err) {
			console.log(err);
			res.json({ status: 500 })
		} else {
			const filepath = `./uploads/${rapport.filename}`;
			res.sendFile(filepath);
		}
	});
};