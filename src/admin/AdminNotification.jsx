// src/admin/AdminNotification.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchRequests, updateRequestStatus } from "../store/requestSlice";
import { FaBell } from "react-icons/fa";

const AdminNotification = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((s) => s.requests);
  const [show, setShow] = useState(false);

  // 🔄 Auto fetch pending requests
  useEffect(() => {
    dispatch(fetchRequests());
    const interval = setInterval(() => dispatch(fetchRequests()), 3000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const pendingRequests = requests.filter((r) => r.status === "pending");

  const handleUpdate = (id, newStatus) => {
    dispatch(updateRequestStatus({ requestId: id, newStatus }));
  };

  return (
    <>
      {/* 🔔 Bell Icon */}
      <div
        style={{ position: "relative", cursor: "pointer", marginRight: "15px" }}
        onClick={() => setShow(true)}
      >
        <FaBell size={22} color="white" />

        {/* 🔥 Notification Badge */}
        {pendingRequests.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
            }}
          >
            {pendingRequests.length}
          </span>
        )}
      </div>

      {/* 🪟 Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Pending Booking Requests</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
          {pendingRequests.length === 0 ? (
            <p className="text-center text-muted">No pending requests</p>
          ) : (
            <ListGroup variant="flush">
              {pendingRequests.map((req) => (
                <ListGroup.Item key={req.id}>
                  <div>
                    🏨 <strong>{req.hotelName}</strong> — {req.userEmail}
                  </div>

                  <div className="mt-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdate(req.id, "approved")}
                    >
                      Confirm
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleUpdate(req.id, "rejected")}
                    >
                      Cancel
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminNotification;
