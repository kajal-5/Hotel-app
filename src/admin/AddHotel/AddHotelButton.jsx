import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addHotel } from "../../store/HotelSlice";

const AddHotel = ({ buttonVariant = "primary", buttonText = "+ Add Hotel" }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    img: "",
    pincode: "",
    city:"",
    people: 1,
    price: 500,

  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      addHotel({
        name: form.name,
        img: form.img,
        pincode: form.pincode,
        city: form.city,
        totalPeople: form.people,
        price: form.price,
      })
    );
    setShow(false);
    setForm({ name: "", img: "", pincode: "",city:"", people: 1, price: 500 });
  };

  return (
    <>
      <Button variant={buttonVariant} onClick={() => setShow(true)}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                value={form.img}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
              />
            </Form.Group>


            <Form.Group className="mb-2">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="number"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </Form.Group>            

            <Form.Group className="mb-2">
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

            <Form.Group className="mb-2">
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
              <Button
                variant="secondary"
                onClick={() => setShow(false)}
                className="me-2"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddHotel;
