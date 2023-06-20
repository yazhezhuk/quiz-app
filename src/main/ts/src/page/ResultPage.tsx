import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Card, Form, ListGroup} from "react-bootstrap";
import classes from './HelloPage.module.css';
import {Chart} from "react-google-charts";
import {data} from "autoprefixer";


const testTest = {
    name: "База",
    theme: "yes",
    author: "Zheka Bukur",
    answer: [
        {
            id: 1, text: "Pes patron?", grade: 2, answerOptions: [{
                text: "cringe", id: 1, isTrue: true, percent: 85
            }, {
                text: "base", id: 2, isTrue: false, percent: 15
            }]
        }, {
            id: 2, text: "Trivoga?", grade: 2, answerOptions: [{
                text: "cringe", id: 3, isTrue: true, percent: 34
            }, {
                text: "base", id: 4, isTrue: false, percent: 66
            }]
        }
    ]
}

const ResultPage: React.FC = () => {
    const nav = useNavigate();
    const [test, setTest] = useState<any>(testTest);
    const [answers, setAnswers] = useState(new Map<number, number>());

    useEffect(() => {

        setTest(testTest)
        console.log("set")
        test.questions.forEach((question: any) => {
            answers.set(question.id, 0)
        })
    }, []);


    const getData = (questionId: number) =>{
        let data = [["question","percent"]]
        test.questions[questionId].answerOptions.map((answerOption: any) => {
            console.log([answerOption.text, answerOption.percent])
            data = data.concat([[answerOption.text, answerOption.percent]])
        })
        console.log(data)
        return data
    }


    return (
        <div className="container vh-100 vw-75 d-flex flex-column  align-content-center w-75">
            <div className="row d-flex w-90 justify-content-center mt-auto mb-auto align-content-center">
                {test === undefined ?
                    <h4>Loading...</h4>
                    :
                    <>
                        <ListGroup className="bg-light rounded-4">
                            <div className="d-flex flex-row">
                                <img onClick={() => nav("/main")} className="w-8 m-3" src={require("../icons/left-arrow.png")} alt="1"></img>
                                <p className="font-normal ms-auto me-auto d-flex justify-self-center align-self-center h3">'{test.name}'</p>
                            </div>
                            <p className="font-light h3 ms-5 justify-self-end align-self-center">Результати учасників:</p>

                            <p className="d-flex ps-5 h5 mb-0 font-bold">Запитань: {test.questions.length}</p>
                            {test.questions.map((question: any, index: any) => (

                                <div className="p-5 mt-1 pt-1">
                                    <ListGroup.Item className="d-flex shadow-md hover:shadow-lg flex-column">

                                        <Card className="w-28 border-4 align-self-end">Питання {index + 1}</Card>
                                        <div className="d-flex pt-2 pb-0 justify-content-between w-100 flex-row">
                                            <p className="text-dark-700 m-0 text-xl">{question.text}</p>
                                            <Card
                                                className="bg-secondary bg-opacity-10 w-16 text-xs mb-0 mt-2 h-75">{question.grade} Бали</Card>
                                        </div>
                                        <hr className="bg-gray-700 border-2 mt-0"/>
                                        <Form className="d-flex flex-wrap flex-row justify-content-evenly">
                                            <div className="d-flex w-50 mt-3 flex-column">
                                                {question.answerOptions.map((option: any, optionIndex: any) => (
                                                    <p className={"w-75 m-1 justify-content-baseline font-light text-lg d-flex flex-row " + (option.isTrue ? classes.green : "")}> {optionIndex + 1}. {option.text}
                                                        {(option.isTrue ? " ✓" : "")}</p>
                                                ))}
                                            </div>
                                            <Chart
                                                chartType="PieChart"
                                                data={getData(index)}
                                                options={{title:""}}
                                                width={"40%"}
                                                height={"25%"}

                                                className="w-100 d-flex mt-0 align-self-end"
                                            />
                                        </Form>

                                    </ListGroup.Item>
                                </div>


                            ))}
                            <button className={classes.button + " w-25 mb-5 rounded-4 p-3 h5 font-semibold d-flex align-self-center justify-content-center"} >Меню результатів</button>
                        </ListGroup></>
                }
            </div>
        </div>
    );
};

export default ResultPage;