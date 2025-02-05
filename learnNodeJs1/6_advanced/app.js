const express = require('express');
const app = express();

//connect to database 
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://marselhanani1:Marsel8042003@cluster0.smbml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> {
    console.log("Connection successfully ");
}).catch(err => {
    console.error("error connecting to Mongo database");
});


//#------->>Advanced<<----------
const LoggerService = require('../6_advanced/2_Logger/logger.services')
const logger = new LoggerService("Auditing_logger");
//*-----------> auditing 
const auditing = require('../6_advanced/3_Auditing/audit');
//?---------------> error handling 
const ApiError = require('./6_Error_handler/api.error');
const status = require('./6_Error_handler/error.status')
//#=======================================================================


//api
const Audit = require('./3_Auditing/Model/audit');
app.get('/audits',async (req,res)=>{
    try{
        const audits = await Audit.find(); // will return all products that have been added

        //#---------------------> logger <-------------------------------
        logger.info("get all products successfully", audits); // will create file and to save the log and print the log in 
        // console 


        //#---------------------> auditing <-------------------------------
        auditing.prepareAudit({//will stored in database as a table or collection named audits 
            action: "Get all audits",
            auditBy: "marsel",
            data: { ip: "192.168.1.1", device: "Chrome" }
        })
        res.json(audits)

    }catch{
        //#---------------------> logger error <-------------------------------

        logger.error("get all audits failed");

        //#-------------------> audit error <---------------------------------

        auditing.prepareAudit({
            action: "Get all audits failed",
            auditBy: "marsel",
            status: 500,
            errors: [new Error("Server Error")],
            data: { ip: "192.168.1.1", device: "Chrome" }
        })
    }
    
})

//error handling 
app.get('/audits/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError("Invalid ID format", status.BAD_REQUEST, "The provided ID is not a valid ObjectId.");
        }

        const audit = await Audit.findById(id);
        if (audit) {
            res.json(audit);
        } else {
            throw new ApiError("Audit not found", status.NOT_FOUND, "We can't find audit because your ID is incorrect.");
        }
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});
//*===============================================user Management================================
const userRouter = require('./7_User_Management/router/user.router');
const roleRouter = require('./7_User_Management/router/role.router');
const permissionRouter = require('./7_User_Management/router/permission.router');
const loginRouter = require('./8_Auth/router/login.router');
const uploadRouter = require('./9_Upload_Download_Files/routes/upload.route');
const downloadRouter = require('./9_Upload_Download_Files/routes/download.route');
app.use(express.json());// تنساش تحطها ساعة وانا ادور على الايرور وطلعت ناسي احطها
const jwt = require('./8_Auth/jwt');


app.use('/api/v1/auth',loginRouter);
app.use('/api/v1',roleRouter);
app.use('/api/v1',permissionRouter);
app.use('/api/v1',uploadRouter);// to upload file in your project and stor the metadata in database
app.use('/api/v1',downloadRouter);// to download file from your project 
app.use('/api/v1',jwt.verifyToken,jwt.isAdmin,userRouter);


app.listen(3000);
module.exports = app;