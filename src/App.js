import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import { Header } from './header/header';
import { Home } from './home/home';
import { Footer } from './footer/footer';

function App() {
  return (
      <BrowserRouter>
        <Route render={(props) => <Header props={props} />} />
          <div id="wrapper">
            <Switch>
                <Route exact path="/" render={(props) => <Home props={props} />}/>
            </Switch>
          </div>
        <Route render={(props) => <Footer props={props} />} />
      </BrowserRouter>
  );
}

export default App;
