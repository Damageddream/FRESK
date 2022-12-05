import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = () => {

    //states for loading when fetching data and catching errors from fetching
    const [errors, setErrors] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // states for password, username to login User
    const [form, setForm] = useState({
        password: '',
        username: '',
    })

    // handlers for password, email and username to login User
    const handleUsername = (e) => {
        setForm({
            ...form,
            username: e.target.value,
        })
    }


    const handlePassword = (e) => {
        setForm({
            ...form,
            password: e.target.value,
        })
    }

    //passing data from form into FormData to handle login
    let formForm = new FormData()

    formForm.append('password', form.password)
    formForm.append('username', form.username)


    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault()

        axios({
            method: 'POST',
            url: '/api/login/',
            data: formForm,
            headers: {
                Authorization: localStorage.getItem('acces_token')
                    ? 'JWT ' + localStorage.getItem('acces_token') : null,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },

        }).then((res) => {
            localStorage.setItem('acces_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh)

        })
        .catch((error) => {
            setErrors(error)
        })  
        setIsLoading(false);
    }


    return (
        <>
            <Row className="justify-content-md-center">
                <Col  lg="4" md='6' xs='8'>
                    <Form>
                        <Form.Group className="mb-3 mt-3">
                            <Form.Label>Nazwa uzytkownika</Form.Label>
                            <Form.Control type="text" placeholder="Nazwa uzytkownika" onChange={(e) => {
                                handleUsername(e);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="password" placeholder="Hasło" onChange={(e) => {
                                handlePassword(e);
                            }} />
                        </Form.Group>
                        <Button className="me-3" variant="primary" type="submit" onClick={handleSubmit}>
                            Zaloguj się
                        </Button>
                        <Button variant="secondary">
                            Wróć
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Login