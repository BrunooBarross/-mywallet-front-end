import styled from 'styled-components';
import axios from 'axios';

const Registro = ({ id, tipo, data, valor, descricao, token, listarRegistro, setListarRegistro, setSaldo, setSinalResultado }) => {
    const valorConvertido = parseFloat(valor).toLocaleString('pt-br', {minimumFractionDigits: 2});
    function deletarRegistro(id, token){
        const config = { headers: { Authorization: `Bearer ${token}`}};
        let dialog = window.confirm(`Deseja realmente excluir o registro?`);
        if (dialog) {
            const requisicaoDelete = axios.delete(`https://mywallet-api-driven.herokuapp.com/registro/${id}`, config);
            requisicaoDelete.then(resposta => {
                const novoArrayRegistro = listarRegistro.filter(item => item._id !== id);
                setListarRegistro(novoArrayRegistro);
                let resultado = 0;
                for(const property in novoArrayRegistro){
                    if(novoArrayRegistro[property].tipo === 'entrada'){
                        resultado = resultado + parseFloat(novoArrayRegistro[property].valor);
                    }
                    if(novoArrayRegistro[property].tipo === 'saida'){
                        resultado = resultado - parseFloat(novoArrayRegistro[property].valor);
                    }
                }
                if(Math.sign(resultado) === 1){setSinalResultado(true);}
                if(Math.sign(resultado) === -1){setSinalResultado(false);}
                if (resultado === 0) { setSinalResultado("neutro");}
                const resultadoConvertido =  resultado.toLocaleString('pt-br', {minimumFractionDigits: 2});
                setSaldo(resultadoConvertido);
            });
            requisicaoDelete.catch(error => {
                console.log("Não foi possível deletar o hábito", error);
            });
        } 
    }
    return (
        <Container>
            <div>
                <Data>{data}</Data>
                <span className="desc">{descricao}</span>
            </div>
            <div>
                <Valor tipo={tipo}>{valorConvertido}</Valor>
                <ion-icon  onClick={() => deletarRegistro(id, token)} name="close-outline"></ion-icon>
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
