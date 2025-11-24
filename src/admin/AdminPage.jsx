import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHotel, fetchHotels } from "../store/HotelSlice";
import { fetchRequests } from "../store/requestSlice";
import { Spinner, Row, Col } from "react-bootstrap";
import HotelCard from "./HotelCard";
import "./style/HotelCard.css";
// import AdminRequests from "../cards/adminpage.jsx";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { hotels, loading: hotelsLoading } = useSelector((s) => s.hotel);
  const { requests, loading: reqLoading } = useSelector((s) => s.requests);

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
    }, 100);
    return () => clearInterval(interval);
  }, [dispatch]);

  const getRequestsForHotel = (hotelId) =>
    requests.filter((r) => r.hotelId === hotelId && r.status === "pending");

  if (!initialLoaded.current && (hotelsLoading || reqLoading)) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const handleApprove = (req) => {
    console.log("Approve", req);
  };

  const handleReject = (req) => {
    console.log("Reject", req);
  };

  return (
    <div className="container-fluid mt-4 px-4 admin-card">
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

      {/* <h2 className="mt-4">All Booking Requests----------------------new</h2>

      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        {requests.map((req) => {
          const hotel = hotels.find((h) => h.id === req.hotelId);

          return (
            <Col key={req.id}>
              <AdminRequests
                request={req}
                hotel={hotel}
                onConfirm={handleApprove}
                onCancel={handleReject}
              />
            </Col>
          );
        })}
      </Row> */}
    </div>
  );
};

export default AdminPage;
