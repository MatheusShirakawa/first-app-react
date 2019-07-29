import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AutorBox from './Autor';
// import * as serviceWorker from './serviceWorker';
// import {BrowserRouter,Router,Route,Link} from 'react-router-dom';
// import {browserHistory} from 'browser-history';
// import {Router, Route} from 'react-router';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



ReactDOM.render(
    (<Router>
        <Route path="/" component={App}/>
        <Route path="/autor" component={AutorBox}/>
        <Route path="/livro"/>
    </Router>)
    ,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
