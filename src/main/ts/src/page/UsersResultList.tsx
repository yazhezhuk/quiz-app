import React, {useEffect, useState} from "react";
import {ListGroup, ListGroupItem, Tab, Table} from "react-bootstrap";
import {Row} from "reactstrap";
import axios from "axios";
import {useParams} from "react-router-dom";

const ress = {
    name: "Cringe",
    questionCount: 3,
    results: [{username: "Zheka BuB", userId: 1, grade: 75}]
}

export const UsersResultList: React.FC = () => {
    const {testId} = useParams();
    const [userResults, setUserResults] = useState<any>(ress);

    useEffect(() => {
        axios.get('/api/test/result/' + testId + "/users", {
            headers: {
                Authorization: "Bearer "
                    + JSON.parse(sessionStorage.getItem("user") ?? '{"token":"yes"}').token
            }
        }).then(res => {
            console.log(res.data)
            setUserResults(res.data)
        }).catch(err => {})
    }, [])

    return (
        <div className="w-100 h-75 col d-flex flex-column bg-white">
            <div className="d-flex flex-row p-2">
                <img className="w-8 m-3" src={require("../icons/left-arrow.png")} alt="1"></img>
            </div>
            <div className="d-flex ms-auto  me-auto w-75 flex-column">
                <span className="mb-2">Максмальна кількість балів:{userResults.maxGrade}</span>
                <table className="bg-gray-300 w-100 border-b-0 ms-auto me-auto rounded-4 text-dark">
                    <thead className="border-black text-center border-b-2">
                    <tr>
                        <th className="border-black p-2 border-e-2 ">№</th>
                        <th className="border-black p-2 border-e-2 ">ПІБ учасника</th>
                        <th className="border-black p-2">Бал</th>
                    </tr>
                    </thead>
                    <tbody className="border-b-0">
                    {userResults.results.map((result : any, idx : number) =>
                        <tr className="border-t-2 border-b-0  border-black">
                            <td className="border-black p-2 border-b-0 border-e-2">{idx+1}</td>
                            <td className="border-black p-2 border-b-0 border-e-2">{result.username}</td>
                            <td className="border-black  p-2 border-b-0">{result.grade}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>)
}