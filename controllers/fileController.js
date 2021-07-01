const path = require("path");
const fs = require("fs");
const pdf = require('html-pdf');
const moyenneGeneraleModel = require("../models/moyenneGeneraleModel");
const nodemailer = require("nodemailer");

exports.sendListeEtudiantsRachte = (req, res) => {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "hajjihajji789@gmail.com",
			pass: "MAMIPAPI2018"
		}
	});

	let mailContent = {
		from: "Thouraya Hajji <hajjihajji789@gmail.com>",
		to: "Thouraya <hajjihajji789@gmail.com>",
		subject: "Liste Des Etudiants Racheté",
		text: "Liste des étudiants racheté.",
		html: "<h1>You can send html formatted content using Nodemailer with attachments</h1>",
		attachments: [
			{
				filename: "liste.pdf",
				path: path.join(path.dirname(process.mainModule.filename), "documents", "liste-etudiants-rachate", `liste-${req.params.nom_classe.replace(".", "")}-${req.query.annee_universitaire.replace("/", "_")}.pdf`)
			}
		]
	};

	transporter.sendMail(mailContent, (err, data) => {
		if (err) {
			res.json({ message: "Unable to send mail", status: 500 });
		} else {
			res.json({ message: "Email send successfully", status: 200 });
		}
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