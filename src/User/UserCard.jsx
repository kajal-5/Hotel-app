import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import "./style/UserCard.css";

const UserCard = ({ hotel, selected, setSelected, handleBook }) => {
  return (
    <Card className="user-card h-100">
      <Card.Img
        variant="top"
        src={hotel.img || "https://via.placeholder.com/400x250"}
        className="user-card-img"
      />

      <Card.Body>
        <Card.Title className="mb-2">{hotel.name}</Card.Title>
        <Card.Text className="user-card-desc">{hotel.description}</Card.Text>

        <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
          <Form.Select
            style={{ width: "120px" }}
            value={selected[hotel.id]?.qty || 1}
            onChange={(e) =>
              setSelected({
                ...selected,
                [hotel.id]: {
                  ...selected[hotel.id],
                  qty: Number(e.target.value),
                },
              })
            }
          >
            {Array.from({
              length: Math.max(
                1,
                hotel.availablePeople ?? hotel.totalPeople ?? 1
              ),
            }).map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} person
              </option>
            ))}
          </Form.Select>
          <p className="text-muted mt-2 mb-0">
            Available: {hotel.availablePeople ?? hotel.totalPeople ?? 0}
          </p>

          <strong className="price">₹{hotel.price}</strong>
        </div>

        <Form.Control
          type="date"
          className="user-date"
          value={selected[hotel.id]?.date || ""}
          onChange={(e) =>
            setSelected({
              ...selected,
              [hotel.id]: {
                ...selected[hotel.id],
                date: e.target.value,
              },
            })
          }
        />

        <Button className="btn-primary w-100"  onClick={() => handleBook(hotel)}>
          Book / Request
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
