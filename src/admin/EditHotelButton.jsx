import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./style/AddHotelButton.css";

const EditHotel = ({ show, onClose, form, setForm, onSave }) => {
  return (
    <Modal show={show} onHide={onClose} centered contentClassName="my-modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Edit Hotel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSave}>
          <Form.Group className="mb-2 form-group">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2 form-group">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              value={form.img}
              onChange={(e) => setForm({ ...form, img: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2 form-group">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2 form-group">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2 form-group">
            <Form.Label>Total People</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={form.people}
              onChange={(e) =>
                setForm({ ...form, people: Number(e.target.value) })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-2 form-group">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              min={500}
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
          </Form.Group>

          <div className="text-end">
            <Button onClick={onClose} className="me-2">
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditHotel;
