import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserForm } from "./UserForm";
import { UserActions } from "./UserActions";
import { UserChart } from "./UserChart";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  total_logins: number;
  total_downloads: number;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    role: "",
  });

  const addUser = () => {
    setEditingUserId(null);
    setFormData({ name: "", email: "", role: "User" });
    setIsModalOpen(true);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const existingUser = users.find(user => user.email === formData.email);
    if (existingUser) {
      toast.error("Email already exists. Please choose a different one.");
      return;
    }

    if (editingUserId) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/${editingUserId}/`,
          formData
        );
        setEditingUserId(null);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/`,
          formData
        );
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }

    setFormData({ name: "", email: "", role: "User" });
    setIsModalOpen(false);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* Add User Button */}
      <button
        onClick={addUser}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 text-base font-bold"
      >
        Add New User
      </button>

      {/* Modal for UserForm */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <UserForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}

      {/* User Table */}
      <table className="table-auto w-full border-collapse border border-gray-200 mb-6 shadow-lg rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-base font-semibold">
              Name
            </th>
            <th className="px-6 py-3 text-left text-base font-semibold">
              Email
            </th>
            <th className="px-6 py-3 text-left text-base font-semibold">
              Role
            </th>
            <th className="px-6 py-3 text-center text-base font-semibold">
              Logins
            </th>
            <th className="px-6 py-3 text-center text-base font-semibold">
              Downloads
            </th>
            <th className="px-6 py-3 text-center text-base font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-xs text-gray-800">
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="px-6 py-2">{user.name}</td>
              <td className="px-6 py-2">{user.email}</td>
              <td className="px-6 py-2">{user.role}</td>
              <td className="px-6 py-2 text-center">{user.total_logins}</td>
              <td className="px-6 py-2 text-center">{user.total_downloads}</td>
              <td className="px-6 py-2 text-center">
                <UserActions user={user} fetchUsers={fetchUsers} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Chart */}
      <UserChart users={users} />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default UserTable;
