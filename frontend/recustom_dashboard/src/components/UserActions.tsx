import React, { useState } from "react";
import axios from "axios";
import { FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import EditUserModal from "./EditUserModal";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserActionsProps {
  user: User;
  fetchUsers: () => void;
}

export const UserActions: React.FC<UserActionsProps> = ({
  user,
  fetchUsers,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/${user.id}/download_pdf/`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `User_${user.name}_Report.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const editUser = () => {
    setIsModalOpen(true);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/${user.id}/`
      );
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSave = (updatedData: {
    name: string;
    email: string;
    role: string;
  }) => {
    setCurrentUserData(updatedData);
    fetchUsers();
    setIsConfirmOpen(false);
  };

  return (
    <div className="flex space-x-3 justify-center">
      <button
        data-testid="download"
        aria-label="download"
        onClick={downloadPDF}
        className="text-purple-500 p-2 rounded hover:bg-purple-100"
      >
        <FaDownload />
      </button>

      <button
        data-testid="edit"
        aria-label="edit"
        onClick={editUser}
        className="text-green-500 p-2 rounded hover:bg-green-100"
      >
        <FaEdit />
      </button>

      <button
        data-testid="delete"
        aria-label="delete"
        onClick={() => setIsConfirmOpen(true)}
        className="text-red-500 p-2 rounded hover:bg-red-100"
      >
        <FaTrash />
      </button>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsConfirmOpen(false)} 
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      <EditUserModal
        userId={user.id}
        currentData={currentUserData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};
