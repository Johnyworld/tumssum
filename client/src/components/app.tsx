import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import axios from 'axios';

import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import { useEffect, useState } from 'preact/hooks';


const App: FunctionalComponent = () => {

    const [ hello, setHello ] = useState('');

    useEffect(() => {
        axios.get('/api/hello').then(res=> {
            setHello(res.data);
        });
    }, []);

    return (
        <div id="preact_root">
            <div style={{ height: '100px' }}></div>
            <p>d</p>
            { hello &&
                <h2>{hello}</h2>
            }
            <Header />
            <Router>
                <Route path="/" component={Home} />
                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
