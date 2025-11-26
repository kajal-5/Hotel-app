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
        {/* <Card.Img
          variant="top"
          src={
            hotel?.img
          }
          onError={(e) => {
            e.target.onerror = null; // ✅ prevents infinite loop
            e.target.src = "https://via.placeholder.com/400x200?text=No+Imagedata:image/jpeg;base64,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";
          }}
          style={{ height: 180, objectFit: "cover" }}
        /> */}

        <Card.Img
          variant="top"
          src={hotel?.img}
          style={{ height: 180, objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null; // ✅ prevent infinite loop
            e.target.src = "https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=";
          
          }}
        />
        <Card.Body>
          <Card.Title>
            {hotel?.name || " Hotel"}{" "}
            <Badge bg="info" className="ms-2">
              {hotel?.availablePeople ?? hotel?.totalPeople ?? 0} available
            </Badge>
          </Card.Title>
          <Card.Text>
            <pre>
              {" "}
              City :{hotel?.city || "Bhopal"} Pincode:{hotel?.pincode || ""}{" "}
            </pre>
          </Card.Text>

          <div className="d-flex gap-2 mb-2">
            <strong>₹{hotel?.price || 0}</strong>
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

          <div>
            <div className="text-muted mb-2">Pending requests:</div>
            <div className="request-scroll-container">
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
