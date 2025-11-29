import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../../store/HotelSlice";
import { fetchRequests, bookHotel } from "../../store/requestSlice";
import UserHotelCard from "./UserHotelCard";
import UserBookModal from "./UserBookModal";
import SearchBox from "../Search/Searchbox";
import "../style/UserPage.css";

const UserHotelPage = () => {
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.hotel);
  const user = useSelector((state) => state.auth.user);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchHotels());
    dispatch(fetchRequests());
    const int = setInterval(() => {
      dispatch(fetchHotels());
      dispatch(fetchRequests());
    }, 3000);
    return () => clearInterval(int);
  }, [dispatch]);

  const openBookingModal = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHotel(null);
  };

  const handleBookingSubmit = (formData) => {
    if (!user) return alert("Please login first");

    dispatch(bookHotel({ ...formData, userEmail: user.email }))
      .unwrap()
      .then(() => {
        alert("Booking Request Sent");
        closeModal();
      })
      .catch(() => alert("Booking Failed"));
  };

  const filteredHotels = hotels.filter((hotel) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      hotel.name?.toLowerCase().includes(search) ||
      hotel.city?.toLowerCase().includes(search) ||
      hotel.pincode?.toString().includes(search) ||
      hotel.price?.toString().includes(search)
    );
  });

  return (
    <div className="user-page container mt-5 pt-3">
      <h1 className="Heading">
        Book Best Hotels in low Price
      </h1>
      <div className="my-3">
       <SearchBox value={searchTerm} onChange={setSearchTerm} />
       </div>

      {/*  NO RESULT MESSAGE */}
      {filteredHotels.length === 0 && (
        <p className="text-center text-danger mt-4">
          No hotels found
        </p>
      )}
      <div className="row  g-3 user-row">
        {filteredHotels.map((hotel) => (
          <div className="col-lg-4 col-md-6 col-sm-12 user-col" key={hotel.id}>
            <UserHotelCard hotel={hotel} onBook={openBookingModal} />
          </div>
        ))}
      </div>

      {selectedHotel && (
        <UserBookModal
          show={showModal}
          onHide={closeModal}
          hotel={selectedHotel}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default UserHotelPage;
