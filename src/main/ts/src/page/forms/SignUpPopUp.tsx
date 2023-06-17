import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import classes from "../../Test.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

interface SignUpProps {
    show: boolean;
    onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ show, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/auth/signup',{
            firstname: name,lastname: name,email,password})
            .then(response => {
                sessionStorage.setItem("user",response.data)
            })
            .catch(error => console.log(error));
        console.log('Signing up...', email, password,name,name);

        onClose();
    };

    return (
        <div className={classes.field} hidden={show} onAbort={onClose}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </Form.Group>

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

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Зареєструватися
                </Button>
            </Form>
        </div>
    );
};

export default SignUp;