import React, { useState, useEffect } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchRequests, updateRequestStatus } from "../store/requestSlice";
import { FaBell } from "react-icons/fa";


const AdminNotification = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((s) => s.requests);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchRequests());
    const interval = setInterval(() => dispatch(fetchRequests()), 3000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const pendingRequests = requests.filter((r) => r.status === "pending");


  return (
    <>
      {/*Bell Icon */}
      <div className="notification-bell" onClick={() => setShow(true)}>
        <FaBell size={24} color="white" />

        {pendingRequests.length > 0 && (
          <span className="notification-badge">{pendingRequests.length}</span>
        )}
      </div>

      {/*Modal */}
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
                    🏨 <strong>{req.hotelId}</strong> — {req.userEmail}
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
