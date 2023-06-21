import React from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const RoleChooser: React.FC = () => {

    const nav = useNavigate();

    return (<div className="d-flex border-2 rounded-4 shadow-xl  h-1/3 w-50 ms-auto me-auto align-self-center justify-content-center align-items-center flex-column">
        <div className="rounded-3 text-white border-2 align-self-end border-white mb-5  w-20 bg-transparent">
            <Button className="d-flex p-0 text-sm text-white ms-auto me-auto" variant="" onClick={() => nav("/")}>Вийти</Button>
        </div>
        <span className="text-white p-4 uppercase">Я сосав мене їбали - @Сунь Цзи</span>
        <span className="text-red-500 p-4 pt-3 text-sm">Оберіть роль</span>
        <div className="d-flex flex-row justify-content-center w-100">
            <div className="rounded-3 w-50 me-3 bg-yellow-200">
                <Button className="d-flex ms-auto me-auto" variant="" onClick={() => nav("/test/create/")}>Творець</Button>
            </div>
            <div className="rounded-3 w-50 bg-yellow-200">
                <Button className="d-flex ms-auto me-auto" variant="" onClick={() => nav("/main")}>Користувач</Button>
            </div>

        </div>
    </div>)
}