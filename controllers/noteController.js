const noteModel = require("../models/noteModel");
const matiereModel = require("../models/matiereModel");
const classeModel = require("../models/classeModel");
const etudiantModel = require("../models/etudiantModel");
const moyenneGeneraleModel = require("../models/moyenneGeneraleModel");
const mongoose = require("mongoose");


function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}

function compareNotesBySemestre(note1, note2) {
	if (parseFloat(note1.semestre) < parseFloat(note2.semestre)) {
		return -1;
	}
	if (parseFloat(note1.semestre) > parseFloat(note2.semestre)) {
		return 1;
	}
	return 0;
}

exports.addNote = async (req, res) => {
	
	let note = await noteModel.findOne({
		etudiant: { _id: req.body.etudiant._id },
		matiere: { _id: req.body.matiere._id },
		type_note: req.body.type_note,
		semestre: req.body.semestre,
		annee_universitaire: req.body.annee_universitaire
	});

	if (note !== null) {
		res.json({message: 'note already exists', status: 500, data: note});
	} else {
		noteModel.create(req.body, (err, note) => {
			if (err) {
				res.json({message: 'error add note', status: 500, data:null})
			} else {
				res.json({message: "note created successfully", status: 200, data: note});
			}
		});
	}
};

exports.addMultipleNotes = (req, res) => {

	let notes = req.body;

	notes.forEach(async note => {
		await noteModel.deleteOne({
			etudiant: { _id: note.etudiant._id },
			matiere: { _id: note.matiere._id },
			type_note: note.type_note,
			semestre: note.semestre,
			annee_universitaire: note.annee_universitaire
		});
		
		await noteModel.create(note);
	});

	res.json({status: 200});

}

exports.getAllNotes = (req, res) => {
	noteModel.find({}, (err, notes) => {
		res.json({message:'All Notes', status:200, data:notes});
	});
};


exports.getNotesByClasse = async (req, res) => {

	const notes = await noteModel.find({"classe": req.params.nom_classe});
	const classe = (await classeModel.findOne({"nom_classe": req.params.nom_classe}))
	const etudiants = await etudiantModel.find({"_id": {$in: classe.etudiants}});
	const nt = etudiants.map(etudiant => ({ etudiant: etudiant, notes: []}));

	for(let i = 0; i < notes.length; i++) {
		let idx = nt.findIndex(e => ("" + e.etudiant._id) === ("" + notes[i].etudiant));

		let matiere = await matiereModel.findOne({"_id": notes[i].matiere});

		nt[idx].notes.push({
			type_note: notes[i].type_note,
			note: notes[i].note,
			semestre: notes[i].semestre,
			annee_universitaire: notes[i].annee_universitaire,
			matiere: matiere,
			nom_matiere: matiere.nom
		});
	}

	// Sort by semestre
	for(let i = 0; i < nt.length; i++) nt[i].notes.sort(compareNotesBySemestre);

	if (req.query.annee_universitaire !== "" && req.query.annee_universitaire !== undefined &&
			req.query.type_note !== "" && req.query.type_note !== undefined &&
			req.query.semestre !== "" && req.query.semestre !== undefined &&
			req.query.nom_matiere !== "" && req.query.nom_matiere !== undefined) {

		for(let e = 0; e < nt.length; e++) {
			nt[e].notes = nt[e].notes.filter(note => note.type_note === req.query.type_note &&
																							 note.semestre === req.query.semestre &&
																							 note.annee_universitaire === req.query.annee_universitaire &&
																							 note.nom_matiere === req.query.nom_matiere);
		}

	}

	res.json({ status: 200, data: nt });
};

exports.getNotesByClasseV2 = async (req, res) => {

	const matiere = await matiereModel.findOne({"nom": req.params.nom_matiere});

	console.log(matiere);

	const notes = await noteModel.find({
		"classe": req.params.nom_classe,
		"semestre": req.params.semestre,
		"annee_universitaire": req.params.annee_universitaire,
		"matiere": matiere._id,
		"type_note": req.params.type_note
	})

	res.json({ status: 200 });

}

