import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axiosInstance from "./AxiosInstance";
import { useNavigate} from "react-router-dom";
import Alert from 'react-bootstrap/Alert';


const Register = () => {

    //redirecting after registering
    let navigate = useNavigate();

    //states for loading when fetching data and catching errors from fetching
    const [errors, setErrors] = useState();
    const [isLoading, setIsLoading] = useState(false);

    //state for alert - success register
    const [success, setSuccess] = useState(false);

    // states for password, email and username to create User
    const [form, setForm] = useState({
        password: '',
        username: '',
        email: '',
    })

    // handlers for password, email and username to create User
    const handleUsername = (e) => {
        setForm({
            ...form,
            username: e.target.value,
        })
    }

    const handleEmail = (e) => {
        setForm({
            ...form,
            email: e.target.value,
        })
    }

    const handlePassword = (e) => {
        setForm({
            ...form,
            password: e.target.value,
        })
    }



    const handleSubmit = (e) => {
        setIsLoading(true);
        setSuccess(false)
        setErrors()
        e.preventDefault()

        axiosInstance.post(
            'register/', {
                email: form.email,
                username: form.username,
                password: form.password,
            }

        )
        .then(() => {
            setSuccess(true)
            setForm({
                password: '',
                username: '',
                email: '',
            })
            setIsLoading(false);
        })
        .catch((error) => {
            setErrors(error)
        })
       
    }



    return (
        <>
            <Row className="justify-content-md-center">
                <Col  lg="4" md='6' xs='8'>
            <Form>
                        <Form.Group className="mb-3 mt-3">
                    <Form.Label>Nazwa uzytkownika</Form.Label>
                    <Form.Control type="text" value={form.username} placeholder="Nazwa uzytkownika" onChange={(e) => {
                        handleUsername(e);
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={form.email} placeholder="Podaj email" onChange={(e) => {
                        handleEmail(e);
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" value={form.password} placeholder="Hasło" onChange={(e) => {
                        handlePassword(e);
                    }} />
                </Form.Group>
                {errors && <Alert className='my-2 ' variant={'danger'}>Wystąpił błąd</Alert>}
                {success && <Alert className='mt-2' variant={'success'}>Pomyślnie zarejestrowano użytkownika</Alert>}
                        <Button className="me-3" variant="primary" type="submit" onClick={handleSubmit}>
                    Zarejestruj się
                </Button>
            </Form>
                </Col>
            </Row>
        </>
    )
}

export default Register