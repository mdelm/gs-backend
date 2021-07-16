const entrepriseModel = require("../models/entrepriseModel");

exports.createEntreprise = (req, res) => {
	entrepriseModel.create(req.body, (err, entreprise) => {
		if (err) {
			console.log(err);
			res.json({ message: "error add entreprise", status: 500 });
		} else {
			res.json({ message: "new entreprise added", status: 200, data: entreprise });
		}
	});
};

exports.getEntreprise = (req, res) => {
	entrepriseModel.find({}, (err, entreprises) => {
		if (err) {
			console.log(err);
			res.json({ message: "error fetching entreprises", status: 500, data: [] });
		} else {
			res.json({ message: "entreprises in the database", status: 200, data: entreprises });
		}
	});
};