import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import RichText from '../Utilities/RichText'
import "../Utilities/RichText.css";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';


const DodajWydarzenie = (props) => {

  //state for showing - hidding modal
  const [show, setShow] = useState(false);

  //functions for showing - hidding modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  

  //states for loading when fetching data and catching errors from fetching
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);


  //state for storing data from form before submit 'on change'
  const [form, setForm] = useState({
    poster: "fresk",
    title: "",
    title_image: "",
    content_preview: "",
  });
  //state for storing data from rich editor
  const [editorData, setEditorData] = useState({
    content: ''
  })

  //catching data from onchange - title and updating form
  const handleTitleChange = (e) => {
    setForm({
      ...form,
      title: e.target.value,
    });
  };
  //catching data from onchange - title_image and updating form
  const handleTitle_imageChange = (e) => {
    setForm({
      ...form,
      title_image: e.target.files[0],
    });
  };
  //catching data from onchange - content and updating form
  const handleContentChange = (e) => {
    setEditorData({
      content: e,
    });
  };
  //catching data from onchange - content_preview and updating form
  const handleContent_previewChange = (e) => {
    setForm({
      ...form,
      content_preview: e.target.value,
    });
    
  };

  //passing data from form into FormData to handle image formatting
  let formForm = new FormData()
  
  formForm.append('title', form.title)
  formForm.append('title_image', form.title_image)
  formForm.append('content', editorData.content)
  formForm.append('content_preview', form.content_preview)

  // function for posting all data from form into backend
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault()
    props.setAddeddWydarzenie(false)

    axios({
      method: 'POST',
      url: '/api/aktualnoscis/',
      data: formForm,
      headers: {
        "Content-Type": "multipart/form-data"
      }})
      .then(()=>{
        setIsLoading(false);
        props.setAddeddWydarzenie(true)
        handleClose()

      })
    .catch((error) => {
      setErrors(error)
    })
  }


  return (
    <>
      <Button className='mt-5' style={{ width: "20rem" }} variant="success" onClick={handleShow}>
        Dodaj Wydarzenie
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Dodaj Wydarzenie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addwydarzenie">
            <Form.Group className="mb-3">
              <Form.Label>Tytuł</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wprowadź tytuł..."
                onChange={(e) => {
                  handleTitleChange(e);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formFileSingle" className="mb-3">
              <Form.Label>Dodaj zdjęcia do galerii</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg,image/png,image/gif"
                name="image"
                onChange={(e) => {
                  handleTitle_imageChange(e);
                }}
                isInvalid={false}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Zapowiedź</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Napisz zapowiedź..."
                onChange={(e) => {
                  handleContent_previewChange(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Napisz tekst wydarzenia</Form.Label>
              <RichText
                getData={handleContentChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        {errors && <Alert className='my-2 ' variant={'danger'}>Wystąpił błąd, sprawdź czy wszystko uzupełniłeś</Alert>}
          <Button
            variant="primary"
            type="submit"
            form="addwydarzenie"
            onClick={handleSubmit}
          >
            Dodaj wydarzenie
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DodajWydarzenie;
