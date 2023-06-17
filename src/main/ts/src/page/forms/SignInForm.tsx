import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import classes from "../../Test.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface SignUpProps {
    show: boolean;
    onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ show, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/auth/signin',{email,password})
            .then(response => {
                sessionStorage.setItem("user",JSON.stringify(response.data))
                navigate("/main")
            })
            .catch(error => console.log(error));
        console.log('Signing up...', email, password);

        onClose();
    };

    return (
        <div className={classes.field} hidden={show} onAbort={onClose}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Ввійти
                </Button>
            </Form>
        </div>
    );
};

export default SignUp;