exports.getMoyenneGenerale = async (req, res) => {

	const notes = await noteModel.find({"classe": req.params.nom_classe});
	const classe = (await classeModel.findOne({"nom_classe": req.params.nom_classe}))
	const etudiants = await etudiantModel.find({"_id": {$in: classe.etudiants}});
	const nt = etudiants.map(etudiant => ({ 
		etudiant: etudiant, 
		notes: [], 
		note_semestre1: 0, 
		note_semestre2: 0,
		moyenne_generale: 0,
		deliberation: ""
	}));

	for(let i = 0; i < notes.length; i++) {
		let idx = nt.findIndex(e => ("" + e.etudiant._id) === ("" + notes[i].etudiant));

		let matiere = await matiereModel.findOne({"_id": notes[i].matiere});

		nt[idx].note_semestre1 = 0;
		nt[idx].note

		nt[idx].notes.push({
			type_note: notes[i].type_note,
			note: notes[i].note,
			semestre: notes[i].semestre,
			annee_universitaire: notes[i].annee_universitaire,
			matiere: matiere,
			nom_matiere: matiere.nom
		});
	}

	// Group By Semestre
	for(let i = 0; i < nt.length; i++) {
		nt[i].notes = groupBy(nt[i].notes, "semestre");

		// Group By Matiere
		for(let j = 0; j < nt[i].notes.length; j++) {
			nt[i].notes[j] = groupBy(nt[i].notes[j], "nom_matiere");
		}
	}

	// Etudiant
	for (let e = 0; e < nt.length; e++) {

		// Semestre
		for(let s = 0; s < nt[e].notes.length; s++) {

			let noteSemestre = 0;
			let sommeMatieres = 0;
			let sommeCoef = 0;

			// Matiere
			for(let m = 0; m < nt[e].notes[s].length; m++) {

				if (nt[e].notes[s][m].length === 2) {
					const dsIdx = nt[e].notes[s][m].findIndex(note => note.type_note === "ds")
					const examIdx = nt[e].notes[s][m].findIndex(note => note.type_note === "ds")

					let ds = parseFloat(nt[e].notes[s][m][dsIdx].note) * 0.2;
					let exam = parseFloat(nt[e].notes[s][m][examIdx].note) * 0.8;
					let coef = parseFloat(nt[e].notes[s][m][examIdx].matiere.coef);

					sommeCoef += coef;
					sommeMatieres += (ds + exam).toFixed(2) * coef;
				}

			}

			if (s === 0) nt[e].note_semestre1 = (sommeMatieres/sommeCoef).toFixed(2);
			else nt[e].note_semestre2 = (sommeMatieres/sommeCoef).toFixed(2);

			// Moyenne Generale et deliberation
			if (nt[e].note_semestre1 !== 0 && nt[e].note_semestre2 !== 0) {

				nt[e].moyenne_generale = ((parseFloat(nt[e].note_semestre1) + parseFloat(nt[e].note_semestre2)) / 2).toFixed(2);

				if (parseFloat(nt[e].moyenne_generale) >= 10) {
					nt[e].deliberation = "admis";
				} else if (parseFloat(nt[e].moyenne_generale) >= 9.85 && parseFloat(nt[e].moyenne_generale) <= 9.99) {
					nt[e].deliberation = "rachat";
				} else {
					nt[e].deliberation = "redouble";
				}


				// La base
				const moyenneGen = await moyenneGeneraleModel.findOne({
					"etudiant": nt[e].etudiant._id,
					"classe": req.params.nom_classe,
					"annee_universitaire": "2020/2021"
				});

				if (!moyenneGen) {
					moyenneGeneraleModel.create({
						etudiant: nt[e].etudiant._id,
						classe: req.params.nom_classe,
						annee_universitaire: "2020/2021",
						note_semestre1: nt[e].note_semestre1,
						note_semestre2: nt[e].note_semestre2,
						moyenne_generale: nt[e].moyenne_generale,
						deliberation: nt[e].deliberation
					});
				}
			}
		}

	}

	// nt[etudiant].notes[semestre][matiere][ds[0]/exam[1]]
	res.json({ status: 200, data: nt });

};