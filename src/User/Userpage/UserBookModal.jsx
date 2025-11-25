// UserBookModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./BookingModal.css";

const UserBookModal = ({ show, onHide, hotel, onSubmit }) => {
  const [people, setPeople] = useState(1);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const validateDates = (s, e) => {
    if (!s || !e) return; // No alert here during typing

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

    onSubmit({
      hotelId: hotel.id,
      hotelName: hotel.name,
      people,
      pincode: hotel.pincode,
      city: hotel.city,
      date: `${start} to ${end}`,
      price: hotel.price,
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <div className="modal-content custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Book {hotel.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={hotel.img} className="modal-img" alt={hotel.name} />

          <pre>
            <strong>City:</strong> {hotel.city} <strong>Pincode:</strong>{" "}
            {hotel.pincode}
          </pre>
          <p>
            <strong>Available:</strong> {hotel.availablePeople}
          </p>

          <Form.Group className="mt-3">
            <Form.Label>People</Form.Label>
            <Form.Select
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
            >
              {Array.from({ length: hotel.availablePeople }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} People
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              min={today}
              value={start}
              // onChange={(e) => setStart(e.target.value)}
              onChange={handleStart}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              min={start || today}
              value={end}
              // onChange={(e) => setEnd(e.target.value)}
              onChange={handleEnd}
            />
          </Form.Group>

          <h5 className="mt-3 text-center">Price: ₹{hotel.price}</h5>
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
