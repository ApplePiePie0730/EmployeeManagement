const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: String,
    phone: String,
    position: String,
    department: String
});

module.exports = mongoose.model("Employee", employeeSchema);