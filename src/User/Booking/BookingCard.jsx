import React from "react";
import { Card } from "react-bootstrap";
import "../style/UserCard.css";

const BookingCard = ({ request }) => {
  return (
    <Card className="user-card h-100">
      {/* Hotel Image */}
      <Card.Img
        variant="top"
        src={request.img || "https://via.placeholder.com/400x250"}
        className="user-card-img"
      />

      <Card.Body>
        <Card.Title className="mb-2">{request.hotelName}</Card.Title>

        {/* People Booked */}
        <p className="user-card-desc">
          <strong>People Booked:</strong> {request.peopleBooked}
        </p>

        {/* City + Pincode */}
        <p className="user-card-desc">
          <strong>City:</strong> {request.city || "—"}, 
          <strong> Pincode:</strong> {request.pincode || "—"}
        </p>

        {/* Dates */}
        <p className="user-card-desc">
          <strong>Date:</strong> {request.date}
        </p>

        {/* Price */}
        <p className="user-card-desc">
          <strong>Price:</strong> ₹{request.price}
        </p>

        {/* Status */}
        <p className="user-card-desc">
          <strong>Status:</strong> 
          <span
            style={{
              color:
                request.status === "approved"
                  ? "green"
                  : request.status === "pending"
                  ? "orange"
                  : "red",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            {request.status}
          </span>
        </p>
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
