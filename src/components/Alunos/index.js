import React, { useState, useEffect } from "react";
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';
import logoCadastro from '../../assets/cadastro.png';


export default function Alunos() {

    const [alunos, setAlunos] = useState([]);
//    const [nome, setNome] = useState('');

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const navigate = useNavigate();

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = '';
            navigate('/');
        } catch (err) {
            alert(`Não foi possível fazer o logout. ${err}`);
        }
    }

    useEffect(() => {
            api.get('api/alunos', authorization).then(
                response=> {
                    setAlunos(response.data);
                    console.log(alunos);
            }, token);
    });

    return(
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Cadastro" />
                <span>Bem vindo, <strong>{email}</strong>!</span>
                <Link className="button" to="/aluno/novo/0">Novo Aluno</Link>
                <button type="button" onClick={logout}>
                    <FiXCircle size={35} color="#17202a" />
                </button>
            </header>
            <form>
                <input type="text" placeholder="Nome" />
                <button type="button" className="button">
                    Filtrar aluno por nome (parcial)
                </button>
            </form>
            <h1>Relação de Alunos</h1>
            <ul>
                {alunos.forEach(aluno => (
                    <li key={aluno.id}>
                        <b>Nome: </b>{aluno.Nome}<br /><br />
                        <b>Email: </b>{aluno.email}<br /><br />
                        <b>Idade: </b>{aluno.idade}<br /><br />
                        <button type="button" >
                            <FiEdit size={25} color="#17202a" />
                        </button>
                        <button type="button" >
                            <FiUserX size={25} color="#17202a" />
                        </button>
                    </li> 
                ))}
            </ul>
        </div>
    );
}