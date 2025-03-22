import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EmployeeList = ({ employees, setEmployees, setEditingEmployee }) => {
  const { user } = useAuth();

  const handleDelete = async (employeeId) => {
    try {
      await axiosInstance.delete(`/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEmployees(employees.filter((emp) => emp._id !== employeeId));
    } catch (error) {
      alert('Failed to delete employee.');
    }
  };

  return (
    <div>
      {employees.map((emp) => (
        <div key={emp._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{emp.name}</h2>
          <p>Email: {emp.email}</p>
          <p>Phone: {emp.phone}</p>
          <p>Position: {emp.position}</p>
          <p>Department: {emp.department}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingEmployee(emp)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(emp._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
