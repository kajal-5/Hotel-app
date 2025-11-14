import React from "react";
import axios from "axios";

const DeleteHotel = ({ hotelId, onClose, onDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_DB_URL}/hotels/${hotelId}.json`);
      console.log("Hotel deleted successfully!");
      onDeleted(); // refresh hotel list in admin
      onClose(); // close the modal
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this hotel? This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteHotel;
