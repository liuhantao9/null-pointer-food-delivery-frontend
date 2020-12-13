import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './Page';
import GlobalContextProvider from "./GlobalContext";

function App() {

  return (
    <div className="App">

      <Router >
        <GlobalContextProvider>
          <Page />
        </GlobalContextProvider>
      </Router>

      {/* <p>{JSON.stringify(testDate, null, 2)}</p> */}
    </div>
  );
}

export default App;
