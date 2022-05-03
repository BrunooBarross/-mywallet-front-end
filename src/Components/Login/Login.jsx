import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Inputs from '../Styleds-Globais/Inputs';

const Login = () => {
    return (
        <Container>
            <h1>MyWallet</h1>
            <Inputs>
                <input type="email" placeholder="E-mail"/>
                <input type="password" placeholder="Senha"/>
                <Botao>Entrar</Botao>
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

export default Login;