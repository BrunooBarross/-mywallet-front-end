import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react'
import styled from 'styled-components';
import Inputs from '../Styleds-Globais/Inputs';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [dadosLogin, setDadosLogin] = useState({email:"", senha:""});
    const [alerta, setAlerta] = useState("");

    const { setToken, setNomeUsuario } = useContext(UserContext);

    function realizarLogin(event){
        event.preventDefault();
        setAlerta("");
        const requisicaoPost = axios.post('http://localhost:5000/login',dadosLogin);
        requisicaoPost.then(resposta =>{
            console.log(resposta.data);
            setToken (resposta.data.token);
            setNomeUsuario (resposta.data.nome);
            navigate('/registros');
        });requisicaoPost.catch(error =>{
            if(error.response.status === 409){
                setAlerta("Email ou senha incorretos");
            }
            console.log(error);
        })
    }

    return (
        <Container>
            <h1>MyWallet</h1>
            <Inputs onSubmit={realizarLogin}>
                <input type="email" placeholder="E-mail"
                    onChange={e => setDadosLogin({...dadosLogin,email: e.target.value})}required/>
                <input type="password" placeholder="Senha"
                    onChange={e => setDadosLogin({...dadosLogin,senha: e.target.value})}required/>
                <Label>{alerta}</Label>
                <Botao type="submit">Entrar</Botao>
            </Inputs>
            <Div>
                <Link to= {`/cadastro`}>
                        <span>Primeira vez? Cadastre-se!</span>
                </Link>  
            </Div>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    
    h1{
        margin-top:159px;
        margin-bottom: 11px;
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #FFFFFF;
    }
`

const Botao = styled.button`
    width: 87%;
    height: 46px;
    margin-top:13px;
    border: none;
    background: #A328D6;
    border-radius: 5px;

    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;

    color: #FFFFFF
`

const Div = styled.div`
    margin-top:36px;

    span{
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        text-decoration-line: underline;
        text-decoration: none;
        cursor: pointer;
        color: #FFFFFF;
    }
`
const Label = styled.label`
    font-size: 13px;
    color: red;  
    margin-top: 5px;
`
export default Login;