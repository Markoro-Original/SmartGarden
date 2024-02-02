import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import apiService from '../services/apiService';
import './Signup.css';

const Signup: React.FC = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (password !== confirmarPassword) {
                setErrorMessage('As senhas não conferem');
                return;
            }
           // navigate('/dashboard'); // remove this line
            const response = await apiService.signup(name, email, password);
            console.log('signup bem-sucedido:', response);
            // TODO: Criar um toast de sucesso
            navigate('/');
        } catch (error) {
            setErrorMessage(`Erro ao enviar requisição: ${error}`);
        }
    };

    return (
        <div className="page">
            <form className="formLogin" onSubmit={handleSubmit}>
                <img src="https://iili.io/JTSLyIS.png" alt="Logo"/>

                <p>Área de cadastro</p>

                <label htmlFor="email">Nome</label>

                <input
                    type="text"
                    placeholder="Digite seu nome"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="email">E-mail</label>

                <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Senha</label>

                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="password">Confirmar a Senha</label>

                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={confirmarPassword}
                    onChange={(e) => setConfirmarPassword(e.target.value)}
                />

                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit" className="btn">Criar Conta</button>
                <button type="button" className="btn" onClick={() => navigate('/')}>Já tenho uma conta</button>
            </form>
        </div>
    );
}

export default Signup;
