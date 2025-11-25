// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRequests, updateRequestStatus } from "../store/requestSlice";
// import { fetchHotels } from "../store/HotelSlice";
// import { Card, Button, Row, Col, Badge } from "react-bootstrap";

// const AdminBookings = () => {
//   const dispatch = useDispatch();

//   const { requests, loading } = useSelector((s) => s.requests);
//   const { hotels } = useSelector((s) => s.hotel);

//   useEffect(() => {
//     dispatch(fetchRequests());
//     dispatch(fetchHotels());
//   }, [dispatch]);

//   const getHotel = (hotelId) => hotels.find((h) => h.id === hotelId);

//   const handleApprove = (req) => {
//     dispatch(updateRequestStatus({ requestId: req.id, newStatus: "approved" }));
//   };

//   const handleReject = (req) => {
//     dispatch(updateRequestStatus({ requestId: req.id, newStatus: "rejected" }));
//   };

//   if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">All Bookings</h2>

//       <Row xs={1} md={2} lg={3} className="g-4">
//         {requests.map((req) => {
//           const hotel = getHotel(req.hotelId);

//           return (
//             <Col key={req.id}>
//               <Card className="shadow-sm h-100">
//                 <Card.Img
//                   variant="top"
//                   src={hotel?.img || "https://via.placeholder.com/400x200"}
//                   style={{ height: 150, objectFit: "cover" }}
//                 />

//                 <Card.Body>
//                   <Card.Title>{hotel?.name || "Unknown Hotel"}</Card.Title>

//                   <Card.Text>
//                     <strong>User:</strong> {req.userEmail} <br />
//                     <strong>People:</strong> {req.peopleBooked} <br />
//                     <strong>Price:</strong> ₹{req.price} <br />
//                     <strong>Date:</strong>{" "}
//                     {req.date ? new Date(req.date).toLocaleString() : "N/A"}
//                     <br />
//                   </Card.Text>

//                   <Badge
//                     bg={
//                       req.status === "pending"
//                         ? "warning"
//                         : req.status === "approved"
//                         ? "success"
//                         : "danger"
//                     }
//                     className="mb-3"
//                   >
//                     {req.status.toUpperCase()}
//                   </Badge>

//                   {req.status === "pending" && (
//                     <div className="d-flex gap-2">
//                       <Button
//                         size="sm"
//                         variant="success"
//                         onClick={() => handleApprove(req)}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="danger"
//                         onClick={() => handleReject(req)}
//                       >
//                         Reject
//                       </Button>
//                     </div>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           );
//         })}
//       </Row>
//     </div>
//   );
// };

// export default AdminBookings;
