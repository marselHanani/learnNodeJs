const mongoose = require('mongoose');

const auditSchema = mongoose.Schema({
    action: { type: String, required: true },
    status:{type:Number, required: true},
    errors:{type:Array, required:true},
    auditBy: { type: String, required: true },
    auditOn: { type: Date, default: Date.now },
    data: { type: Object } // to store more specific data about audited actions
});
const audit = mongoose.model('audit', auditSchema);

module.exports = audit;