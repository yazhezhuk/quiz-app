import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {WelcomePage} from "./page/HelloPage";
import MainPage from "./page/MainPage";
import HomePage from "./page/MainPage";
import TestTaking from "./page/TestTaking";
import TestCreationPage from "./page/TestCreationPage";
import ResultPage from "./page/ResultPage";
import UserResult from "./page/UserResultPage";

function App() {
  return (
    <div className="App vh-100 .root">
        <div className="container vh-100 d-flex justify-content-center">
            <div className="row h-100 d-flex">
            <Routes>
          <Route path="/" element={<WelcomePage/>}  />
          <Route path="/main"  element={<HomePage/>} />
          <Route  path="/test/session/" element={<TestTaking/>} />
            <Route path="/test/result/:testId" element={<UserResult/>} />
            <Route path="/test/create/" element={<TestCreationPage/>}></Route>
        </Routes>
        </div>
        </div>
    </div>
  );
}

export default App;
