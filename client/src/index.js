import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Root from './Root';
import Login from './components/login';
import Home from './components/home';
import Signup from './components/signup';
import CharacterDetail from './components/character/character-detail';
import history from './history';
import './app.css';

ReactDOM.render(
    <Root>
      <BrowserRouter history={history}>
        <main>
          <Switch>
            <Route exact path="/signup" history={history} component={Signup}/>
            <Route exact path="/" history={history} component={Login}/>
            <Route exact path="/home" history={history} component={Home}/>
            <Route exact path="/detail/:id" history={history} component={CharacterDetail}/>
          </Switch>
        </main>
      </BrowserRouter>
    </Root>
  , document.getElementById('root'));
