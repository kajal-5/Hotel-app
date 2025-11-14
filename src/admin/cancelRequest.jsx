// import React from "react";
// import axios from "axios";

// const Cancel = ({ request, onUpdated }) => {
//   const handleCancel = async () => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;

//     try {
//       await axios.patch(
//         `${import.meta.env.VITE_DB_URL}/requests/${request.id}.json`,
//         { status: "canceled" }
//       );
//       onUpdated();
//       alert("Booking canceled!");
//     } catch (error) {
//       console.error("Error canceling request:", error);
//     }
//   };

//   return (
//     <button
//       onClick={handleCancel}
//       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//     >
//       Cancel
//     </button>
//   );
// };

// export default Cancel;
