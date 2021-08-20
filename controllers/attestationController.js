const attestationModel = require("../models/attestationModel");
const enseignantModel = require("../models/enseignantModel");
const etudiantModel = require("../models/etudiantModel");
const departementModel = require("../models/departementModel");
const path = require("path");
const fs = require("fs");
const pdf = require('html-pdf');

exports.postDemande = (req, res) => {
	attestationModel.create(req.body, (attestation, err) => {
		if (err) {
			console.log(err);
			res.json({ message: "demande d'attestation could not be created", status: 500, data: "" });
		} else {
			res.json({ message: "demande d'attestation created successfully", status: 201, data: attestation });
		}
	});
};

exports.getAll = async (req, res) => {
	const result = await attestationModel.find();
	res.json({ status: 200, data: result });
};

exports.ancadreurConfirm = async (req, res) => {
	const attestation = await attestationModel.findOne({ _id: req.body.attestationId });
	if (attestation) {
		attestation.confirmed_by_ancadreur = true;
		await attestation.save();
		console.log(attestation);
		res.json({ status: 200, message: "attestation confirmed by ancadreur", data: attestation });
	} else {
		res.json({ status: 500, message: "attestation not found" });
	}
};

exports.chefConfirm = async (req, res) => {
	const attestation = await attestationModel.findOne({ _id: req.body.attestationId });
	if (attestation) {
		attestation.confirmed_by_chef_departement = true;
		await attestation.save();
		res.json({ status: 200, message: "attestation confirmed by chef de departement", data: attestation });
	} else {
		res.json({ status: 500, message: "attestation not found" });
	}
};

exports.downloadAttestation = async (req, res) => {
	const attestation = await attestationModel.findOne({ _id: req.params.id });
	const ancadreur = await enseignantModel.findOne({ _id: attestation.ancadreur });
	const chef = await attestationModel.findOne({ _id: attestation.chef_departement });
	const etudiant = await etudiantModel.findOne({ _id: attestation.etudiant });
	const departement = await departementModel.findOne({ _id: attestation.departement })

	if (attestation && ancadreur && chef && etudiant) {

			const template = path.join(
				path.dirname(process.mainModule.filename), 
				"documents",
				"attestation-de-presence",
				"index.html"
			);
			const filename = template.replace("index.html", `attestation-de-presence-${etudiant.nom}-${etudiant.prenom}.pdf`);
			// const filename = template.replace(".html", ".pdf");
			let templateHtml = fs.readFileSync(template, 'utf8');

			templateHtml = templateHtml.replace("{{nom}}", etudiant.nom);
			templateHtml = templateHtml.replace("{{prenom}}", etudiant.prenom);
			templateHtml = templateHtml.replace("{{departement}}", departement.nom);
			templateHtml = templateHtml.replace("{{Groupe}}", attestation.niveau);
			templateHtml = templateHtml.replace("{{cin}}", etudiant.cin);
			templateHtml = templateHtml.replace("{{Sousse}}", etudiant.date);
			templateHtml = templateHtml.replace("{{signature_etudiant}}", `${etudiant.nom} ${etudiant.prenom}`);
			templateHtml = templateHtml.replace("{{signature_encadreur}}", `${ancadreur.nom} ${ancadreur.prenom}`);
			templateHtml = templateHtml.replace("{{signature_chef}}", `${chef.nom} ${chef.prenom}`);
	
			if (fs.existsSync(filename)) {
				try {
					fs.unlinkSync(filename);
				} catch (err) {
					console.log(err);
				}
			}

			const options = {};

		  pdf
		  .create(templateHtml, options)
		  .toFile(filename, function (err, pdf) {
		    if(err) {
		      return res.json({ message: "There has been an error while create this file", status: 500, data: [] });
		    }

		    const demande_path = path.join(
					path.dirname(process.mainModule.filename), 
					"documents",
					"attestation-de-presence",
					`attestation-de-presence-${etudiant.nom}-${etudiant.prenom}.pdf`
				);

		    res.sendFile(demande_path);
		  });
		} else {
			res.json({ status: 500 });
		}
};