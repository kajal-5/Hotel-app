import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Modal, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests } from "../store/requestSlice";

const UserNotification = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const { requests } = useSelector((s) => s.requests);
  const { user } = useSelector((s) => s.auth);

  // Load last seen time
  const lastSeen = Number(localStorage.getItem("notif_last_seen")) || 0;

  useEffect(() => {
    dispatch(fetchRequests());

    const interval = setInterval(() => dispatch(fetchRequests()), 3000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // Only user's requests
  const userRequests = requests.filter((r) => r.userEmail === user.email);

  // Only APPROVED or REJECTED are valid notifications
  const completedRequests = userRequests.filter(
    (r) => r.status === "approved" || r.status === "rejected"
  );

  // Fallback for updatedAt
  const getTime = (req) => req.updatedAt || req.createdAt || 0;

  // ONLY show notifications that happened AFTER last seen
  const newNotifications = completedRequests.filter(
    (req) => getTime(req) > lastSeen
  );

  // Close modal → reset counter
  const handleClose = () => {
    setShow(false);
    localStorage.setItem("notif_last_seen", Date.now());
  };

  return (
    <>
      {/* Bell Icon */}
      <div className="notification-bell" onClick={() => setShow(true)}>
        <FaBell size={24} />

        {/* Badge only when approved/rejected AND new */}
        {newNotifications.length > 0 && (
          <span className="notification-badge">
            {newNotifications.length}
          </span>
        )}
      </div>

      {/* Notification Modal */}
      <Modal show={show} onHide={handleClose} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Booking Updates</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {newNotifications.length === 0 ? (
            <p className="text-muted text-center">No new updates</p>
          ) : (
            <ListGroup>
              {newNotifications.map((req) => (
                <ListGroup.Item key={req.id}>
                  <strong>{req.hotelName}</strong>
                  <br />
                  Status:{" "}
                  <span
                    style={{
                      color:
                        req.status === "approved"
                          ? "green"
                          : "red",
                    }}
                  >
                    {req.status}
                  </span>
                  <br />
                  People: {req.peopleBooked}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserNotification;



// import React, { useEffect, useState } from "react";
// import { FaBell } from "react-icons/fa";
// import { Modal, ListGroup } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRequests } from "../store/requestSlice";

// const UserNotification = () => {
//   const [show, setShow] = useState(false);
//   const dispatch = useDispatch();

//   const { requests } = useSelector((s) => s.requests);
//   const { user } = useSelector((s) => s.auth);


//   useEffect(() => {
//     dispatch(fetchRequests());
//     const interval = setInterval(() => dispatch(fetchRequests()), 3000);
//     return () => clearInterval(interval);
//   }, [dispatch]);

//   const userRequests = requests.filter((r) => r.userEmail === user.email);

//   return (
//     <>
//       {/* === Bell Icon === */}
//       <div style={{ position: "relative", cursor: "pointer", marginRight: "20px" }} onClick={() => setShow(true)}>
//         <FaBell size={24} />
//         {userRequests.length > 0 && (
//           <span
//             style={{
//               position: "absolute",
//               top: "-5px",
//               right: "-5px",
//               background: "red",
//               color: "white",
//               borderRadius: "50%",
//               padding: "2px 6px",
//               fontSize: "12px",
//             }}
//           >
//             {userRequests.length}
//           </span>
//         )}
//       </div>

//       {/* === Modal === */}
//       <Modal show={show} onHide={() => setShow(false)} centered scrollable>
//         <Modal.Header closeButton>
//           <Modal.Title>Your Booking Updates</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {userRequests.length === 0 ? (
//             <p className="text-muted text-center">No booking updates</p>
//           ) : (
//             <ListGroup>
//               {userRequests.map((req) => (
//                 <ListGroup.Item key={req.id}>
//                   <strong>{req.hotelName}</strong>
//                   <br />
//                   Status:{" "}
//                   <span
//                     style={{
//                       color:
//                         req.status === "approved"
//                           ? "green"
//                           : req.status === "rejected"
//                           ? "red"
//                           : "orange",
//                     }}
//                   >
//                     {req.status}
//                   </span>
//                   <br />
//                   People: {req.peopleBooked}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default UserNotification;
