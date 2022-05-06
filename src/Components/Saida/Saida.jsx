import styled from 'styled-components';
import Inputs from '../Styleds-Globais/Inputs';
import {useState} from 'react'
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Contexts/UserContext';
import { useContext } from 'react';
import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

const Saida = () => {
    const { token } = useContext(UserContext);
    const config = { headers: { Authorization: `Bearer ${token}`}}

    const navigate = useNavigate();
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    console.log(dayjs().locale('pt-br').format('DD/MM'));
    function debitarValor(event){
        event.preventDefault();
        let valorConvertido = valor.toString().replace("R$", "")
        valorConvertido = valorConvertido.replace(".", "");
        valorConvertido = valorConvertido.replace(",", ".");
        
        const requisicaoPost = axios.post("http://localhost:5000/debito",{
            tipo: "saida",
            data: dayjs().locale('pt-br').format('DD/MM'),
            valor: valorConvertido,
            descricao
        },config);
        requisicaoPost.then(resposta =>{
            navigate('/registros');
        });requisicaoPost.catch(error =>{
            console.log(error);
        })
    }
    return(
        <Container>
            <h1>Nova saída</h1>
            <Inputs onSubmit={debitarValor}>
                <NumberFormat 
                    placeholder="Valor"
                    thousandSeparator='.' 
                    prefix={'R$'} 
                    onChange={e => setValor(e.target.value)}
                    isNumericString={true}
                    decimalSeparator=","
                    decimalScale={2}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Descrição" 
                    onChange={e => setDescricao(e.target.value)}
                    required
                />;
                <Botao type="submit">Salvar Entrada</Botao>
            </Inputs>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    h1{
        margin-top: 25px;
        margin-left:  24px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        color: #FFFFFF;
    }
    
`;
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
export default Saida;