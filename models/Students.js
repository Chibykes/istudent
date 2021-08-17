const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentsSchema = new Schema({
    confirmID: {type: String, uppercase: true},
    fullname: {type: String, lowercase: true},
    regNo: {type: String, uppercase: true},
    dept: {type: String},
    level: {type: String},
    rrr: {type: Number},
    fees: {type: Number},
});

module.exports = mongoose.model('students', StudentsSchema);