import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {WelcomePage} from "./page/HelloPage";
import MainPage from "./page/MainPage";
import HomePage from "./page/MainPage";
import TestTaking from "./page/TestTaking";
import TestCreationPage from "./page/TestCreationPage";
import ResultPage from "./page/ResultPage";

function App() {
  return (
    <div className="App vh-100 vw-100 .root">
        <Routes>
          <Route path="/" element={<WelcomePage/>}  />
          <Route path="/main"  element={<HomePage/>} />
          <Route path="/test/session/" element={<TestTaking/>} />
            <Route path="/test/result/" element={<ResultPage/>} />
            <Route path="/test/create/" element={<TestCreationPage/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
