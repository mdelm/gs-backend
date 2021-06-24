const { NOMEM } = require("dns");

module.exports = ({ nom, prenom, departement, num_inscrit ,Sousse, Groupe , cin, Raison}) => {
    const today = new Date();
return `

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
   <link rel="stylesheet" href="style.css">
</head>
<body>
   <div class="header">
      <div class="topHeader">
         <table>
            <tr>
               <td>République Tunisienne</td>
               
               
               
            </tr>
            <tr>
               <td>Ministère de l'Enseignement Supérieure et de la Recherche Scientifique</td>
            </tr>
            <tr>
                  <td>L'administration Générale des Etudes Technologiques</td>
            </tr>
            <tr>
                  <td>Institut Supérieure des Etudes Technologiques de Sousse</td>
            </tr>
         </table>
      </div>
      <h1>Demande d'attestation de présence</h1>
      <h2>Année universitaire (2020/2021)</h2>

   </div>
   <div class="body">
      <table>
         <tr>
           
            <td>
            Nom: ${     nom}
                      </td>
         </tr>
         <br></br>    

         <tr>
   
         <td>
         Prénom: ${     prenom}
                      </td>
      </tr>
      <br></br>    
         <tr>
            <td>
            Département: ${departement}
                      </td>
         </tr>
         <tr>
            <td>
            Groupe:${Groupe}
                      </td>
         </tr>
         <tr>
            <td>
            Numéro de CIN: ${cin}
                      </td>
         </tr>
         <tr>
            <td>
            Numéro d'inscription: ${num_inscrit}
                      </td>
         </tr>
         <tr>
            <td>
            Raison:${Raison}
        </td>
            </tr>
         <tr>
         <td>
         Sousse en ::${Sousse}
     </td>            
         </tr>
         <tr>
            <td class="signature">Signature : <br> ..........</td>
         </tr>
         <tr>
            <td class="signature">Signature d'encadreur <br> ..........</td>
            <td class="signature">Signature de chef du Département : <br> ..........</td>
         </tr>
         
      </table>
   </div>
   
</body>
</html>
    `;
};
