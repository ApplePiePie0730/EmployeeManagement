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


module.exports = { addEmployee };