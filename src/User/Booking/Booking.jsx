import React from "react";
import { useSelector } from "react-redux";
import BookingCard from "./BookingCard";

const BookingPage = () => {
  const { hotels } = useSelector((s) => s.hotel);
  const { requests } = useSelector((s) => s.requests);
  const user = useSelector((s) => s.auth.user);

  // Filter user-specific requests
  const myRequests = requests.filter((r) => r.userEmail === user?.email);

  // Match request.hotelName → hotel
  const findHotel = (name) => hotels.find((h) => h.name === name);

  return (
    <div className="container mt-5 pt-3">
      <h3 className="mb-4">My Booking Requests</h3>

      <div className="row g-3">
        {myRequests.map((req) => {
          const hotel = findHotel(req.hotelName);

          return (
            <div className="col-lg-4 col-md-6 col-sm-12" key={req.id}>
              <BookingCard hotel={hotel} request={req} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingPage;
