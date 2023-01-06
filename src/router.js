import React from 'react';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Alunos from './components/Alunos';
import NovoAluno from './components/NovoAluno';

export default function Router() {
    return(
        <BrowserRouter>
            <Switch>
               <Route path="/" exact element={<Login />} />
               <Route path="/alunos" element={<Alunos />} />
               <Route path="/aluno/novo/:alunoId" element={<NovoAluno />} />
            </Switch>
        </BrowserRouter>
    );
}