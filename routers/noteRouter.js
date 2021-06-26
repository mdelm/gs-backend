const express = require("express");
const noteController = require("../controllers/noteController");

const route = express.Router();

route.post("/addNote", noteController.addNote);

route.post("/addMultipleNotes", noteController.addMultipleNotes);

route.get("/allNotes", noteController.getAllNotes);

route.get("/classe/:nom_classe", noteController.getNotesByClasse);



/*
route.get("/getByEtudiant/:nom_etudiant", noteController.getNotesByEtudiant);

route.get("/moyenneSemestre/:nom_etudiant/:num_semestre", noteController.getMoyenneSemestre);

route.get("/moyenneAnuelle/:nom_etudiant", noteController.getMoyenneAnuelle);

route.get("/troisMeilleursEtudiants", noteController.getTroisMeilleursEtudiants);*/

module.exports = route;