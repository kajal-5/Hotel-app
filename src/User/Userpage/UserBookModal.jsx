// UserBookModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./BookingModal.css";

const UserBookModal = ({ show, onHide, hotel, onSubmit }) => {
  const [people, setPeople] = useState(1);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const DEFAULT_IMG =
    "https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=";

  const validateDates = (s, e) => {
    if (!s || !e) return;
    const startDate = new Date(s);
    const endDate = new Date(e);
    const todayDate = new Date(today);

    if (startDate < todayDate) {
      alert("Start date cannot be before today.");
      return false;
    }

    if (endDate < startDate) {
      alert("End date cannot be before start date.");
      return false;
    }

    return true;
  };

  const handleStart = (e) => {
    const value = e.target.value;
    setStart(value);
    validateDates(value, end);
  };

  const handleEnd = (e) => {
    const value = e.target.value;
    setEnd(value);
    validateDates(start, value);
  };

  /** SUBMIT **/

  const handleSubmit = () => {
    if (!start || !end) return alert("Please select dates");
    const totalDays =
      start && end
        ? Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24))
        : 0;
    onSubmit({
      hotelId: hotel.id,
      hotelName: hotel.name,
      people,
      pincode: hotel.pincode,
      city: hotel.city,
      date: `${start} to ${end}`,
      price: hotel.price * people *totalDays,
      img: hotel.img,
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <div className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title>{hotel.name}</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body className="modal-body-custom"> */}

        <img
          src={hotel?.img || DEFAULT_IMG}
          className="modal-img"
          alt={hotel?.name || "Hotel"}
          onError={(e) => {
            e.target.onerror = null; // prevent infinite loop
            e.target.src = DEFAULT_IMG;
          }}
        />
        <Modal.Body className="modal-body-custom">
          {/* PEOPLE SELECT */}
          <div className="form-box-vertical">
            <label className="my-2">People</label>
            <Form.Select
              className="my-1 form-control"
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
            >
              {Array.from({ length: hotel.availablePeople }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} People
                </option>
              ))}
            </Form.Select>
          </div>

          <div className="form-box-vertical">
            <label className="my-2 ">Check In </label>
            <Form.Control
              type="date"
              min={today}
              value={start}
              onChange={handleStart}
            />
          </div>

          <div className="form-box-vertical">
            <label className="my-2 ">Check Out</label>
            <Form.Control
              type="date"
              min={start || today}
              value={end}
              onChange={handleEnd}
            />
          </div>

          <h5 className="price-text">Price Per Night: ₹{hotel.price}</h5>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default UserBookModal;
