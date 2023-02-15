import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';

function Add(props) {
  const [formValues, setFormValues] = useState({
    id: 0,
    description: "",
    completed: false,
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    const newState = { ...formValues };
    console.log(event.target.name)
    console.log(event.target.value)

    if (event.target.name === "completed") {
      newState[event.target.name] = !formValues.completed;
    } else {
      newState[event.target.name] = event.target.value;
    }

    setFormValues(newState);
  };

  const submitHandler = (event) => {
    // prevent the submit from changing the url 
    event.preventDefault()
    // call the onsubmit function which comes from props
    props.onSubmit(formValues)
    // reset the form
    setFormValues({
      id: 0,
      description: "",
      completed: false,
    });
    setShowAlert(true); // show the alert after form submission
  }

  return (
    <div>
      <Alert variant="success" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
        Task added!
      </Alert>
      <Form onSubmit={(event) => submitHandler(event)}>
        <Form.Group controlId="taskID">
          <Form.Label>Task ID</Form.Label>
          <Form.Control
            name="id"
            type="number"
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>

        <Form.Group controlId="taskDescription">
          <Form.Label> Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>

        <Form.Group controlId="complete">
          <Form.Check
            type="checkbox"
            id="complete"
            label="Completed?"
            name="completed"
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default Add;