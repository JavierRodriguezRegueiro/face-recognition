import { FaceDetector, FaceRecognizer, loadImage } from 'face-recognition';
const detector = FaceDetector();
const recognizer = FaceRecognizer();
import { existsSync, writeFileSync } from 'fs';
const trainModel = () => {
    let modelFile = existsSync("./model.json");
    if(!modelFile) {
        console.log('Training model...');
        //Load images
        const gorka1 = loadImage('./people/gorka/gorka1.jpg');
        const gorka2 = loadImage('./people/gorka/gorka2.jpg');
        const gorka3 = loadImage('./people/gorka/gorka3.jpg');
        const gorka4 = loadImage('./people/gorka/gorka4.jpg');
        console.log("gorka loaded")
        const antonio1 = loadImage('./people/antonio/antonio1.jpg');
        const antonio2 = loadImage('./people/antonio/antonio2.jpg');
        const antonio3 = loadImage('./people/antonio/antonio3.jpg');
        const antonio4 = loadImage('./people/antonio/antonio4.jpg');
        console.log("Antonio loaded");
        const jorge1 = loadImage('./people/jorge/jorge1.jpg');
        const jorge2 = loadImage('./people/jorge/jorge2.jpg');
        const jorge3 = loadImage('./people/jorge/jorge3.jpg');
        const jorge4 = loadImage('./people/jorge/jorge4.jpg');
        console.log("jorge loaded");
        const javier1 = loadImage('./people/javier/javier1.jpg');
        const javier2 = loadImage('./people/javier/javier2.jpg');
        const javier3 = loadImage('./people/javier/javier3.jpg');
        const javier4 = loadImage('./people/javier/javier4.jpg');
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
        writeFileSync('model.json', JSON.stringify(modelState))
    } else {
        console.log("The model is trained, loading information from json file.");
        const modelState = require('./model.json')
        recognizer.load(modelState)
    }
    return {
        recognizer,
        detector
    };
}


export default {trainModel}
