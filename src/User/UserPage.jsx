// src/pages/UserPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../store/HotelSlice";
import { bookHotel, fetchRequests } from "../store/requestSlice";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const UserPage = () => {
  const dispatch = useDispatch();
  const { hotels } = useSelector(s => s.hotel);
  const { requests } = useSelector(s => s.requests);
  const user = useSelector(s => s.auth.user);
  const [selected, setSelected] = useState({});

  // initial fetch + polling
  useEffect(() => {
    dispatch(fetchHotels());
    dispatch(fetchRequests());
    const int = setInterval(() => {
      dispatch(fetchHotels());
      dispatch(fetchRequests());
    }, 3000);
    return () => clearInterval(int);
  }, [dispatch]);

  const handleBook = (hotel) => {
    const qty = selected[hotel.id] || 1;
    if (!user) return alert("Please login to book");
    if (hotel.availablePeople != null && qty > hotel.availablePeople) return alert("Not enough availability");
    dispatch(bookHotel({ hotelId: hotel.name, userEmail: user.email, people: qty }))
      .unwrap()
      .then(() => alert("Booking request sent"))
      .catch(err => alert("Error: " + (err || "Failed")));
  };

  const myRequests = requests.filter(r => r.userEmail === (user?.email));

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Available Hotels</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {hotels.length === 0 && <p>No hotels available</p>}
        {hotels.map(h => (
          <Col key={h.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={h.img || "https://via.placeholder.com/400x200"} style={{height:180, objectFit:'cover'}} />
              <Card.Body>
                <Card.Title>{h.name}</Card.Title>
                <Card.Text>{h.description}</Card.Text>

                <div className="d-flex align-items-center justify-content-between mb-3">
                  <Form.Select style={{ width: 120 }} size="sm" value={selected[h.id] || 1}
                    onChange={e => setSelected({...selected, [h.id]: Number(e.target.value)})}>
                    {Array.from({ length: Math.max(1, h.availablePeople ?? h.totalPeople ?? 1) })
                      .map((_, i) => <option key={i} value={i+1}>{i+1} person</option>)}
                  </Form.Select>
                  <strong>₹{h.price}</strong>
                </div>

                <Button disabled={(h.availablePeople ?? h.totalPeople ?? 0) <= 0} onClick={() => handleBook(h)} className="w-100">Book / Request</Button>
                <div className="text-muted mt-2">Available: {h.availablePeople ?? h.totalPeople ?? 0}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <hr className="my-4" />
      <h4>Your Requests</h4>
      {user ? (
        myRequests.length === 0 ? <p className="text-muted">No requests</p> :
        myRequests.map(r => (
          <Card key={r.id} className="mb-2">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <div><strong>{r.hotelId}</strong></div>
                <div className="text-muted">{r.peopleBooked} person(s) • {r.status}</div>
              </div>
              <div>
                <div className="text-muted" style={{fontSize:12}}>{new Date(r.createdAt).toLocaleString()}</div>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : <p>Please login to see your requests</p>}
    </Container>
  );
};

export default UserPage;



// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHotels } from "../store/HotelSlice";
// import { Card, Button, Row, Col, Container, Form } from "react-bootstrap";

// const UserPage = () => {
//   const dispatch = useDispatch();
//   const { hotels, loading } = useSelector((state) => state.hotel);
//   const [selectedPeople, setSelectedPeople] = useState({}); // { hotelId: number }

//   useEffect(() => {
//     dispatch(fetchHotels());
//   }, [dispatch]);

//   const handleBook = (hotel) => {
//     const selected = selectedPeople[hotel.id] || 1;
//     if (selected > hotel.people) {
//       alert("Not enough capacity!");
//       return;
//     }
//     alert(`Booking confirmed for ${selected} person(s) at ${hotel.name}`);
//   };

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4 fw-bold">Available Hotels</h2>
//       {loading && <p>Loading hotels...</p>}

//       <Row xs={1} md={2} lg={3} className="g-4">
//         {hotels.length === 0 && !loading && (
//           <p className="text-center text-muted">No hotels available</p>
//         )}
//         {hotels.map((hotel) => (
//           <Col key={hotel.id}>
//             <Card className="h-100 shadow-sm border-0">
//               <Card.Img
//                 variant="top"
//                 src={hotel.img || "https://via.placeholder.com/300x200"}
//                 style={{ height: "200px", objectFit: "cover" }}
//               />
//               <Card.Body>
//                 <Card.Title className="fw-semibold">{hotel.name}</Card.Title>
//                 <Card.Text>{hotel.description}</Card.Text>
//                 <div className="d-flex align-items-center justify-content-between mb-3">
//                   <Form.Select
//                     size="sm"
//                     value={selectedPeople[hotel.id] || 1}
//                     onChange={(e) =>
//                       setSelectedPeople({
//                         ...selectedPeople,
//                         [hotel.id]: Number(e.target.value),
//                       })
//                     }
//                     style={{ width: "120px" }}
//                   >
//                     {Array.from({ length: hotel.people || 1 }).map((_, i) => (
//                       <option key={i} value={i + 1}>
//                         {i + 1} person
//                       </option>
//                     ))}
//                   </Form.Select>
//                   <strong>₹{hotel.price}</strong>
//                 </div>
//                 <Button
//                   variant="primary"
//                   className="w-100"
//                   onClick={() => handleBook(hotel)}
//                 >
//                   Book Now
//                 </Button>
//                 <div className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
//                   Capacity left: {hotel.people || 0}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default UserPage;









// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHotels } from "../store/HotelSlice";
// import { Card, Button, Row, Col } from "react-bootstrap";

// const UserPage = () => {
//   const dispatch = useDispatch();
//   const { hotels, loading } = useSelector((state) => state.hotel);

//   useEffect(() => {
//     dispatch(fetchHotels());
//   }, [dispatch]);

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Available Hotels</h2>
//       {loading && <p>Loading...</p>}
//       <Row>
//         {hotels.map((hotel) => (
//           <Col md={4} key={hotel.id} className="mb-4">
//             <Card>
//               <Card.Img
//                 variant="top"
//                 src={hotel.img || "https://via.placeholder.com/200"}
//               />
//               <Card.Body>
//                 <Card.Title>{hotel.name}</Card.Title>
//                 <Card.Text>{hotel.description}</Card.Text>
//                 <Card.Text>
//                   Capacity: {hotel.people} | Price: ₹{hotel.price}
//                 </Card.Text>
//                 <Button variant="primary">Book Now</Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default UserPage;















// // src/User/UserPage.jsx
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchHotels, startHotelsListener } from "../store/HotelSlice";
// import { bookHotel } from "../store/requestSlice";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

// const UserPage = () => {
//   const dispatch = useDispatch();
//   const hotels = useSelector((s) => s.hotels.hotels);
//   const user = useSelector((s) => s.auth.user);
//   const [selected, setSelected] = useState({}); // {hotelId: number}

//   useEffect(() => {
//     startHotelsListener(dispatch);
//     dispatch(fetchHotels());
//   }, [dispatch]);

//   const handleBook = (hotel) => {
//     const qty = selected[hotel.id] || 1;
//     if (!user) return alert("Please login");
//     if (hotel.availablePeople != null && qty > hotel.availablePeople) return alert("Not enough availability");
//     dispatch(bookHotel({ hotelId: hotel.id, userEmail: user.email, people: qty }));
//     alert("Booking request sent");
//   };

//   return (
//     <Container className="mt-5">
//       <h2>Available Hotels</h2>
//       <Row xs={1} md={2} lg={3} className="g-4">
//         {hotels.map((h) => (
//           <Col key={h.id}>
//             <Card className="h-100 shadow-sm">
//               <Card.Img variant="top" src={h.image} style={{ height: 180, objectFit: "cover" }} />
//               <Card.Body>
//                 <Card.Title>{h.name}</Card.Title>
//                 <Card.Text>{h.description}</Card.Text>
//                 <div className="d-flex align-items-center gap-2 mb-2">
//                   <Form.Select value={selected[h.id] || 1} onChange={(e) => setSelected({ ...selected, [h.id]: Number(e.target.value) })} style={{ width: 120 }}>
//                     {Array.from({ length: Math.max(1, h.availablePeople ?? h.totalPeople ?? 1) }).map((_, i) => (
//                       <option key={i} value={i + 1}>{i + 1} person</option>
//                     ))}
//                   </Form.Select>
//                   <strong>₹{h.price}</strong>
//                 </div>
//                 <Button onClick={() => handleBook(h)} disabled={(h.availablePeople ?? h.totalPeople) <= 0}>Book / Request</Button>
//                 <div className="mt-2 text-muted">Available: {h.availablePeople ?? h.totalPeople}</div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default UserPage;
