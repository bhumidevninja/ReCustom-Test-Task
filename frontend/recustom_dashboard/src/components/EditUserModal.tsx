import React, { useState, useEffect } from "react";
import axios from "axios";

interface EditUserModalProps {
  userId: string;
  currentData: { name: string; email: string; role: string };
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: { name: string; email: string; role: string }) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  userId,
  currentData,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState(currentData);

  useEffect(() => {
    if (isOpen) {
      setFormData(currentData); 
    }
  }, [isOpen, currentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/`, formData);
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-left">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-left">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-left">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditUserModal;
