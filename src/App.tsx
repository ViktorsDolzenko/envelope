import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {Envelope} from "./envelope";

import './App.scss';

export const App = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/:guest?" component={Envelope} />
        </Switch>
        </BrowserRouter>
    )
}
