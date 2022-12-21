import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axiosInstance from "./AxiosInstance";
import { useNavigate} from "react-router-dom";
import AuthContext from "../Utilities/Context";
import Alert from 'react-bootstrap/Alert';


const Login = () => {

    //hook for setting context that user is logged in
    const authCtx = useContext(AuthContext);

    //hook for redirecitng after login
    let navigate = useNavigate();

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

        axiosInstance.post(
            'login/', {
                username: form.username,
                password: form.password,
            }

        )
        .then((res) => {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = 
            'JWT ' + localStorage.getItem('access_token');
            authCtx.login(localStorage.getItem('access_token'))
            navigate('/');
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
                        {errors && <Alert className='my-2' variant={'danger'}>Nieprawidłowe dane logowania</Alert>}
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