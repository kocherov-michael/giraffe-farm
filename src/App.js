import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Main} from './pages/Main';
import {Giraffes} from './pages/Giraffes';

import { Aside } from "./components/Aside";
import { DatabaseState } from './context/database/DatabaseState';

function App() {
    
    return (
      <DatabaseState>
        <BrowserRouter>
        <div className="container">
            <Aside />
            <Switch>
                <Route path={'/'} exact component={Giraffes} />
                <Route path={'/main'}  component={Main} />
                <Route path={'/manage'}  component={Main} />
                <Route path={'/giraffes'}  component={Giraffes} />
                <Route path={'/stuff'}  component={Main} />
                <Route path={'/options'}  component={Main} />
                <Route path={'/support'}  component={Main} />
            </Switch>   
        </div>
        </BrowserRouter>
      </DatabaseState>
    );
}

export default App;
