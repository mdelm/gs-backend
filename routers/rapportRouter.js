const express = require("express");
const rapportController = require("../controllers/rapportController");
const route = express.Router();
const multer = require("multer");
const uniqueString = require('unique-string');
const mime = require('mime-types')

const upload = multer({ storage: multer.diskStorage({
	destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${uniqueString()}.${mime.extension(file.mimetype)}`);
  }
	}) 
});

route.post("/upload", upload.single("file"), rapportController.uploadRapport);

route.get("/all", rapportController.getRapports);

route.get("/download/:rapportId", rapportController.downloadRapport);

module.exports = route;