// UserHotelCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";
import "../style/UserCard.css";

const UserHotelCard = ({ hotel, onBook }) => {
  return (
    <Card className="user-card h-100">
      <Card.Img
        variant="top"
        src={hotel.img || "https://via.placeholder.com/400x250"}
        className="user-card-img"
        onError={(e) => {
            e.target.onerror = null; // ✅ prevent infinite loop
            e.target.src = "https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=";
          
          }}
      />

      <Card.Body>
        <Card.Title>{hotel.name}</Card.Title>
        <Card.Text className="user-card-desc">{hotel.city}</Card.Text>

        <div className="d-flex justify-content-between">
          <strong>₹{hotel.price}</strong>
          <small>Available: {hotel.availablePeople}</small>
        </div>

        <Button
          className="mt-3 w-100"
          onClick={() => {
            if (hotel.availablePeople === 0) {
              return alert("Hotel is fully booked. No rooms available.");
            }
            onBook(hotel);
          }}
        >
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserHotelCard;
