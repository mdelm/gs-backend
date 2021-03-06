const express = require('express')

const bodyParser = require('body-parser')

const database=require('./config/dataBase')

const app=express()

const cors = require('cors')

const path = require("path");
const fs = require("fs");
const pdf = require('html-pdf');
const pdfTemplate = require('./documents/index');


const matiereRouter =require('./routers/matiereRouter')
const enseignantRouter =require('./routers/enseignantRouter')
const coursRouter= require('./routers/coursRouter')
const absenceRouter = require('./routers/absenceRouter')
const filiereRouter = require('./routers/filiereRouter')
const etudiantRouter = require('./routers/etudiantRouter')
const departementRouter = require('./routers/departementRouter')
const salleRouter = require('./routers/salleRouter')
const moduleRouter = require('./routers/moduleRouter')
const userRouter = require('./routers/userRouter')
const AdminRouter = require('./routers/AdminRouter')
const emploisDeTempsRouter = require('./routers/emploisDeTempsRouter')
const devoirRouter = require('./routers/devoirRouter')
const noteRouter = require('./routers/noteRouter')
const moygenerRouter = require('./routers/moygenerRouter')
const classeRouter = require('./routers/classeRouter')
const fileRouter = require("./routers/fileRouter");
const stageRouter = require("./routers/stageRouter");
const entrepriseRouter = require("./routers/entrepriseRouter");
const rapportRouter = require("./routers/rapportRouter");
const attestationRouter = require("./routers/attestationRouter");

app.use(cors())
app.use(bodyParser.urlencoded({extended: false }))

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser({limit: '50mb'}))

app.set('secretkey','Backend')

app.use('/matiere',matiereRouter)
app.use('/enseignant',enseignantRouter)
app.use('/cours' , coursRouter )
app.use('/absence' , absenceRouter )
app.use('/filiere' , filiereRouter )
app.use('/etudiants',etudiantRouter)
app.use('/departements',departementRouter)
app.use('/salles', salleRouter)
app.use('/modules', moduleRouter)
app.use('/userrr', userRouter)
app.use('/Admin',AdminRouter)
app.use('/emplois',emploisDeTempsRouter)
app.use('/devoirs',devoirRouter)
app.use("/notes", noteRouter);
app.use('/Moyy',moygenerRouter)
app.use('/classe', classeRouter)
app.use("/f", fileRouter);
app.use("/stages", stageRouter);
app.use("/entreprises", entrepriseRouter);
app.use("/rapport", rapportRouter);
app.use("/attestation", attestationRouter);

app.get('/getfile/:image',function(req,res) {
    res.sendFile(__dirname + '/uploads/' + req.params.image) //get image
});

app.get('/signature/:cin', function(req, res) {
    res.sendFile(path.join(__dirname, "uploads", "signatures", `${req.params.cin}.jpg`));
});


app.post('/create_pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetch_pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})


app.listen(3000,console.log('Server running at http://127.0.0.1:3000/'))