const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

console.log(`Current directory: ${__dirname}`);

const downloadPage = (url="http://nodeprogram.com") => {
    
    const fetchPage = (urlf, callback) => {
        http.get(urlf, (response) => {
            let buffer = '';

            response.on('data', (chunk) => { buffer += chunk; })

            // EOD ... write the file (with null for error)
            response.on('end', () => { callback(null, buffer) })

        }).on('error', (error) =>  {
            console.log(`[fetchPage] Error: ${error.message}`);
            callback(error);
        })
    }

    // Create a folder to hold the downloaded files
    const folderName = uuidv1();
    fs.mkdirSync(folderName);
    
    // Download the files
    fetchPage(url, (error, data) => {
        
        // If error is not null, log the error and quit
        if (error) return console.log(error);

        // Write the URL to a file called url.txt?
        fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url);

        // Write the webpage to file called file.html
        fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data);

        console.log('Download complete in folder', folderName);
    });
}

// Main program ... 
downloadPage(process.argv[2]);
