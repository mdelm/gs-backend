const stageModel = require("../models/stageModel");

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

exports.getStage = (req, res) => {
	stageModel.find({}, (err, stages) => {
		if (err) {
			res.json({ message: "error stage in system", status: 500, data: [] });
		} else {
			res.json({ message: "all stages in the system", status: 200, data: stages });
		}
	}); 
};