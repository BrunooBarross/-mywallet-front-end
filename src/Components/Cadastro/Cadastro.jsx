import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Inputs from '../Styleds-Globais/Inputs';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Cadastro = () => {
    const navigate = useNavigate();
    const [dadosCadastro, setDadosCadastro] = useState({nome:"", email:"", senha:"", verificarSenha:""});
    const [alerta, setAlerta] = useState("");
    function cadastrarUsuario(event){
        event.preventDefault();
        setAlerta("");
        if(dadosCadastro.senha !== dadosCadastro.verificarSenha){
            setAlerta("As senhas não conferem");
            return;
        }
        const requisicaoPost = axios.post('http://localhost:5000/sign-up',dadosCadastro);
        requisicaoPost.then(resposta =>{
            navigate('/');
        });requisicaoPost.catch(error =>{
            if(error.response.status === 409){
                setAlerta("Email já cadastrado");
            }
            if(error.response.status === 406){
                setAlerta("As senhas não conferem");
            }
            if(error.response.status === 422){
                setAlerta("Email com formato inválido");
            }
        })
    }
    
    return(
        <Container>
            <h1>MyWallet</h1>
            <Inputs onSubmit={cadastrarUsuario}>
                <input type="text" placeholder="Nome"
                    onChange={e => setDadosCadastro({...dadosCadastro,nome: e.target.value})}required/>
                <input type="email" placeholder="E-mail"
                    onChange={e => setDadosCadastro({...dadosCadastro,email: e.target.value})}required/>
                <input type="password" placeholder="Senha"
                    onChange={e => setDadosCadastro({...dadosCadastro,senha: e.target.value})}required/>
                <input type="password" placeholder="Confirme a senha"
                    onChange={e => setDadosCadastro({...dadosCadastro,verificarSenha: e.target.value})}required/>
                    <Label>{alerta}</Label>
                <Botao type="submit">Cadastrar</Botao>
            </Inputs>
            <Div>
                <Link to= {`/`}>
                        <span>Já tem uma conta? Entre agora!</span>
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
export default Cadastro;