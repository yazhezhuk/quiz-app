import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Test from "../models/Test";
import classes from './MainPage.module.css';
import {Input} from "reactstrap";
import {useNavigate} from "react-router-dom";



const HomePage: React.FC = () => {
    const [tests, setTests] = useState<Test[]>([]);
    const [key, setKey] = useState("");
    const navigate = useNavigate();

        const onEnterClick = () => {
            // Fetch lots from API
            axios.post('/api/test/start/',{authenticator: key},{headers:{Authorization: "Bearer "
                        + JSON.parse(sessionStorage.getItem("user")??"").token
            }}
            )
                .then(response => {
                    localStorage.setItem("test",JSON.stringify(response.data));
                    navigate("/test/session/")

                })
                .catch(error => console.log(error));
        }
    const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKey(event.target.value);
    };


    return (
        <div className="container w-50 justify-content-center">
            <div className={"p-5 " + classes.name}>ПАвлов Олександр Андрійович </div>

            <div className={'row pb-5 pt-3 ' + classes.bg}>
                <div className={classes.enterText}>Вхід у сесію</div>

                <Input onChange={handleKeyChange} placeholder="Код-ідентифікатор" className={'w-75 ' + classes.placeholder}></Input>
                <Button onClick={onEnterClick} className={'mt-4 ' + classes.button}>Вхід</Button>

            </div>
        </div>
    );
}

export default HomePage;