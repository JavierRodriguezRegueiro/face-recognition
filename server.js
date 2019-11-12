
import { trainModel } from './src/recognition-model/recognition-model';

import express from 'express';
import { json } from 'body-parser';
// Model parameters
const { recognizer, detector } = trainModel();
const minDistance = 0.55;
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(json({
  type: 'application/*+json',
  
 }))
var jsonParser = json({
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
  console.log(bestPrediction);
  if(bestPrediction.distance < minDistance) {
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
