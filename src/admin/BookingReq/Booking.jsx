import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests } from "../../store/requestSlice";
import { fetchHotels } from "../../store/HotelSlice";

import { Spinner, Row, Col } from "react-bootstrap";
import BookingCard from "./Bookingcard";

const Booking = () => {
  const dispatch = useDispatch();
  const { requests, loading: reqLoading } = useSelector((s) => s.requests);
  const { hotels, loading: hotelsLoading } = useSelector((s) => s.hotel);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([dispatch(fetchRequests()), dispatch(fetchHotels())]);
      setLoading(false);
    };

    loadAll();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // Create map: hotelId → hotel data
  const hotelMap = {};
  hotels.forEach((h) => {
    hotelMap[h.id] = h;
  });

  return (
    <div className="container mt-4">
      <h2>All Booking Requests</h2>

      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        {requests.map((req) => {
          const hotel = hotelMap[req.hotelId]; // ← Correct hotel for this request
          return (
            <Col key={req.id}>
              <BookingCard request={req} hotel={hotel} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Booking;
