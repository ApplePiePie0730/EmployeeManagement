const express = require("express");
const router = express.Router();
const {addEmployee} = require("../controllers/employeeController");
const{protect} = require("../middleware/authMiddleware");
const { model } = require("mongoose");

router.post("/", protect, addEmployee);

model.exports = router;