const noteModel = require("../models/noteModel");
const matiereModel = require("../models/matiereModel");

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
		let nt = await noteModel.findOne({
			etudiant: { _id: note.etudiant._id },
			matiere: { _id: note.matiere._id },
			type_note: note.type_note,
			semestre: note.semestre,
			annee_universitaire: note.annee_universitaire
		});

		if (nt === null) await noteModel.create(note);
	});

	res.json({status: 200});

}

exports.getAllNotes = (req, res) => {
	noteModel.find({}, (err, notes) => {
		res.json({message:'All Notes', status:200, data:notes});
	});
};