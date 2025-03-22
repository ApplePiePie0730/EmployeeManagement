const express = require("express");
const router = express.Router();
const {addEmployee, getAllEmployees, updateEmployee, deleteEmployee} = require("../controllers/employeeController");
const{protect} = require("../middleware/authMiddleware");


router.post("/", protect, addEmployee);
router.get("/", protect, getAllEmployees);
router.put("/:id", protect, updateEmployee);
router.delete("/:id", protect, deleteEmployee);
module.exports = router;