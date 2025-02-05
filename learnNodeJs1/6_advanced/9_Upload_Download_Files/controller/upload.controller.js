// to can upload files and handle it you must install multer library (npm i multer)
const fs = require('fs');// file system library 
const path = require('path');
const multer = require('multer');
const loggerServ = require('../../2_Logger/logger.services');  
const logger = new loggerServ('upload_Logger');

const uploadDir = path.join(__dirname, '../uploads');// create the folder that you want to upload files inside it 

// Ensure the upload directory exists, create it if not
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });//here we use sync because we want wait until 
// create folder then complete processing the code 

// Multer storage configuration // you can take it from npm multer browser 
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),//cb => mean call back function // first parameter used for errors 
    // but because we don't have errors we put null 
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)//Date.now() => we put it to give different 
    // name to same file if upload same file more than once 
});

const upload = multer({ storage });// initialize multer with the storage configuration to handle file uploads

// Handle file upload
exports.uploadFile = async (req, res) => {
    upload.single('file')(req, res, (err) => {// we can use single => mean upload single file | or array upload multiple files
        if (err) {
            logger.error('Upload error', err);
            return res.status(500).json({ message: 'Error while uploading file', error: err.message });
        }
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        logger.info('File uploaded successfully', req.file);
        res.status(200).json({// this is metadata of the file to storage it in database like mongodb 
            message: 'File uploaded successfully',
            file: req.file
        });
        // if you want to stor it in mongodb : 
        //1- create a model named files for example 
        //2- add here code that save data in mongo db like we take before when we were add user or any models 
        //3- use save methods with await 
        //the code : 
        /* const newFile = new File({
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype,
                size: req.file.size
            });
            await newFile.save();
        */
    });
};
