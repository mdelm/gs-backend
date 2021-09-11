const attestationModel = require("../models/attestationModel");
const enseignantModel = require("../models/enseignantModel");
const etudiantModel = require("../models/etudiantModel");
const departementModel = require("../models/departementModel");
const path = require("path");
const fs = require("fs");
const pdf = require('html-pdf');
const nodemailer = require("nodemailer");

const sendEmail = (to, subject, text, html, attachments) => {
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
		auth: {
			user: "noah.dusseldorf@gmail.com",
			pass: "ivqkiqvlrlyebjay"
		}
	});

	let mailContent = {
		from: "noah.dusseldorf@gmail.com",
		to: to,
		subject: subject,
		text: text,
		html: html,
		attachments: attachments
	};

	const willSendEmail = new Promise((resolve, reject) => {
		transporter.sendMail(mailContent, (err, data) => {
			if (!err) {
				resolve(data);
			} else {
				reject(err);
			}
		});
	});

	return willSendEmail;
};

exports.postDemande = (req, res) => {
	attestationModel.create(req.body, async (err, attestation) => {
		if (err) {
			console.log(err);
			res.json({ message: "demande d'attestation could not be created", status: 500, data: "" });
		} else {

			const ancadreur = await enseignantModel.findOne({ _id: attestation.ancadreur });
			const chef_departement = await enseignantModel.findOne({ _id: attestation.chef_departement });

			try {
				await sendEmail(
					chef_departement.email,
					"demande d'attestation",
					"demande d'attestation",
					"confirmer l'attestation: http://localhost:3001/#/ChefDepAttestations",
					[]
				);
				await sendEmail(
					ancadreur.email,
					"demande d'attestation",
					"demande d'attestation",
					"confirmer l'attestation: http://localhost:3001/#/AncadreurAttestations",
					[]
				);
			} catch(err) {
				console.log(err);
				return res.json({ message: "Unable to send mail", status: 500 });
			}
			
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
		// console.log(attestation);
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
	const chef = await enseignantModel.findOne({ _id: attestation.chef_departement });
	const etudiant = await etudiantModel.findOne({ _id: attestation.etudiant });
	const departement = await departementModel.findOne({ _id: attestation.departement });

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
			templateHtml = templateHtml.replace("{{specialite}}", attestation.specialite);
			templateHtml = templateHtml.replace("{{cin}}", etudiant.cin);
			templateHtml = templateHtml.replace("{{num_inscrit}}", etudiant._id);
			templateHtml = templateHtml.replace("{{raison}}", "---");
			templateHtml = templateHtml.replace("{{signature_encadreur}}", `http://localhost:3000/signature/${ancadreur.cin}`);
			templateHtml = templateHtml.replace("{{signature_chef}}", `http://localhost:3000/signature/${chef.cin}`);
			templateHtml = templateHtml.replace("{{cin_encadreur}}", ancadreur.cin);
			templateHtml = templateHtml.replace("{{cin_chef}}", chef.cin);
	
			if (fs.existsSync(filename)) {
				try {
					fs.unlinkSync(filename);
				} catch (err) {
					console.log(err);
				}
			}

			const options = {

			};
		  
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