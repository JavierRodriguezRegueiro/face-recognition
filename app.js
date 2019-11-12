const testFolder = './test/';
const fs = require('fs');
let structure = {};
fs.readdirSync(testFolder).forEach(dir => {
    let person = dir;
    structure[person] = [];
    structure[person] = fs.readdirSync(testFolder+'/'+dir).map(img => {
        return img;
    })
    console.log(structure[person])
});
console.log(structure);
