// src/components/AdminPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHotel, fetchHotels } from "../store/HotelSlice";
import { fetchRequests } from "../store/requestSlice";
import { Spinner, Row, Col } from "react-bootstrap";
import HotelCard from "./HotelCard";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { hotels, loading: hotelsLoading } = useSelector((s) => s.hotel);
  const { requests, loading: reqLoading } = useSelector((s) => s.requests);

  const [form, setForm] = useState({
    name: "",
    img: "",
    description: "",
    people: 1,
    price: 0,
  });

  const initialLoaded = useRef(false);

  useEffect(() => {
    const loadInitial = async () => {
      await Promise.all([dispatch(fetchHotels()), dispatch(fetchRequests())]);
      initialLoaded.current = true;
    };
    loadInitial();

    const interval = setInterval(() => {
      dispatch(fetchHotels());
      dispatch(fetchRequests());
    }, 3000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      addHotel({
        name: form.name,
        img: form.img,
        description: form.description,
        people: form.people,
        price: form.price,
      })
    );
    setForm({ name: "", img: "", description: "", people: 1, price: 0 });
  };

  const getRequestsForHotel = (hotelId) =>
    requests.filter((r) => r.hotelId === hotelId && r.status === "pending");

  if (!initialLoaded.current && (hotelsLoading || reqLoading)) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {!hotelsLoading && hotels.length === 0 && (
        <div className="text-center text-muted">No hotels available</div>
      )}
      <Row xs={1} md={2} lg={3} className="g-4">
        {hotels.map((hotel) => (
          <Col key={hotel.id}>
            <HotelCard hotel={hotel} requests={getRequestsForHotel(hotel.id)} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminPage;
















// // src/components/AdminPage.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addHotel, fetchHotels } from "../store/HotelSlice";
// import { fetchRequests } from "../store/RequestSlice";
// import { Spinner, Row, Col } from "react-bootstrap";
// import HotelCard from "./HotelCard";

// const AdminPage = () => {
//   const dispatch = useDispatch();
//   const { hotels, loading: hotelsLoading } = useSelector((s) => s.hotel);
//   const { requests, loading: reqLoading } = useSelector((s) => s.requests);

//   const [form, setForm] = useState({
//     name: "",
//     img: "",
//     description: "",
//     people: 1,
//     price: 0,
//   });

//   const initialLoaded = useRef(false);

//   useEffect(() => {
//     // ✅ Initial load with spinner
//     const loadInitial = async () => {
//       await Promise.all([dispatch(fetchHotels()), dispatch(fetchRequests())]);
//       initialLoaded.current = true;
//     };
//     loadInitial();

//     // ✅ Silent refresh every 3 seconds (no spinner)
//     const interval = setInterval(() => {
//       dispatch(fetchHotels());
//       dispatch(fetchRequests());
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [dispatch]);

//   const handleAddSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(
//       addHotel({
//         name: form.name,
//         img: form.img,
//         description: form.description,
//         people: form.people,
//         price: form.price,
//       })
//     );
//     setForm({ name: "", img: "", description: "", people: 1, price: 0 });
//   };

//   const getRequestsForHotel = (hotelId) =>
//     requests.filter((r) => r.hotelId === hotelId && r.status === "pending");

//   // ✅ Only show spinner for first load
//   if (!initialLoaded.current && (hotelsLoading || reqLoading)) {
//     return (
//       <div className="text-center my-5">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       {!hotelsLoading && hotels.length === 0 && (
//         <div className="text-center text-muted">No hotels available</div>
//       )}

//       <Row xs={1} md={2} lg={3} className="g-4">
//         {hotels.map((hotel) => (
//           <Col key={hotel.id}>
//             <HotelCard hotel={hotel} requests={getRequestsForHotel(hotel.id)} />
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default AdminPage;











// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addHotel, fetchHotels } from "../store/HotelSlice";
// import { fetchRequests } from "../store/RequestSlice";
// import { Modal, Button, Form, Spinner, Row, Col } from "react-bootstrap";
// import HotelCard from "./HotelCard";

// const AdminPage = () => {
//   const dispatch = useDispatch();
//   const { hotels, loading: hotelsLoading } = useSelector((s) => s.hotel);
//   const { requests, loading: reqLoading } = useSelector((s) => s.requests);

//   const [showAdd, setShowAdd] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     img: "",
//     description: "",
//     people: 1,
//     price: 0,
//   });


//     useEffect(() => {
//     dispatch(fetchHotels());
//     dispatch(fetchRequests());
//   }, [dispatch]);

//   const handleAddSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(
//       addHotel({
//         name: form.name,
//         img: form.img,
//         description: form.description,
//         people: form.people,
//         price: form.price,
//       })
//     );
//     setShowAdd(false);
//     setForm({ name: "", img: "", description: "", people: 1, price: 0 });
//   };

//   const getRequestsForHotel = (hotelId) =>
//     requests.filter((r) => r.hotelId === hotelId && r.status === "pending");

//   return (
//     <div className="container mt-4">
//       {(hotelsLoading || reqLoading) && (
//         <div className="text-center my-5">
//           <Spinner animation="border" variant="primary" />
//         </div>
//       )}

//       {!hotelsLoading && hotels.length === 0 && (
//         <div className="text-center text-muted">No hotels available</div>
//       )}

//       {/* ✅ Hotel Cards */}
//       <Row xs={1} md={2} lg={3} className="g-4">
//         {hotels.map((hotel) => (
//           <Col key={hotel.id}>
//             <HotelCard hotel={hotel} requests={getRequestsForHotel(hotel.id)} />
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default AdminPage;





// // // src/pages/AdminPage.jsx
// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addHotel, fetchHotels, updateHotel } from "../store/HotelSlice";
// // import { fetchRequests, updateRequestStatus } from "../store/RequestSlice";
// // import {
// //   Modal,
// //   Button,
// //   Form,
// //   Card,
// //   Row,
// //   Col,
// //   Badge,
// //   Spinner,
// // } from "react-bootstrap";
// // import HotelCard from "./HotelCard";
// // import EditHotel from "./EditHotelButton.jsx";  

// // const AdminPage = () => {
// //   const dispatch = useDispatch();
// //   const { hotels, loading: hotelsLoading } = useSelector((s) => s.hotel);
// //   const { requests, loading: reqLoading } = useSelector((s) => s.requests);
// //   const [showAdd, setShowAdd] = useState(false);
// //   const [showEdit, setShowEdit] = useState(false);
// //   const [editing, setEditing] = useState(null);
// //   const [form, setForm] = useState({
// //     name: "",
// //     img: "",
// //     description: "",
// //     people: 1,
// //     price: 0,
// //   });

// //   // Polling interval (pseudo real-time)
// //   useEffect(() => {
// //     dispatch(fetchHotels());
// //     dispatch(fetchRequests());
// //     const int = setInterval(() => {
// //       dispatch(fetchHotels());
// //       dispatch(fetchRequests());
// //     }, 3000); // every 3s
// //     return () => clearInterval(int);
// //   }, [dispatch]);

// //   const openEdit = (hotel) => {
// //     setEditing(hotel);
// //     setForm({
// //       name: hotel.name || "",
// //       img: hotel.img || "",
// //       description: hotel.description || "",
// //       people: hotel.totalPeople ?? hotel.people ?? 1,
// //       price: hotel.price ?? 0,
// //     });
// //     setShowEdit(true);
// //   };

// //   const handleAddSubmit = async (e) => {
// //     e.preventDefault();
// //     await dispatch(
// //       addHotel({
// //         name: form.name,
// //         img: form.img,
// //         description: form.description,
// //         people: form.people,
// //         price: form.price,
// //       })
// //     );
// //     setShowAdd(false);
// //     setForm({ name: "", img: "", description: "", people: 1, price: 0 });
// //   };

// //   const handleEditSubmit = async (e) => {
// //     e.preventDefault();
// //     await dispatch(
// //       updateHotel({
// //         id: editing.id,
// //         updates: {
// //           name: form.name,
// //           img: form.img,
// //           description: form.description,
// //           totalPeople: Number(form.people),
// //           // also adjust availablePeople if admin changed total (keep availablePeople consistent)
// //         },
// //       })
// //     );
// //     // optionally adjust availablePeople if totalPeople changed:
// //     const newTotal = Number(form.people);
// //     const currentAvail = editing.availablePeople ?? editing.totalPeople ?? 0;
// //     const delta = newTotal - (editing.totalPeople ?? editing.people ?? 0);
// //     if (delta !== 0) {
// //       const updatedAvail = Math.max(
// //         0,
// //         (editing.availablePeople ?? editing.totalPeople ?? 0) + delta
// //       );
// //       await dispatch(
// //         updateHotel({
// //           id: editing.id,
// //           updates: { availablePeople: updatedAvail },
// //         })
// //       );
// //     }
// //     setShowEdit(false);
// //     setEditing(null);
// //   };

// //   const requestsForHotel = (hotelId) =>
// //     requests.filter((r) => r.hotelId === hotelId && r.status === "pending");

// //   const handleApprove = (req) => {
// //     if (
// //       !window.confirm(
// //         `Approve request: ${req.userEmail} - ${req.peopleBooked} people for hotel ${req.hotelId}?`
// //       )
// //     )
// //       return;
// //     dispatch(updateRequestStatus({ requestId: req.id, newStatus: "approved" }));
// //   };

// //   const handleReject = (req) => {
// //     if (!window.confirm(`Reject request from ${req.userEmail}?`)) return;
// //     dispatch(updateRequestStatus({ requestId: req.id, newStatus: "rejected" }));
// //   };

// //   // 🔁 Fetch data + real-time polling every 3s
// //   useEffect(() => {
// //     dispatch(fetchHotels());
// //     dispatch(fetchRequests());
// //     const int = setInterval(() => {
// //       dispatch(fetchHotels());
// //       dispatch(fetchRequests());
// //     }, 3000);
// //     return () => clearInterval(int);
// //   }, [dispatch]);

// //   // Filter pending requests for each hotel
// //   const getRequestsForHotel = (hotelId) =>
// //     requests.filter((r) => r.hotelId === hotelId && r.status === "pending");

// //   return (
// //     <div className="container mt-4">
// //       {(hotelsLoading || reqLoading) && (
// //         <div className="text-center my-5">
// //           <Spinner animation="border" variant="primary" />
// //         </div>
// //       )}

// //       {!hotelsLoading && hotels.length === 0 && (
// //         <div className="text-center text-muted">No hotels available</div>
// //       )}

// //       {/* ✅ Render Hotel Cards */}
// //       <Row xs={1} md={2} lg={3} className="g-4">
// //         {hotels.map((hotel) => (
// //           <Col key={hotel.id}>
// //             <HotelCard hotel={hotel} requests={getRequestsForHotel(hotel.id)} />
// //           </Col>
// //         ))}
// //       </Row>

// //       {/* <Row xs={1} md={2} lg={3} className="g-4">
// //         {hotels.map((h) => (
// //           <Col key={h.id}>
// //             <Card className="h-100 shadow-sm">
// //               <Card.Img
// //                 variant="top"
// //                 src={h.img || "https://via.placeholder.com/400x200"}
// //                 style={{ height: 180, objectFit: "cover" }}
// //               />
// //               <Card.Body>
// //                 <Card.Title>
// //                   {h.name}{" "}
// //                   <Badge bg="info" className="ms-2">
// //                     {h.availablePeople ?? h.totalPeople ?? 0} available
// //                   </Badge>
// //                 </Card.Title>
// //                 <Card.Text>{h.description}</Card.Text>
// //                 <div className="d-flex gap-2 mb-2">
// //                   <strong>₹{h.price}</strong>
// //                   <Button
// //                     size="sm"
// //                     variant="outline-primary"
// //                     onClick={() => openEdit(h)}
// //                   >
// //                     Edit
// //                   </Button>
// //                 </div>

// //                 <div>
// //                   <div className="text-muted mb-2">Pending requests:</div>
// //                   {requestsForHotel(h.id).length === 0 ? (
// //                     <div className="text-muted">No pending requests</div>
// //                   ) : (
// //                     requestsForHotel(h.id).map((r) => (
// //                       <div
// //                         key={r.id}
// //                         className="d-flex justify-content-between align-items-center border p-2 mb-2"
// //                       >
// //                         <div>
// //                           <div>
// //                             <strong>{r.userEmail.split("@")[0]}</strong>
// //                           </div>
// //                           <div className="text-muted">
// //                             {r.peopleBooked} person(s)
// //                           </div>
// //                         </div>
// //                         <div className="d-flex gap-2">
// //                           <Button
// //                             size="sm"
// //                             variant="success"
// //                             onClick={() => handleApprove(r)}
// //                           >
// //                             Confirm
// //                           </Button>
// //                           <Button
// //                             size="sm"
// //                             variant="danger"
// //                             onClick={() => handleReject(r)}
// //                           >
// //                             Cancel
// //                           </Button>
// //                         </div>
// //                       </div>
// //                     ))
// //                   )}
// //                 </div>
// //               </Card.Body>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row> */}

// //       {/* Add Modal */}
// //       {/* <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Add Hotel</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form onSubmit={handleAddSubmit}>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Name</Form.Label>
// //               <Form.Control
// //                 value={form.name}
// //                 onChange={(e) => setForm({ ...form, name: e.target.value })}
// //                 required
// //               />
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Image URL</Form.Label>
// //               <Form.Control
// //                 value={form.img}
// //                 onChange={(e) => setForm({ ...form, img: e.target.value })}
// //               />
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Description</Form.Label>
// //               <Form.Control
// //                 as="textarea"
// //                 rows={3}
// //                 value={form.description}
// //                 onChange={(e) =>
// //                   setForm({ ...form, description: e.target.value })
// //                 }
// //               />
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Total People</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 min={1}
// //                 value={form.people}
// //                 onChange={(e) =>
// //                   setForm({ ...form, people: Number(e.target.value) })
// //                 }
// //                 required
// //               />
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Price</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 min={0}
// //                 value={form.price}
// //                 onChange={(e) =>
// //                   setForm({ ...form, price: Number(e.target.value) })
// //                 }
// //               />
// //             </Form.Group>
// //             <div className="text-end">
// //               <Button
// //                 variant="secondary"
// //                 onClick={() => setShowAdd(false)}
// //                 className="me-2"
// //               >
// //                 Cancel
// //               </Button>
// //               <Button type="submit" variant="primary">
// //                 Add
// //               </Button>
// //             </div>
// //           </Form>
// //         </Modal.Body>
// //       </Modal> */}

// //       {/* Edit Modal */}
// //       <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Edit Hotel</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form onSubmit={handleEditSubmit}>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Name</Form.Label>
// //               <Form.Control
// //                 value={form.name}
// //                 onChange={(e) => setForm({ ...form, name: e.target.value })}
// //                 required
// //               />
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Image URL</Form.Label>
// //               <Form.Control
// //                 value={form.img}
// //                 onChange={(e) => setForm({ ...form, img: e.target.value })}
// //               />
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Description</Form.Label>
// //               <Form.Control
// //                 as="textarea"
// //                 rows={3}
// //                 value={form.description}
// //                 onChange={(e) =>
// //                   setForm({ ...form, description: e.target.value })
// //                 }
// //               />
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Total People</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 min={1}
// //                 value={form.people}
// //                 onChange={(e) =>
// //                   setForm({ ...form, people: Number(e.target.value) })
// //                 }
// //                 required
// //               />
// //             </Form.Group>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Price</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 min={0}
// //                 value={form.price}
// //                 onChange={(e) =>
// //                   setForm({ ...form, price: Number(e.target.value) })
// //                 }
// //               />
// //             </Form.Group>
// //             <div className="text-end">
// //               <Button
// //                 variant="secondary"
// //                 onClick={() => setShowEdit(false)}
// //                 className="me-2"
// //               >
// //                 Close
// //               </Button>
// //               <Button type="submit" variant="primary">
// //                 Save
// //               </Button>
// //             </div>
// //           </Form>
// //         </Modal.Body>
// //       </Modal>
// // {/* 
// //       <EditHotel
// //         show={showEdit}
// //         onClose={() => setShowEdit(false)}
// //         form={form}
// //         setForm={setForm}
// //         onSave={handleEditSubmit}
// //       /> */}
// //     </div>
// //   );
// // };

// // export default AdminPage;
