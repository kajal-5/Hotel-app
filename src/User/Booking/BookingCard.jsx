import React from "react";
import { Card } from "react-bootstrap";
import "../style/UserCard.css";


const BookingCard = ({ request }) => {

   const DEFAULT_IMG =
    "https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=";

  return (
    <Card className="user-card h-100">
      {/* Hotel Image */}
      <Card.Img
        variant="top"
        src={request.img || DEFAULT_IMG}
        className="user-card-img"
                onError={(e) => {
            e.target.onerror = null; // ✅ prevent infinite loop
            e.target.src = DEFAULT_IMG;
          
          }}
      />

      <Card.Body>
        <Card.Title className="mb-2">{request.hotelName}</Card.Title>


        <p className="user-card-desc">
          <strong>People Booked:</strong> {request.peopleBooked}
        </p>

    
        <p className="user-card-desc">
          <strong>City:</strong> {request.city || "—"}, 
          <strong> Pincode:</strong> {request.pincode || "—"}
        </p>

 
        <p className="user-card-desc">
          <strong>Date:</strong> {request.date}
        </p>

        <p className="user-card-desc">
          <strong>Price:</strong> ₹{request.price}
        </p>

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
              paddingBottom:"10px",
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
