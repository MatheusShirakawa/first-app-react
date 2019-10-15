import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AutorBox from './Autor';
import LivroBox from './Livro';
import Home from './Home';
// import {IndexRoute} from 'react-router';
// import * as serviceWorker from './serviceWorker';
// import {BrowserRouter,Router,Route,Link} from 'react-router-dom';
import {browserHistory} from 'browser-history';
// import {Router, Route} from 'react-router';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";



ReactDOM.render(
    (<Router history={browserHistory}>
        <Route path="/" component={App}/>
            <Route path="/" component={Home}/>
            <Route path="/autor" component={AutorBox}/>
            <Route path="/livro" component={LivroBox}/>
        {/* </Route> */}
    </Router>)
    ,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
