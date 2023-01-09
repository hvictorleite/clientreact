import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';
import './styles.css';
import logoCadastro from '../../assets/cadastro.png';
import api from '../../services/api';


export default function Alunos() {

    // filtrar dados
    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);

    const [alunos, setAlunos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const navigate = useNavigate();

    const searchAlunos = (searchValue) => {
        setSearchInput(searchValue);
        if(searchInput !== ''){
            const dadosFiltrados = alunos.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
            });
            setFiltro(dadosFiltrados);
        }
        else {
            setFiltro(alunos);
        }
    }

    useEffect(() => {
        api.get('api/alunos', authorization).then(
            response => {
                setAlunos(response.data);
                console.log(alunos);
            }, token);
    });

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

    async function editAluno(id) {
        try{
            navigate(`/aluno/novo/${id}`);
        } catch(error) {
            console.log('Não foi possível editar o aluno. ' + error);
        }
    }

    async function deleteAluno(id) {
        try {
            if(window.confirm('Deseja deletar o aluno de id = ' + id + ' ?')){
                await api.delete(`api/alunos/${id}`, authorization);
                setAlunos(alunos.filter(aluno => aluno.id !== id));
            }
        } catch(error) {
            alert('Não foi possível remover o aluno');
        }
    }

    return (
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
                <input type="text" placeholder="Filtrar por nome..." onChange={(e) => searchAlunos(e.target.value)} />
            </form>
            <h1>Relação de Alunos</h1>
            {searchInput.length > 0 ? (
            <ul>
                {filtro.map(aluno => (
                    <li key={aluno.id}>
                        <b>Nome: </b>{aluno.nome}<br /><br />
                        <b>Email: </b>{aluno.email}<br /><br />
                        <b>Idade: </b>{aluno.idade}<br /><br />
                        <button type="button" onClick={() => editAluno(aluno.id)}>
                            <FiEdit size={25} color="#17202a" />
                        </button>
                        <button type="button" onClick={() => deleteAluno(aluno.id)} >
                            <FiUserX size={25} color="#17202a" />
                        </button>
                    </li>
                ))}
            </ul>
            ) : (
            <ul>
                {alunos.map(aluno => (
                    <li key={aluno.id}>
                        <b>Nome: </b>{aluno.nome}<br /><br />
                        <b>Email: </b>{aluno.email}<br /><br />
                        <b>Idade: </b>{aluno.idade}<br /><br />
                        <button type="button" onClick={() => editAluno(aluno.id)}>
                            <FiEdit size={25} color="#17202a" />
                        </button>
                        <button type="button" onClick={() => deleteAluno(aluno.id)}>
                            <FiUserX size={25} color="#17202a" />
                        </button>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}