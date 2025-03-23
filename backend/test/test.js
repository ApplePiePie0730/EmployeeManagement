const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { expect } = chai;

describe('addEmployee Function Test', () => {
  it('should create a new employee successfully', async () => {
    const req = {
      body: {
        name: "Nami",
        email: "nami@example.com",
        phone: "1234567890",
        position: "Developer",
        department: "Engineering"
      }
    };

    const createdEmployee = { _id: new mongoose.Types.ObjectId(), ...req.body };
    const createStub = sinon.stub(Employee, 'create').resolves(createdEmployee);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addEmployee(req, res);

    expect(createStub.calledOnceWith(req.body)).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdEmployee)).to.be.true;

    createStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    const req = { body: { name: "Nami" } };
    const createStub = sinon.stub(Employee, 'create').throws(new Error('DB Error'));
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await addEmployee(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    createStub.restore();
  });
});

describe('getAllEmployees Function Test', () => {
  it('should return all employees', async () => {
    const employees = [
      { _id: new mongoose.Types.ObjectId(), name: "Nami", email: "nami@example.com", phone: "1234567890", position: "Developer", department: "Engineering" },
      { _id: new mongoose.Types.ObjectId(), name: "Luffy", email: "luffy@example.com", phone: "0987654321", position: "Captain", department: "Leadership" }
    ];
    const findStub = sinon.stub(Employee, 'find').resolves(employees);
    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

    await getAllEmployees({}, res);

    expect(findStub.calledOnce).to.be.true;
    expect(res.json.calledWith(employees)).to.be.true;

    findStub.restore();
  });

  it('should return 500 on error', async () => {
    const findStub = sinon.stub(Employee, 'find').throws(new Error('DB Error'));
    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

    await getAllEmployees({}, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    findStub.restore();
  });
});

describe('updateEmployee Function Test', () => {
  it('should update employee successfully', async () => {
    const employeeId = new mongoose.Types.ObjectId();
    const existingEmployee = {
      _id: employeeId,
      name: "Nami",
      email: "nami@example.com",
      phone: "1234567890",
      position: "Developer",
      department: "Engineering",
      save: sinon.stub().resolvesThis(),
    };
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(existingEmployee);
    const req = { params: { id: employeeId }, body: { position: "Senior Developer", department: "Product" } };
    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

    await updateEmployee(req, res);

    expect(existingEmployee.position).to.equal("Senior Developer");
    expect(existingEmployee.department).to.equal("Product");
    expect(res.json.calledOnce).to.be.true;

    findByIdStub.restore();
  });

  it('should return 404 if employee not found', async () => {
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(null);
    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await updateEmployee(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Employee not found' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 500 on error', async () => {
    const findByIdStub = sinon.stub(Employee, 'findById').throws(new Error('DB Error'));
    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await updateEmployee(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;

    findByIdStub.restore();
  });
});

describe('deleteEmployee Function Test', () => {
  it('should delete an employee successfully', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const employee = { remove: sinon.stub().resolves() };
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(employee);
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await deleteEmployee(req, res);

    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(employee.remove.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Employee deleted' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 404 if employee not found', async () => {
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(null);
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await deleteEmployee(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Employee not found' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    const findByIdStub = sinon.stub(Employee, 'findById').throws(new Error('DB Error'));
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await deleteEmployee(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    findByIdStub.restore();
  });
});
