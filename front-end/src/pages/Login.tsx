import React, {useState} from 'react';
import apiService from '../services/apiService';
import './Login.css';
import {useNavigate} from "react-router-dom";
import {useAuth} from '../components/AuthContext'; // Import the useAuth hook

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {setToken, setName} = useAuth(); // Use the setToken and setName methods from useAuth

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await apiService.login(email, password);
            console.log('Login bem-sucedido:', response);
            setToken(response.token); // Set the token in the AuthContext
            setName(response.user.name); // Set the name in the AuthContext
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage(`Erro ao enviar requisição: ${error}`);
        }
    };
    return (
        <div className="page">
            <form className="formLogin" onSubmit={handleSubmit}>
                <img src="https://iili.io/JTSLyIS.png" alt="Logo"/>

                <p>Área de acesso</p>

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

                <a href="#">Esqueci minha senha</a>

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <button type="submit" className="btn">Acessar</button>
                <button type="button" className="btn" onClick={() => navigate('/signup')}>Criar Conta</button>
            </form>
        </div>
    );
}

export default Login;
