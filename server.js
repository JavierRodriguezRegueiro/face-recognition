
const fr = require('face-recognition');
const detector = fr.FaceDetector();
const recognizer = fr.FaceRecognizer();
const fs = require('fs');

let exit = fs.existsSync("./model.json");
if(!exit) {
  //Load images
  const gorka1 = fr.loadImage('./people/gorka/gorka1.jpg');
  const gorka2 = fr.loadImage('./people/gorka/gorka2.jpg');
  const gorka3 = fr.loadImage('./people/gorka/gorka3.jpg');
  const gorka4 = fr.loadImage('./people/gorka/gorka4.jpg');
  console.log("gorka loaded")
  const antonio1 = fr.loadImage('./people/antonio/antonio1.jpg');
  const antonio2 = fr.loadImage('./people/antonio/antonio2.jpg');
  const antonio3 = fr.loadImage('./people/antonio/antonio3.jpg');
  const antonio4 = fr.loadImage('./people/antonio/antonio4.jpg');
  console.log("Antonio loaded");
  const jorge1 = fr.loadImage('./people/jorge/jorge1.jpg');
  const jorge2 = fr.loadImage('./people/jorge/jorge2.jpg');
  const jorge3 = fr.loadImage('./people/jorge/jorge3.jpg');
  const jorge4 = fr.loadImage('./people/jorge/jorge4.jpg');
  console.log("jorge loaded");
  const javier1 = fr.loadImage('./people/javier/javier1.jpg');
  const javier2 = fr.loadImage('./people/javier/javier2.jpg');
  const javier3 = fr.loadImage('./people/javier/javier3.jpg');
  const javier4 = fr.loadImage('./people/javier/javier4.jpg');
  console.log("javier loaded");

  //Detect images
  const gd1 = detector.detectFaces(gorka1)[0];
  const gd2 = detector.detectFaces(gorka2)[0];
  const gd3 = detector.detectFaces(gorka3)[0];
  const gd4 = detector.detectFaces(gorka4)[0];
  console.log("gorka detecter")

  const ad1 = detector.detectFaces(antonio1)[0];
  const ad2 = detector.detectFaces(antonio2)[0];
  const ad3 = detector.detectFaces(antonio3)[0];
  const ad4 = detector.detectFaces(antonio4)[0];
  console.log("antonio detecter")

  const jod1 = detector.detectFaces(jorge1)[0];
  const jod2 = detector.detectFaces(jorge2)[0];
  const jod3 = detector.detectFaces(jorge3)[0];
  const jod4 = detector.detectFaces(jorge4)[0];
  console.log("jorge detecter")

  const jad1 = detector.detectFaces(javier1)[0];
  const jad2 = detector.detectFaces(javier2)[0];
  const jad3 = detector.detectFaces(javier3)[0];
  const jad4 = detector.detectFaces(javier4)[0];
  console.log("javier detecter")

  //Create array with all face images
  const ggi = [gd1, gd2, gd3, gd4];
  const amo = [ad1, ad2, ad3, ad4];
  const jga = [jod1, jod2, jod3, jod4];
  const jro = [jad1, jad2, jad3, jad4];

  //Add faces
  recognizer.addFaces(ggi, 'gorka');
  recognizer.addFaces(amo, 'antonio');
  recognizer.addFaces(jga, 'jorge');
  recognizer.addFaces(jro, 'javier');
  //Serialize
  const modelState = recognizer.serialize();
  console.log(modelState);
  fs.writeFileSync('model.json', JSON.stringify(modelState))
} else {
  console.log("All good mate");
  const modelState = require('./model.json')
  recognizer.load(modelState)
}


const express = require('express')
const bodyParser = require('body-parser');


// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.json({ 
  type: 'application/*+json',
  
 }))
var jsonParser = bodyParser.json({
  limit: '50mb',
  extended: true}
)


app.post('/',jsonParser, (req, res) => {
  console.log("someone is talking...");
  var base64Data = req.body.image.replace(/data:image\/jpeg;base64,/, "");
  fs.writeFileSync('person.jpg', base64Data, {encoding: 'base64'});
  const person = fr.loadImage('./person.jpg');
  const persontmp = detector.detectFaces(person)[0];
  const bestPrediction = recognizer.predictBest(persontmp)
  console.log(persontmp);
  console.log(bestPrediction);
  if(bestPrediction.distance < 0.55) {
    res.json({
      success: true,
      user: bestPrediction.className,
     })
     res.end();
  } else {
    res.json({
      success: false,
     })
     res.end();
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
