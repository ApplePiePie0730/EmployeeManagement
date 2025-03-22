const express = require("express");
const router = express.Router();
const {addEmployee, getAllEmployees} = require("../controllers/employeeController");
const{protect} = require("../middleware/authMiddleware");


router.post("/", protect, addEmployee);
router.get("/", protect, getAllEmployees);
module.exports = router;