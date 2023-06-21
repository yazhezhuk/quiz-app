import "bootstrap/dist/css/bootstrap.min.css";
import {Card, Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Test from "../models/Test";
import classes from './MainPage.module.css';
import {Input} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";

const testTest = {
    id: 1,
    name: "База",
    theme: "yes",
    author: "Zheka Bukur",
    authCode: "sddsdsadadasdsadsdasdas",
    registered: 1,
    completed: 1
}
const TestInfoPage: React.FC = () => {
    const {testId} = useParams()
    const [test,setTest] = useState<any>(testTest)
    const nav = useNavigate();
    useEffect( () => {
        // Fetch lots from API
        axios.get('/api/test/overview/' + testId, {
                headers: {
                    Authorization: "Bearer "
                        + JSON.parse(sessionStorage.getItem("user") ?? "").token
                }
            }
        )
            .then(response => {
                setTest(response.data)
            })
            .catch(error => console.log(error));
    },[])


    return (
        <div className="ms-auto me-auto text-white align-self-center mb-40 w-75 justify-content-center">
            <div className={"p-5 " + classes.name}>{JSON.parse(sessionStorage.getItem("user") ?? "{}").user.name} </div>

            <div className={'row pb-4 text-white pt-0'}>
                <div className="d-flex text-white flex-row p-2 pt-0">
                    <img onClick={() => nav("/choose")} className="w-8 m-3" src={require("../icons/left-arrow.png")} alt="1"></img>

                </div>
                <div className={classes.enterText + " text-white  text-md ms-2"}>Тема: {test.name}</div>
                <div className={classes.enterText + " text-white  text-sm  ms-2"}>Зареєстровано: {test.registered}</div>
                <div className={classes.enterText + " text-white text-sm ms-2"}>Виконало: {test.completed}</div>

                <div className="text-white me-auto mt-3">
                    <text
                           className={'bg-transparent text-red-500 me-auto text-xs  border-black p-1 rounded-3 w-100 ms-2 ps-2' + classes.placeholder}>
                        Код аутентифікації: {test.authCode}</text>
                </div>
                <div className="d-flex flex-row mt-3 justify-content-center w-100">
                    <div className="rounded-3 w-50 me-3 bg-yellow-200">
                        <Button className="d-flex ms-auto me-auto" variant="" onClick={() => nav("/test/creator/result/"+testId)}>Кругові діаграми</Button>
                    </div>
                    <div className="rounded-3 w-50 border-amber-200 text-amber-200 border-2 bg-transparent">
                        <Button  className="d-flex text-amber-200 bg-transparent ms-auto me-auto" variant="" onClick={() => nav("/test/creator/result/"+ testId +"/list")}>Таблиця</Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TestInfoPage;