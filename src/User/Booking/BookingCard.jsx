import React from "react";
import { Card } from "react-bootstrap";
import "./style/BookingCard.css";

const BookingCard = ({ hotel, request }) => {
  return (
    <Card className="user-card h-100">
      <Card.Img
        variant="top"
        src={hotel?.img || "https://via.placeholder.com/400x250"}
        className="user-card-img"
      />

      <Card.Body>
        <Card.Title className="mb-2">{hotel?.name}</Card.Title>

        <Card.Text className="user-card-desc">
          {hotel?.description}
        </Card.Text>

        <div className="mt-3">
          <p><strong>Date:</strong> {request.date}</p>
          <p><strong>People:</strong> {request.peopleBooked}</p>
          <p><strong>Price:</strong> ₹{request.price}</p>

          <p>
            <strong>Status: </strong>
            <span
              className={
                request.status === "approved"
                  ? "text-success"
                  : request.status === "rejected"
                  ? "text-danger"
                  : "text-warning"
              }
            >
              {request.status}
            </span>
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
