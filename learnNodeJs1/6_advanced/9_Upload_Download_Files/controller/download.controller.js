const fs = require('fs');
const path = require('path');
const loggerServ = require('../../2_Logger/logger.services');  
const logger = new loggerServ('download_Logger');

// Define the directory where uploaded files are stored
const uploadDir = path.join(__dirname, '../uploads');  // Update this with your actual upload directory path

// Function to handle file download
exports.downloadFile = (req, res) => {
    const filename  = req.params.file;  // Get the filename from the request parameters
    const filePath = path.join(uploadDir, filename);  // Construct the full file path

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        logger.error(`File not found: ${filename}`);
        return res.status(404).json({ message: 'File not found' });
    }

    // Set the headers for downloading the file (Content-Disposition)
    res.download(filePath, filename, (err) => {
        if (err) {
            logger.error('Error while downloading file', err);
            return res.status(500).json({ message: 'Error while downloading file' });
        }

        logger.info('File downloaded successfully', filename);
    });
};
