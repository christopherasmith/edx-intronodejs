const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');

const converter = csv();
const inputFile = path.join(__dirname, 'customer-data.csv');
const outputFile = path.join(__dirname, 'customer-data.json');
let buffer = '';

converter.on('data', (data) => {buffer += data;})
converter.on('done', (error) => {
    if (error) return console.log(error);
    fs.writeFileSync(outputFile, buffer);
    console.log(`${buffer.length} characters written to ${outputFile}`);
})

converter.fromFile(inputFile);