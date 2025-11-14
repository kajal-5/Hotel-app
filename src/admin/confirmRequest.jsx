// import React from "react";
// import axios from "axios";

// const Confirm = ({ request, onUpdated }) => {
//   const handleConfirm = async () => {
//     try {
//       // Update request status to "confirmed"
//       await axios.patch(
//         `${import.meta.env.VITE_DB_URL}/requests/${request.id}.json`,
//         { status: "confirmed" }
//       );

//       // Optional: Decrement available people for that hotel
//       if (request.hotelName) {
//         const hotelRes = await axios.get(
//           `${import.meta.env.VITE_DB_URL}/hotels/${request.hotelName}.json`
//         );
//         const hotel = hotelRes.data;
//         if (hotel && hotel.availablePeople > 0) {
//           await axios.patch(
//             `${import.meta.env.VITE_DB_URL}/hotels/${request.hotelName}.json`,
//             { availablePeople: hotel.availablePeople - request.people }
//           );
//         }
//       }

//       onUpdated();
//       alert("Booking confirmed!");
//     } catch (error) {
//       console.error("Error confirming request:", error);
//     }
//   };

//   return (
//     <button
//       onClick={handleConfirm}
//       className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//     >
//       Confirm
//     </button>
//   );
// };

// export default Confirm;
