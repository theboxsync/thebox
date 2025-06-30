import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function RemoveSpecialModal({ show, handleClose, data, fetchMenuData }) {
    const removeSpecialDish = (id) => {
        axios
          .put(`${process.env.REACT_APP_MANAGER_API}/menu/removespecialdish/${id}`)
          .then((res) => {
            console.log(res.data);
            handleClose();
            fetchMenuData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header >
        <Modal.Title>Remove Special Dish</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        >x</button>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want Remove this dish as a Special Dish?</h5>
        <input type="hidden" name="special_dish_id" id="special_dish_id" />
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
        </Button>
        <Button variant="dark" onClick={() => removeSpecialDish(data._id)}>
          <img src="../../dist/img/approve.svg" alt="Remove" /> Yes, Remove
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveSpecialModal
