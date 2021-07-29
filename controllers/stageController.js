const stageModel = require("../models/stageModel");
const etudiantModel = require("../models/etudiantModel");
const enseignantModel = require("../models/enseignantModel");
const salleModel = require("../models/salleModel");

exports.createStage = (req, res) => {
	stageModel.create(req.body, (err, stage) => {
		if (err) {
			console.log(err);
			res.json({ message: "error add stage", status: 500, data: [] });
		} else {
			res.json({ message: "new stage added", status: 200, data: stage });
		}
	});
};

exports.AllStages = (req, res) => {
	stageModel.find({}, (err, stages) => {
		if (err) {
			res.json({ message: "error stage in system", status: 500, data: [] });
		} else {
			res.json({ message: "all stages in the system", status: 200, data: stages });
		}
	}); 
};

exports.AllStagesV2 = async (req, res) => {
	const data = [];
	const stages = await stageModel.find();

	for(let i = 0; i < stages.length; i++) {

		const soutenance = stages[i].soutenance.date_de_soutenance ? ({
		 	...stages[i].soutenance,
		 	jurys: await enseignantModel.find({ _id: { $in: stages[i].soutenance.jurys } }),
		 	salle: await salleModel.findOne({ _id: stages[i].soutenance.salle })
		}) : null;

		data.push({
			_id: stages[i]._id,
			sujet: stages[i].sujet,
			description: stages[i].description,
			date_debut: stages[i].date_debut,
			date_fin: stages[i].date_fin,
			nom_entreprise: stages[i].nom_entreprise,
			adresse_entreprise: stages[i].adresse_entreprise,
			fax_entreprise: stages[i].fax_entreprise,
			telephone_entreprise: stages[i].telephone_entreprise,
			email_entreprise: stages[i].email_entreprise,
			encadrant_professionnel: stages[i].encadrant_professionnel,
			type_stage: stages[i].type_stage,
			email_encadrant_professionnel: stages[i].email_encadrant_professionnel,
			binome: await etudiantModel.find({ _id: { $in: stages[i].binome } }),
			encadrant_universitaire_principale: await enseignantModel.findOne({ _id: stages[i].encadrant_universitaire_principale }),
			co_encadreur: await enseignantModel.find({ _id: { $in: stages[i].co_encadreur } }),
			soutenance: soutenance
		});
	}

	res.json({ status: 200, data: data });

};

exports.addSoutenance = async (req, res) => {
	const stage = await stageModel.findOne({ _id: req.params.id });
	stage.soutenance = req.body;
	await stage.save();
	res.json({ status: 200, data: stage });
};

exports.getSoutenancesByEtudiant = async (req, res) => {
	const stages = (await stageModel.find({}))
				.filter(st => st.binome.includes(req.params.etud_id))
				.filter(st => st.soutenance.date_de_soutenance);

	const data = [];

	for(let i = 0; i < stages.length; i++) {
		const soutenance = {
		 	...stages[i].soutenance,
		 	jurys: await enseignantModel.find({ _id: { $in: stages[i].soutenance.jurys } }),
		 	salle: await salleModel.findOne({ _id: stages[i].soutenance.salle })
		};

		data.push({
			_id: stages[i]._id,
			sujet: stages[i].sujet,
			description: stages[i].description,
			date_debut: stages[i].date_debut,
			date_fin: stages[i].date_fin,
			nom_entreprise: stages[i].nom_entreprise,
			adresse_entreprise: stages[i].adresse_entreprise,
			fax_entreprise: stages[i].fax_entreprise,
			telephone_entreprise: stages[i].telephone_entreprise,
			email_entreprise: stages[i].email_entreprise,
			encadrant_professionnel: stages[i].encadrant_professionnel,
			type_stage: stages[i].type_stage,
			email_encadrant_professionnel: stages[i].email_encadrant_professionnel,
			binome: await etudiantModel.find({ _id: { $in: stages[i].binome } }),
			encadrant_universitaire_principale: await enseignantModel.findOne({ _id: stages[i].encadrant_universitaire_principale }),
			co_encadreur: await enseignantModel.find({ _id: { $in: stages[i].co_encadreur } }),
			soutenance: soutenance
		});
	}

	res.json({ status: 200, data: data });
};

exports.getStage = async (req, res) => {
	const stage = await stageModel.findOne({ _id: req.params.id });
	const soutenance = stage.soutenance.date_de_soutenance ? ({
		 	...stage.soutenance,
		 	jurys: await enseignantModel.find({ _id: { $in: stage.soutenance.jurys } }),
		 	salle: await salleModel.findOne({ _id: stage.soutenance.salle })
		}) : null;

	res.json({ 
		status: 200, 
		data: {
			_id: stage._id,
			sujet: stage.sujet,
			description: stage.description,
			date_debut: stage.date_debut,
			date_fin: stage.date_fin,
			nom_entreprise: stage.nom_entreprise,
			adresse_entreprise: stage.adresse_entreprise,
			fax_entreprise: stage.fax_entreprise,
			telephone_entreprise: stage.telephone_entreprise,
			email_entreprise: stage.email_entreprise,
			encadrant_professionnel: stage.encadrant_professionnel,
			type_stage: stage.type_stage,
			email_encadrant_professionnel: stage.email_encadrant_professionnel,
			binome: await etudiantModel.find({ _id: { $in: stage.binome } }),
			encadrant_universitaire_principale: await enseignantModel.findOne({ _id: stage.encadrant_universitaire_principale }),
			co_encadreur: await enseignantModel.find({ _id: { $in: stage.co_encadreur } }),
			soutenance: soutenance
		} 
	});
};