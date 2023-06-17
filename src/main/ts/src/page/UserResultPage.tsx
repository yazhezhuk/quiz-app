import React, {useEffect, useState} from "react";
import axios from "axios";
import Test from "../models/Test";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Form, ListGroup} from "react-bootstrap";
import classes from './HelloPage.module.css';
import any = jasmine.any;


const testTest = {
    name: "База",
    theme: "yes",
    author: "Zheka Bukur",
    questions: [
        {
            id: 1, text: "Pes patron?", grade: 2, answerOptions: [{
                text: "cringe", id: 1, selected: false
            }, {
                text: "base", id: 2, selected: false
            }]
        }, {
            id: 2, text: "Trivoga?", grade: 2, answerOptions: [{
                text: "cringe", id: 3, selected: false
            }, {
                text: "base", id: 4, selected: false
            }]
        }
    ]
}

const UserResult: React.FC< {test: any} > = (props: {test:any}) => {
    const nav = useNavigate();

    const getAnswer = (question: any) => {
        return question.answerOptions.filter((ao: any) => ao.selected)[0]
    }

    useEffect(() => {
        axios.get('/api/test/result/' + props.test.id, {
            headers: {
                Authorization: "Bearer "
                    + JSON.parse(sessionStorage.getItem("user") ?? '{"token":"yes"}').token
            }
        }).then(res => {
            props.test = {...props.test,grade: res.data.grade }
        })
    },[props])


    // const isEnabled = (qId: number, oId: number): boolean => {
    //     return answers.get(qId) !== 0 || answers.get(qId) === oId
    // }

    return (
        <div className="container vh-100 vw-100 d-flex flex-column  align-content-center w-100">
            <div className="row d-flex w-90 justify-content-center mt-auto mb-auto align-content-center">
                {test === undefined ?
                    <h4>Loading...</h4>
                    :
                    <>
                        <ListGroup className="bg-light rounded-4">
                            <div className="d-flex flex-row">
                                <img onClick={() => nav("/main")} className="w-8 m-3" src={require("../icons/left-arrow.png")} alt="1"></img>
                                <p className="font-normal ms-auto me-auto d-flex justify-self-end align-self-center h3">'{props.test.name}'</p>
                            </div>
                            <p className="font-light justify-self-end align-self-center">Творець:{props.test.author}</p>

                            <p className="d-flex ps-4 h5 mb-0 font-bold">Запитань: {props.test.questions.length}</p>
                            <p className="d-flex ps-4 h5 mb-0 font-bold">Бал: {props.test.grade}</p>

                            {props.test.questions.map((question: any, index: any) => (

                                <div className="p-4 pt-1">
                                    <ListGroup.Item className="d-flex shadow-md hover:shadow-lg flex-column">

                                        <Card className="w-28 border-4 align-self-end">Питання {index + 1}</Card>
                                        <div className="d-flex pt-2 pb-0 justify-content-between w-100 flex-row">
                                            <p className="text-dark-700 m-0 text-xl">{question.text}</p>
                                            <Card
                                                className="g-secondary bg-opacity-10 w-16 text-xs mb-0 mt-2 h-75">{question.grade} Бали</Card>
                                        </div>
                                        <hr className="bg-gray-700 border-2 mt-0"/>
                                        <Form className="d-flex justify-content-evenly flex-column">

                                            {question.answerOptions.map((option: any, optionIndex: any) => (
                                                <Form.Check
                                                    type="checkbox"
                                                    className="w-10"
                                                    label={option.text}
                                                    id={JSON.stringify({q: question.id - 1, o: optionIndex}) ?? 1}
                                                    onClick={handleCheckChange}
                                                    checked={option.selected}
                                                />
                                            ))}
                                        </Form>
                                    </ListGroup.Item>
                                </div>


                            ))}
                            <button className={classes.button + " w-25 mb-5 rounded-4 p-3 h5 font-semibold d-flex align-self-center justify-content-center"} onClick={uploadTestAnswers}>Відправити</button>
                        </ListGroup></>
                }
            </div>
        </div>
    );
};

export default UserResult;