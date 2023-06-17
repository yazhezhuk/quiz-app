import React, {memo, useState} from 'react';
import type { FC } from 'react';

import resets from '../resets.css';
import classes from './HelloPage.module.css';
import {Button} from "react-bootstrap";
import {CloseIcon} from "../icons/CloseIcon";
import {EyeIcon} from "../icons/EyeIcon";
import {LockIcon} from "../icons/LockIcon";
import {Input} from "reactstrap";
import SignUpPopUp from "./forms/SignUpPopUp";
import SignInForm from "./forms/SignInForm";

interface Props {
    className?: string;
}



export const WelcomePage: FC<Props> = memo(function Welcome(props = {}) {
    const [isRegisterClicked,setRegisterClicked] = useState(true);
    const [isSingInClicked,setSingInClicked] = useState(true);

    const handlesignupClick = () => {
        setRegisterClicked(!isRegisterClicked);
    };
    const handleloginClick = () => {
        setSingInClicked(!isSingInClicked);
    };


    return (
        <div className={`${resets.storybrainResets} ${classes.root}`}>
            <SignUpPopUp show={isRegisterClicked} onClose={() => isRegisterClicked}></SignUpPopUp>
            <SignInForm show={isSingInClicked} onClose={() => isSingInClicked}></SignInForm>
                    <div className={classes.welcome + " text text-center well well-lg"}>Ласкаво просимо</div>
                    <div className={classes.welcomeMessage}>Онлайн тестування для ваших потреб</div>
                    <div className={classes.regBg} onClick={handlesignupClick}>
                        <div className={classes.font3} >Реєстрація</div>
                    </div>
                    <div className={classes.loginButton + " " + classes.button} onClick={handleloginClick}>
                        <div className={classes.loginFont}>Вхід</div>
                    </div>

        </div>
    );
});