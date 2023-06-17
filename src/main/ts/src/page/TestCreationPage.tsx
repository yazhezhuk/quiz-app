import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Card, Form, ListGroup} from "react-bootstrap";
import classes from './HelloPage.module.css';
import {Input} from "reactstrap";
import {queries} from "@testing-library/react";


const testTest = {
    name: "База",
    theme: "yes",
    isGraded: false,
    author: "Zheka Bukur",
    questions: [
        {
            id: 1, text: "Pes patron?", grade: 2, answerOptions: [{
                text: "cringe", id: 1, grade: 1
            }, {
                text: "base", id: 2
            }]
        }, {
            id: 2, text: "Trivoga?", grade: 2, answerOptions: [{
                text: "cringe", id: 3
            }, {
                text: "base", id: 4
            }]
        }
    ]
}

const TestCreationPage: React.FC = () => {
    const nav = useNavigate();
    const [test, setTest] = useState<any>(testTest);
    const [update,setUpdate] = useState(false);
    const [answers, setAnswers] = useState(new Map<number, number>());
    const [isGraded,setIsGraded] = useState(false);
    const [latestQuestionId,setLatestQuestionId] = useState(0);
    const [latestAnswerId,setLatestAnswerId] = useState(0);

    useEffect(() => {
        //let test = JSON.parse(localStorage.getItem("test")??"")
        setTest(testTest)
        console.log("set")
        test.questions.forEach((question: any) => {
            answers.set(question.id, 0)
        })
        setLatestQuestionId(test.questions.length - 1);
        setLatestAnswerId(test.questions[test.questions.length - 1].answerOptions.at(-1).id)
    }, []);


    const uploadTestAnswers = () => {
        answers.forEach((option, question) => {
            if (option === 0)
                return
            axios.post('/api/test/answer/' + question + '/with/' + option, {}, {
                headers: {
                    Authorization: "Bearer "
                        + JSON.parse(sessionStorage.getItem("user") ?? "").token
                }
            })
                .then(res =>
                    axios.post('/api/test/end/' + test.id, {}, {
                        headers: {
                            Authorization: "Bearer "
                                + JSON.parse(sessionStorage.getItem("user") ?? "").token
                        }
                    })
                )
                .catch(err => console.log(err));

        });
    }


    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let key: { q: number, o: number } = JSON.parse(event.target.id)
        if (answers.get(key.q) !== 0) {
            answers.set(key.q, 0);
            setAnswers(answers)
            return;
        }
        answers.set(key.q, key.o);
        setAnswers(answers)

    }

    const addNewQuestion = (event: React.MouseEvent<HTMLButtonElement>) => {
        test.questions = [...test.questions, {
            id: latestQuestionId, text: "", grade: 0,
            answerOptions: []
        }]
        console.log(test.questions)
        setTest(test)
        setUpdate(true)
        setLatestQuestionId(latestQuestionId+1);
    }

    const addNewAnswerOption = (event: React.MouseEvent<HTMLButtonElement>) => {
        let curr =  test.questions[event.currentTarget.id].answerOptions;
        test.questions[event.currentTarget.id].answerOptions = [...curr, {
            id: latestAnswerId, text: ""
        }]
        console.log(test.questions)
        setTest(test)
        setUpdate(true)
        setLatestAnswerId(latestAnswerId+1);
    }

    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        test.questions[Number(event.target.id)].text = event.target.value
    };

    const isEnabled = (qId: number, oId: number): boolean => {
        return answers.get(qId) !== 0 || answers.get(qId) === oId
    }

    const handleGradingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsGraded(!isGraded);
    }

    return (
        <div className="container scroll-smooth vw-100 vh-100 d-flex flex-column  align-content-center  w-100">
            <div className="row d-flex  w-90 justify-content-center mt-auto mb-auto align-content-center ">
                {test === undefined ?
                    <h4>Loading...</h4>
                    :
                    <>
                        <ListGroup className="bg-light rounded-4 navbar-nav-scroll">
                            <div className="d-flex flex-row p-2">
                                <img onClick={() => nav("/main")} className="w-8 m-3" src={require("../icons/left-arrow.png")} alt="1"></img>
                                <button className="w-1/6 rounded-5 p-2 h5 border-2 border-black border-opacity-100 font-semibold ms-auto align-self-end justify-content-center" onClick={uploadTestAnswers}>Відправити</button>

                            </div>
                            <input placeholder="Тема сесії" className="m-4 text-dark-700 bg-light text-xl ps-3 mb-1 font-semibold align-self-start w-50 d-flex "></input>
                            <hr className="h-px rounded-5 border-2 border-dark opacity-100 m-4 mb-0 mt-0"/>
                            <Form.Label className="align-self-baseline pb-1  d-flex m-4">Ввімкнути оцінювання<Form.Check onChange={handleGradingChange} type="switch"></Form.Check></Form.Label>


                            <p className="d-flex ps-4 h5 mb-0 font-bold">Запитань: {test.questions.length}</p>
                            {test.questions.map((question: any, index: any) => (

                                <div className="p-4 pt-1">
                                    <ListGroup.Item className="d-flex shadow-md hover:shadow-lg flex-column">

                                        <Card className="w-28 border-4 align-self-end">Питання {index + 1}</Card>
                                        <div className="d-flex pt-2 pb-0 justify-content-between w-100 flex-row">
                                            <input id={index} onChange={handleQuestionChange} className="text-dark-700 m-0 text-xl"></input>

                                            {   isGraded?
                                                <Form.Label className="d-flex m-0 align-items-baseline font-semibold">Бали:
                                                <input
                                                    placeholder="0"
                                                className="bg-secondary align-content-center justify-content-center ps-4 m-0 bg-opacity-10 w-16 text-xs h-75"></input>
                                                </Form.Label>:
                                                null

                                            }
                                        </div>
                                        <hr className="bg-gray-700 border-2 mt-0"/>
                                        <Form className="d-flex justify-content-evenly flex-column">

                                            {question.answerOptions.map((option: any, optionIndex: any) => (
                                                <Form.Label className="d-flex align-items-baseline flex-row">
                                                <Form.Check
                                                    type="checkbox"
                                                    className="w-10"
                                                    id={JSON.stringify({q: question.id, o: option.id}) ?? 1}
                                                    onChange={handleCheckChange}
                                                    disabled={isEnabled(question.id, option.id)}/>
                                                    <Input id={option.id} className="w-auto p-0"></Input>
                                                </Form.Label>

                                            ))}

                                        </Form>
                                        <Button id={index} onClick={addNewAnswerOption} className="d-flex justify-content-center rounded-5 w-10 align-self-center">+</Button>

                                    </ListGroup.Item>
                                </div>


                            ))}
                            <Button onClick={addNewQuestion} className="d-flex p-2 m-4 rounded-4 justify-content-center w-22 align-self-center">Додати запитання</Button>
                        </ListGroup></>
                }
            </div>
        </div>
    );
};

export default TestCreationPage;