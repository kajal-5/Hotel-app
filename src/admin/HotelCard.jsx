import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateHotel, deleteHotel } from "../store/HotelSlice";
import { updateRequestStatus } from "../store/requestSlice";
import EditHotel from "./EditHotelButton";
import "./style/HotelCard.css";

const HotelCard = ({ hotel, requests = [] }) => {
  const dispatch = useDispatch();

  if (!hotel) {
    return (
      <div className="text-center text-muted py-3">Loading hotel data...</div>
    );
  }

  const [showEdit, setShowEdit] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const [form, setForm] = useState({
    name: hotel?.name || "",
    img: hotel?.img || "",
    people: hotel?.totalPeople ?? hotel?.people ?? 1,
    price: hotel?.price ?? 0,
    city: hotel?.city || "",
    pincode: hotel?.pincode || "",
  });

  // ---- Delete Hotel ----
  const handleDelete = async () => {
    if (!window.confirm(`Delete hotel "${hotel.name}"?`)) return;
    await dispatch(deleteHotel(hotel.id));
    // alert("Hotel deleted successfully");
  };

  const handleApprove = (req) => {
    if (clickedId === req.id) return;
    if (!window.confirm(`Confirm booking from ${req.userEmail}?`)) return;
    setClickedId(req.id);
    dispatch(
      updateRequestStatus({
        requestId: req.id,
        newStatus: "approved",
      })
    );

    alert("Booking Approved");
  };

  const handleReject = (req) => {
    if (!window.confirm(`Cancel booking from ${req.userEmail}?`)) return;
    dispatch(updateRequestStatus({ requestId: req.id, newStatus: "rejected" }));
  };

  // ---- Edit ----
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const newTotal = Number(form.people);
    const oldAvailable = hotel.availablePeople ?? hotel.totalPeople ?? 0;

    // ✅ Add new total to old available (your requested logic)
    // const updatedAvailable = Math.max(0, oldAvailable + newTotal);

    const updates = {
      name: form.name,
      img: form.img,
      description: form.description,
      totalPeople: Number(form.people),
      availablePeople: Number(form.people),
      price: Number(form.price),
    };

    await dispatch(updateHotel({ id: hotel.id, updates }));
    setShowEdit(false);
    alert("Hotel updated successfully!");
  };

  return (
    <>
      <Card className="h-100 shadow-sm hotel-card">
        <Card.Img
          variant="top"
          src={hotel?.img}
          style={{ height: 180, objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null; // ✅ prevent infinite loop
            e.target.src =
              "https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=";
          }}
        />
        <Card.Body>
          <Card.Title className="space-between">
            {hotel?.name || " Hotel"}{" "}
            <Badge bg="info" className="ms-2">
              {hotel?.availablePeople ?? hotel?.totalPeople ?? 0} available
            </Badge>
          </Card.Title>
          <Card.Text>
            <strong>City:{hotel?.city || "—"}</strong>

            <p className="user-card-desc">
              <strong>Price Per Night :₹{hotel?.price || 0}</strong>
            </p>

            <div className="d-flex gap-2 mb-2 space-between">
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => setShowEdit(true)}
              >
                Edit
              </Button>
              <Button size="sm" variant="outline-danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Card.Text>
          <div>
            <div className="text-muted mb-2">Pending requests:</div>
              {requests.length === 0 ? (
                <div className="text-muted">No pending requests</div>
              ) : (
                requests.map((r) => (
                  <div
                    key={r.id}
                    // className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded"
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div>
                        <strong>{r.userEmail?.split("@")[0]}</strong>
                      </div>
                      <div className="text-muted">
                        {r.peopleBooked} person(s)
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleApprove(r)}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleReject(r)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))
              )}
          </div>
        </Card.Body>
      </Card>

      <EditHotel
        show={showEdit}
        onClose={() => setShowEdit(false)}
        form={form}
        setForm={setForm}
        onSave={handleEditSubmit}
      />
    </>
  );
};

export default HotelCard;
