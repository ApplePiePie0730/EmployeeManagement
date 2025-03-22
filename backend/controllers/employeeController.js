const Employee = require("../models/Employee");

const addEmployee = async (req, res) => {
    const { name, email, phone, position, department} = req.body;

    try {
        const newEmployee = await Employee.create({
            name,
            email,
            phone,
            position,
            department
        });

        res.status(201).json(newEmployee);
    } catch (error){
        res.status(500).json({ message: error.message});
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

const updateEmployee = async (req, res) => {
    const { name, email, phone, position, department } = req.body;
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({message: "Employee not found"});
  
      employee.name = name || employee.name;
      employee.email = email || employee.email;
      employee.phone = phone || employee.phone;
      employee.position = position || employee.position;
      employee.department = department || employee.department;
  
      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };

  const deleteEmployee = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({message: "Employee not found"});
  
      await employee.remove(); 
      res.json({message: "Employee deleted"});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };

module.exports = { addEmployee, getAllEmployees, updateEmployee, deleteEmployee};