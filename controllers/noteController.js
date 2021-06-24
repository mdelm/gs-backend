const noteModel = require("../models/noteModel");

exports.addNote = (req, res) => {
	// calculer la moyenne de chaque matière
	req.body.matieres.forEach((mat, idx) => {
		req.body.matieres[idx].moy_mat = (parseFloat(mat.examan) * 0.8 + parseFloat(mat.oral) * 0.2).toFixed(2);
	});

	// calculer la moyenne de chaque unité d’enseignement
	let sommeMatMoy = 0;
	let coefficients = 0;

	req.body.matieres.forEach((mat, idx) => {
		sommeMatMoy += mat.moy_mat * mat.coefficient;
		coefficients += mat.coefficient;
	});
	req.body.note_module = sommeMatMoy / coefficients;

	req.body.note_module = req.body.note_module.toFixed(2);

	noteModel.create(req.body, (err, note) => {
		if (err) {
			console.log("err", err);
			res.json({ message: "error add note", status: 500, data: null});
		} else {
			res.json({ message: "new note added", status: 200, data: note });
		}
	});
};

exports.getAllNotes = (req, res) => {
	noteModel.find({}, (err, notes) => {
		if (err) {
			res.json({ message: "error note in system", status: 500, data: null });
		} else {
			res.json({message: "all note in system", status: 200, data: notes});
		}
	});
};

exports.getNotesByEtudiant = (req, res) => {
	noteModel.find({nom_etudiant: req.params.nom_etudiant}, (err, notes) => {
		if (err) {
			res.json({ message: "error note in system", status: 500, data: null });
		} else {
			res.json({message: "all note in system", status: 200, data: notes});
		}
	});
};

exports.getMoyenneSemestre = (req, res) => {
	noteModel.find({nom_etudiant: req.params.nom_etudiant, num_semestre: req.params.num_semestre}, (err, notes) => {
		
		if (err) {
			res.json({ message: "error note in system", status: 500, data: null });
		} else {
			// Somme moyenne des unités d’enseignement
			let sommeMoyModule = 0;

			// Somme coefficients des unités d’enseignement du semestre.
			let sommeCoefficients = 0;

			let moyenneSemestre = 0;

			notes.forEach(note => {
				sommeMoyModule += parseFloat(note.note_module) * parseInt(note.coefficient);
				sommeCoefficients += parseInt(note.coefficient);
			});

			if (sommeCoefficients !== 0) {
				moyenneSemestre = sommeMoyModule / sommeCoefficients;
			}

			res.json({status: 200, data: { 
				nom_etudiant: req.params.nom_etudiant,
				num_semestre: req.params.num_semestre,
				moyenneSemestre: moyenneSemestre.toFixed(2),
			}});
		}

	});
};

const calculerMoyenneAnuelle = (notes) => {
	/* 1 ere semestre */
	let smtr1_sommeMoyModule = 0;
	let smtr1_sommeCoefficients = 0;
	let smtr1_moyenneSemestre = 0;

	notes.filter(note => note.num_semestre === "1").forEach(note => {
		smtr1_sommeMoyModule += parseFloat(note.note_module) * parseInt(note.coefficient);
		smtr1_sommeCoefficients += parseInt(note.coefficient);
	});

	if (smtr1_sommeCoefficients !== 0) {
		smtr1_moyenneSemestre = smtr1_sommeMoyModule / smtr1_sommeCoefficients;
	}

	/* 2 eme semestre */
	let smtr2_sommeMoyModule = 0;
	let smtr2_sommeCoefficients = 0;
	let smtr2_moyenneSemestre = 0;

	notes.filter(note => note.num_semestre === "1").forEach(note => {
		smtr2_sommeMoyModule += parseFloat(note.note_module) * parseInt(note.coefficient);
		smtr2_sommeCoefficients += parseInt(note.coefficient);
	});

	if (smtr2_sommeCoefficients !== 0) {
		smtr2_moyenneSemestre = smtr2_sommeMoyModule / smtr2_sommeCoefficients;
	}

	let moyenneAnuelle = (smtr1_moyenneSemestre + smtr2_moyenneSemestre) / 2;

	return moyenneAnuelle.toFixed(2);
};

exports.getMoyenneAnuelle = (req, res) => {
	noteModel.find({nom_etudiant: req.params.nom_etudiant}, (err, notes) => {
		
		if (err) {
			res.json({ message: "error note in system", status: 500, data: null })
		} else {

			res.json({ 
				status: 200,
				data: {
					nom_etudiant: req.params.nom_etudiant,
					moyenneAnuelle: calculerMoyenneAnuelle(notes)
				}
			});
		}

	});
};

exports.getTroisMeilleursEtudiants = (req, res) => {
	noteModel.find({}, (err, notes) => {
		// console.log(notes);

		let etudiants = [];

		notes.forEach(note => {
			if (!etudiants.includes(note.nom_etudiant)) etudiants.push(note.nom_etudiant);
		});

		etudiants = etudiants.map(nom_etudiant => ({nom_etudiant: nom_etudiant, moyenneAnuelle: calculerMoyenneAnuelle(notes.filter(note => note.nom_etudiant === nom_etudiant))}));

		res.json({
			message: "Les Trois Meilleurs Etudiants", 
			status: 200, 
			data: etudiants.sort((etudiant1, etudiant2) => (parseFloat(etudiant1.moyenneAnuelle) < parseFloat(etudiant2.moyenneAnuelle)) ? 1 : -1).slice(0, 3)
		});
	});
};