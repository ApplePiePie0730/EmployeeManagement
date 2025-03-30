import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EmployeeForm = ({ employees, setEmployees, editingEmployee, setEditingEmployee }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({name: '',
    email: '',
    phone: '',
    position: '',
    department: ''});

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name,
        email: editingEmployee.email,
        phone: editingEmployee.phone,
        position: editingEmployee.position,
        department: editingEmployee.department
      });
    } else {
      setFormData({name: '',
        email: '',
        phone: '',
        position: '',
        department: ''});
    }
  }, [editingEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        const response = await axiosInstance.put(`/api/employees/${editingEmployee._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEmployees(employees.map((emp) => (emp._id === response.data._id ? response.data : emp)));
      } else {
        const response = await axiosInstance.post('/api/employees', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEmployees([...employees, response.data]);
      }
      setEditingEmployee(null);
      setFormData({name: '',
        email: '',
        phone: '',
        position: '',
        department: ''});
    } catch (error) {
      alert('Failed to save employee.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
      </h1>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Position"
        value={formData.position}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Department"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-black text-white p-2 rounded">
      {editingEmployee ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
