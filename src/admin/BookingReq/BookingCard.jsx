import React from "react";
import { Card, Badge } from "react-bootstrap";
import "../style/HotelCard.css";

const BookingCard = (request, hotel ) => {
  if (!request) {
    return <div className="text-muted text-center py-3">Loading...</div>;
  }

  return (
    <Card className="h-100 shadow-sm hotel-card">

      {/* Hotel Image (Static if you have no image in request) */}
      <Card.Img
        variant="top"
        src={hotel?.img || "https://via.placeholder.com/400x200"||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTetbGmKHx_ucTyRA8NCArMo8VBscBvj3QDBw&s/400*200"}
      />

      <Card.Body>
        {/* Hotel Name + Status */}
        <Card.Title>
          {request.hotelName || "Hotel"}
          <Badge bg="info" className="ms-2">
            {request.status}
          </Badge>
        </Card.Title>

        {/* Description Section */}
        <Card.Text>
          <strong>User:</strong> {request.userEmail} <br />
          <strong>People:</strong> {request.peopleBooked} <br />
          <strong>Date:</strong> {request.date} <br />
          <strong>Price:</strong> ₹{request.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
