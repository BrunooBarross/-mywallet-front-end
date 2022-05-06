import styled from 'styled-components';

const Registro = ({ id, tipo, data, valor, descricao, token }) => {
    const valorConvertido = parseFloat(valor).toLocaleString('pt-br', {minimumFractionDigits: 2});
    return (
        <Container>
            <div>
                <Data>{data}</Data>
                <span className="desc">{descricao}</span>
            </div>
            <div>
                <Valor tipo={tipo}>{valorConvertido}</Valor>
                <ion-icon name="close-outline"></ion-icon>
            </div>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 23px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    div{
        display: flex;
        align-items: center;
    }

    .desc{
        margin-left: 12px;
        color: black;
    }

    ion-icon{
        margin-right: 10px;
        font-size: 19px;
        color:#C6C6C6;
        
    }
`
const Data = styled.span`
    margin-left: 12px;
    color: #C6C6C6;
`
const Valor = styled.span`
   margin-right: 11px;
   color: ${props => props.tipo === 'entrada' ? "#03AC00;" : "#C70000;"};
`
export default Registro;
