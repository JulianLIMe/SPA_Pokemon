import './App.css';

import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./components/Landing"
import Home from "./components/Home"
import Details from './components/Details';
import FormCreate from './components/FormCreate';

function App() {

  return (

    <div className='todalaapp'>
      <BrowserRouter>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/details/:name">
          <Details />
        </Route>
        <Route path="/create">
          <FormCreate />
        </Route>
      </BrowserRouter>
    </div >
  )
}

export default App;
