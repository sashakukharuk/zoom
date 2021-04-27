import React, {useEffect, useState} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import {AuthProvider} from "./State/Auth/AuthProvider";
import {Login} from "./Components/Auth/Login/Login";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {useEventEmitter} from "@umijs/hooks";
import {UserProvider} from "./State/User/UserProvider";
import {Room} from "./Components/Content/Zoom/Room";
import {ZoomProvider} from "./State/Zoom/ZoomProvider";

function App() {
    const [token, setToken] = useState('');
    const token$ = useEventEmitter<string>();
    token$.useSubscription((token) => setToken(token));
    useEffect(() => {
        const token = localStorage.getItem('access-token');
        token && setToken(token);
    }, [token]);

    return (
        <BrowserRouter>
            <div className="App">
                {token ? <div>
                        <Redirect to="/"/>
                        <UserProvider token$={token$}>
                            <ZoomProvider>
                                <Route exact path='/' render={() => <Room/>}/>
                            </ZoomProvider>
                        </UserProvider>
                    </div>
                    : <div>
                        <AuthProvider token$={token$}>
                            <Redirect to="/login"/>
                            <Route path='/login' render={() => <Login/>}/>
                        </AuthProvider>
                    </div>}
            </div>
        </BrowserRouter>
    );
}

export default App;
