import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
               <Route path="/" exact element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}