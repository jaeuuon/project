import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './modules';
import { set } from './modules/user';

import { UserRole } from './enums/role';

import './App.css';

import logo from './logo.svg';

export default () => {
    const user = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();

    const onSet = () => {
        dispatch(set({ id: '1', name: 'hello', role: UserRole.ADMIN }));
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>{user.name}</p>
                <button onClick={onSet}>BUTTON</button>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
            </header>
        </div>
    );
};
