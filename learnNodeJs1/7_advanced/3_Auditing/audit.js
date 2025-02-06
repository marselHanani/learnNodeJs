//* Auditing is the process of tracking and recording changes or actions in a system.  
//* It helps in monitoring user activities, ensuring compliance, and detecting anomalies.  
//? Benefits of auditing:  
//# - Enhances security by tracking unauthorized access or modifications.  
//# - Helps in debugging and troubleshooting by maintaining a history of changes.  
//# - Ensures regulatory compliance by providing a clear audit trail.  
//# - Improves accountability by identifying who performed specific actions.  
//# - Supports forensic investigations in case of security breaches.  

const events = require('events');
const Audit = require('./Model/audit'); // Import the Mongoose model

// Create an event emitter object
const auditLogger = new events.EventEmitter();

// Define audit event name
const auditEvent = "audit";

// Event handler to save audit logs to MongoDB
auditLogger.on(auditEvent, async (auditData) => {
    try {
        const audit = new Audit(auditData);
        await audit.save(); // Save the log to MongoDB
        console.log("✅ Audit log saved:", auditData);
    } catch (error) {
        console.error("❌ Error saving audit log:", error);
    }
});

// Function to prepare and emit audit events
exports.prepareAudit = ({ action, auditBy, status = 200, errors = [], data = {} }) => {
    if (!action || !auditBy) {
        console.error("❌ Audit log requires both 'action' and 'auditBy'");
        return;
    }

    const auditData = {
        action,
        auditBy,
        status: errors.length > 0 ? 500 : status, // If there are errors, set status to 500
        errors,
        auditOn: new Date(),
        data
    };

    auditLogger.emit(auditEvent, auditData);
};
