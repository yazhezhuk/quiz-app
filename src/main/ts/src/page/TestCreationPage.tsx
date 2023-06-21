import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Card, Form, ListGroup} from "react-bootstrap";
import classes from './HelloPage.module.css';
import {Input} from "reactstrap";
import {queries} from "@testing-library/react";
import testInfoPage from "./TestInfoPage";


const testTest = {
    name: "База",
    theme: "yes",
    isGraded: false,
    questions: [
        {
            text: "Pes patron?", maxPoints: 1, answerOptions: [{
                text: "cringe", points: 0
            }, {
                text: "base", points: 0
            }]
        }, {
            text: "Trivoga?", maxPoints: 2, answerOptions: [{
                text: "cringe", points: 0
            }, {
                text: "base", points: 0
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

    useEffect(() => {
        //let test = JSON.parse(localStorage.getItem("test")??"")
        setTest(testTest)
        console.log("set")
        test.questions.forEach((question: any) => {
            answers.set(question.id, 0)
        })
        setLatestQuestionId(test.questions.length - 1);
    }, []);


    const uploadTestAnswers = () => {
        axios.post('/api/test/create/',test, {
                headers: {
                    Authorization: "Bearer "
                        + JSON.parse(sessionStorage.getItem("user") ?? "").token
                }
            })
                // .then(res => nav("/test/creator/overview/"+res.data))
               // .catch(err => console.error(err));
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
        console.log("New question" + event.currentTarget.id)

        test.questions = [...test.questions, {
            text: "", maxPoints: 1,
            answerOptions: []
        }]
        console.log(test.questions)
        setTest(test)
        setUpdate(true)
        setLatestQuestionId(latestQuestionId+1);
    }

    const addNewAnswerOption = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("New answer option" + event.currentTarget.id)
        let curr =  test.questions[event.currentTarget.id].answerOptions;
        test.questions[event.currentTarget.id].answerOptions = [...curr, {
            text: "",points:0
        }]
        console.log(test.questions)
        setTest(test)
        setUpdate(!update)
    }

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        test.theme = event.target.value as string;
    };

    const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("sdaasdsadasdasdas")
        test.questions[Number(event.target.id)].maxPoints = Number(event.target.value)
        test.questions[Number(event.target.id)].answerOptions.forEach((ao:any) => {
            if (ao.points !== 0)
                ao.points = Number(event.target.value)
        })
    };

    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Questid " + event.target.id)
        test.questions[Number(event.target.id)].text = event.target.value
    };

    const handleAnswerOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let key: { q: number, o: number } = JSON.parse(event.target.id)
        console.log("Questid " + key.q + " opt " + key.o)
        test.questions[key.q]
            .answerOptions[key.o]
            .text = event.target.value
    };

    const checkIfAnotherSelected = (questionId:number) => {
        const res = test.questions[questionId].answerOptions.reduce((acc:boolean,opt:any) => acc || opt.points!==0,false)
        console.log("is selected:" + res);
        return res;
    }

    const getAnswerIndex = (question: any) => {
        console.log(question.answerOptions.findIndex((ao: any) => ao.points!==0))
        return question.answerOptions.findIndex((ao: any) => ao.points!==0)
    }

    const handleTrueAnswerOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let key: { q: number, o: number } = JSON.parse(event.target.id)
        console.log("Questid " + key.q + " opt " + key.o)
        let option = test.questions[key.q].answerOptions[key.o];
        let question = test.questions[key.q];


        if (!checkIfAnotherSelected(key.q)) {
            console.log("Setting" )
            option.points = question.maxPoints
            setTest(test)
            setUpdate(!update)
        } else if (key.o !== getAnswerIndex(question)) {
            console.log(key.o + " " + getAnswerIndex(question))
            test.questions[key.q]
                .answerOptions[getAnswerIndex(question)]
                .points = 0
            option.points = question.maxPoints
            setTest(test)
            setUpdate(!update)
        }
        else {
            option.points = 0
            setTest(test)
            setUpdate(!update)
        }
    };

    const isEnabled = (qId: number, oId: number): boolean => {
        return answers.get(qId) !== 0 || answers.get(qId) === oId
    }

    const handleGradingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsGraded(!isGraded);
    }

    return (
        <div className="w-100 d-flex">
                        <ListGroup className="w-100 bg-light rounded-4 navbar-nav-scroll">
                            <div className="d-flex flex-row p-2">
                                <img onClick={() => nav("/choose")} className="w-8 m-3" src={require("../icons/left-arrow.png")} alt="1"></img>
                                <button className="w-1/6 min-w-fit rounded-5 p-2 h5 border-2 border-black border-opacity-100 font-semibold ms-auto align-self-end justify-content-center" onClick={uploadTestAnswers}>Відправити</button>

                            </div>
                            <input onChange={handleThemeChange} placeholder="Тема сесії" className="m-4 text-dark-700 bg-light text-xl ps-3 mb-1 font-semibold align-self-start w-50 d-flex "></input>
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
                                                    id={index}
                                                    placeholder="0"
                                                    type="number"
                                                    onChange={handleGradeChange}
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
                                                    id={JSON.stringify({q: index, o: optionIndex % question.answerOptions.length}) ?? 1}
                                                    onChange={handleTrueAnswerOptionChange}
                                                    checked={optionIndex === getAnswerIndex(question)}/>
                                                    <Input id={JSON.stringify({q: index, o: optionIndex % question.answerOptions.length } ?? 1)} onChange={handleAnswerOptionChange} className="w-auto p-0"></Input>
                                                </Form.Label>

                                            ))}

                                        </Form>
                                        <Button id={index} onClick={addNewAnswerOption} className="d-flex justify-content-center rounded-5 w-10 align-self-center">+</Button>

                                    </ListGroup.Item>
                                </div>


                            ))}
                            <Button onClick={addNewQuestion} className="d-flex p-2 m-4 rounded-4 justify-content-center w-22 align-self-center">Додати запитання</Button>
                        </ListGroup></div>
    );
};

export default TestCreationPage;