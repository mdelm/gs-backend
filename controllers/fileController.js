const path = require("path");
const fs = require("fs");
const pdf = require('html-pdf');
const moyenneGeneraleModel = require("../models/moyenneGeneraleModel");
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

exports.sendListeEtudiantsRachte = (req, res) => {
	sendEmail(
		"elmehammedi.mohamed@gmail.com",
		"Liste Etudiants Racheté",
		"Liste Etudiants Racheté",
		"<h1>You can send html formatted content using Nodemailer with attachments</h1>",
		[
			{
				filename: "liste.pdf",
				path: path.join(path.dirname(process.mainModule.filename), "documents", "liste-etudiants-rachate", `liste-${req.params.nom_classe.replace(".", "")}-${req.query.annee_universitaire.replace("/", "_")}.pdf`)
			}
		]
	)
	.then(data => res.json({ message: "Email send successfully", status: 200 }))
	.catch(err => {
		console.log(err);
		res.json({ message: "Unable to send mail", status: 500 });
	});
};

exports.fetchListeEtudiantsRachte = (req, res) => {
	const liste_path = path.join(
		path.dirname(process.mainModule.filename), 
		"documents",
		"liste-etudiants-rachate",
		`liste-${req.params.nom_classe.replace(".", "")}-${req.query.annee_universitaire.replace("/", "_")}.pdf`
	);

	res.sendFile(liste_path);
};

exports.createListeEtudiantsRachte = async (req, res) => {

	const liste = await moyenneGeneraleModel.find({ 
		"classe": req.params.nom_classe, 
		"annee_universitaire": req.query.annee_universitaire,
		"deliberation": "admis"
	});

	const template = path.join(
		path.dirname(process.mainModule.filename), 
		"documents",
		"liste-etudiants-rachate",
		"index.html"
	);
	const filename = template.replace("index.html", `liste-${req.params.nom_classe.replace(".", "")}-${req.query.annee_universitaire.replace("/", "_")}.pdf`);
	// const filename = template.replace(".html", ".pdf");
	let templateHtml = fs.readFileSync(template, 'utf8');

	let tbody = "<tbody>";

	liste.forEach(note => {
		tbody += "<tr>";
		tbody += `<td>${note.matricule}</td>`;
		tbody += `<td>${note.nom}</td>`;
		tbody += `<td>${note.prenom}</td>`;
		tbody += `<td>${note.annee_universitaire}</td>`;
		tbody += `<td>${note.note_semestre1}</td>`;
		tbody += `<td>${note.note_semestre2}</td>`;
		tbody += `<td>${note.moyenne_generale}</td>`;
		tbody += "</tr>";
	});

	tbody += "</tbody>";

	templateHtml = templateHtml.replace("{{tbody}}", tbody);
	templateHtml = templateHtml.replace("{{note_classe}}", req.params.nom_classe);

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
      res.json({ message: "There has been an error while create this file", status: 500, data: [] });
    }
    res.json({ message: "File created successfully", status: 200, data: [] });
  });
};

exports.fetchFormulaireDemandeDeStage = (req, res) => {
	const { etudiant, classe, annee, societe } = req.query;
	const demande_path = path.join(
		path.dirname(process.mainModule.filename), 
		"documents",
		"formulaire-demande-de-stage",
		`formulaire-demande-de-stage-${etudiant.replace(" ", "-")}-${classe}-${annee.replace("/", "")}.pdf`
	);

	res.sendFile(demande_path);
};

exports.createFormulaireDemandeDeStage = async (req, res) => {
	const { etudiant, classe, annee, societe } = req.query;
	const template = path.join(
		path.dirname(process.mainModule.filename), 
		"documents",
		"formulaire-demande-de-stage",
		"index.html"
	);
	const filename = template.replace(
		"index.html", 
		`formulaire-demande-de-stage-${etudiant.replace(" ", "-")}-${classe}-${annee.replace("/", "")}.pdf`
	);
	let templateHtml = fs.readFileSync(template, 'utf8');

	templateHtml = templateHtml.replace("{{societe}}", societe);
	templateHtml = templateHtml.replace("{{etudiant}}", etudiant);
	templateHtml = templateHtml.replace("{{classe}}", classe);
	templateHtml = templateHtml.replace("{{annee}}", annee);

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
      res.json({ message: "There has been an error while create this file", status: 500, data: [] });
    } else {
    	sendEmail(
				"elmehammedi.mohamed@gmail.com",
				"Formulaire Demande De Stage",
				"Formulaire Demande De Stage",
				"<h1>You can send html formatted content using Nodemailer with attachments</h1>",
				[
					{
						filename: "demande.pdf",
						path: path.join(path.dirname(process.mainModule.filename), "documents", "formulaire-demande-de-stage", `formulaire-demande-de-stage-${etudiant.replace(" ", "-")}-${classe}-${annee.replace("/", "")}.pdf`)
					}
				]
			)
			.then(data => res.json({ message: "Email send successfully", status: 200 }))
			.catch(err => {
				console.log(err);
				res.json({ message: "Unable to send mail", status: 500 });
			});
			res.json({ message: "File created successfully", status: 200, data: [] });
    }
  });
};