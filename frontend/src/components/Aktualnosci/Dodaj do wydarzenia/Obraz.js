import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

function Obraz(props) {
  // Show - Hide - Modal on WydarzenieOsobno component
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // state for Form - form - storing form data, and isLoading - display when data is loading, error - handling errors
  const [form, setForm] = useState([{
    image: '',
    wydarzenie: props.wydarzenie
  }])
  const [errors, setErrors] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    let newImage = [{...form}];

    for(let i = 0; i <  e.target.files.length; i++){
      newImage.push({'image': e.target.files[i],
      'wydarzenie':props.wydarzenie})
    };
    setForm(newImage)
  }
  let formForm = new FormData()
  for(let i = 1; i < form.length; i++){
    console.log(form[i].image)
    formForm.append('image', form[i].image)
    formForm.append('wydarzenie', props.wydarzenie)
  }
  
  const handleSubmit = (event) => {
    setIsLoading(true);
    props.setAddedImage(false)
    event.preventDefault()
    
      axios({
        method: "POST",
        url: "/api/photos/",
        data: formForm,
        headers: {
            "Content-Type": "multipart/form-data",
        },
      })
      .then(()=>{
        setIsLoading(false)
        props.setAddedImage(true)
        handleClose()
      })
      .catch((error) => {
        setErrors(error);
      })
    
    setIsLoading(false);
  };

  return (
    <>
      <Button variant="primary" className="mb-3" onClick={handleShow}>
        Dodaj zdjęcia
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Galeria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form id='addphoto'>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Dodaj zdjęcia do galerii</Form.Label>
                <Form.Control 
                type="file" 
                accept="image/jpeg,image/png,image/gif"
                name='image'
                onChange={(e) => {handleImageChange(e)}}
                isInvalid={!!errors}/>
                <Form.Control.Feedback type='invalid'>
                    {errors}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        {errors && <Alert className='my-2 ' variant={'danger'}>Wystąpił błąd</Alert>}
           <Button variant="primary" form='addphoto' type="submit" onClick={handleSubmit}>
                Dodaj zdjęcia
              </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Obraz;