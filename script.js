const fs = require('fs');
const path = require('path');

const configDir = './config/sites-available';
const outputFile = 'output.txt';

// Function to read Apache configuration files and write to output file
function processApacheConfigFiles(dir, outputFile) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(dir, file);

            if (filePath.includes('le-ssl')) {
                return;
            }

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', filePath, err);
                    return;
                }

                const serverNameMatch = data.match(/ServerName\s+(.+)/);
                const redirectMatch = data.match(/RewriteRule\s+(.+)/);

                if (
                    serverNameMatch &&
                    serverNameMatch[1] &&
                    redirectMatch &&
                    redirectMatch[1]
                ) {
                    const entry = `# ${serverNameMatch[1]}\nRewriteRule ${redirectMatch[1]}\n\n`;
                    appendToFile(outputFile, entry);
                }
            });
        });
    });
}

// Function to append data to a file
function appendToFile(file, data) {
    fs.appendFile(file, data, (err) => {
        if (err) {
            console.error('Error appending to file:', file, err);
        } else {
            console.log('Data appended to', file);
        }
    });
}

processApacheConfigFiles(configDir, outputFile);
