import styled from 'styled-components';
import Inputs from '../Styleds-Globais/Inputs';
const Entrada = () => {
    return(
        <Container>
            <h1>Nova entrada</h1>
            <Inputs>
                <input type="number" placeholder="Valor"/>
                <input type="text" placeholder="Descrição"/>
                <Botao>Salvar Entrada</Botao>
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
export default Entrada;