import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import UserContext from '../Contexts/UserContext';
import axios from 'axios';

const Registros = () => {
    const { token } = useContext(UserContext);
    const[listarRegistro, setListarRegistro] = useState([])
    const[saldo, setSaldo] = useState('')
    
    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${token}`}}
        const requisicaoGet = axios.get("http://localhost:5000/registros",config);
        requisicaoGet.then(resposta => {
            const { data } = resposta;
            setListarRegistro(data);
            let resultado = 0;
            for(const property in data){
                if(data[property].tipo === 'entrada'){
                    resultado = resultado + parseFloat(data[property].valor);
                }
                if(data[property].tipo === 'saida'){
                    resultado = resultado - parseFloat(data[property].valor);
                }
            }
            let valorConvertido =  resultado.toLocaleString('pt-br', {minimumFractionDigits: 2});
            setSaldo(valorConvertido);
        });
        requisicaoGet.catch(error => { 
            console.log(error);
        });
    }, [token]);
   
    return (
        <Container>
            <Menu>
                <span>Olá, {listarRegistro.nome}</span>
                <ion-icon name="log-out-outline"></ion-icon>
            </Menu>
            <RegistrosContainer>
                {/* {listarRegistro.map((item, key) =>
                                <Registro
                                    key={key}
                                    id={item._id}
                                    nome={item.nome}
                                    data={item.data}
                                    valor={item.valor}
                                    descricao={item.descricao}
                                    token={token}
                />)}     */}
                <div className="teste">
                    <div>SALDO</div>
                    <span>{saldo}</span>
                </div>
                
            </RegistrosContainer>
            <Nav>
                <div>
                <Link to= {`/entrada`}>
                    <div>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <span>Nova entrada</span>
                    </div>
                </Link>  
                </div>
                <div>
                    <Link to= {`/saida`}>
                        <div>
                            <ion-icon name="remove-circle-outline"></ion-icon>
                            <span>Nova saída</span>
                        </div>
                    </Link>  
                </div>  
            </Nav>
        </Container>
        
    );
}

const Container = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`
const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:87%;
    height: 31px;
    margin-top: 25px;
    span{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
    ion-icon{
        font-size: 24px;
        color: #FFFFFF;
    }
`
const RegistrosContainer = styled.div`
    width: 87%;
    height: 66.8%;
    margin-top: 22px;
    background: #FFFFFF;
    border-radius: 5px;
    overflow-y: scroll;
    
    .teste{
        background-color: #FFFFFF;
        position: sticky;
        top: 95%;
        padding-left: 15px;
        padding-right: 15px;
        display: flex;
        justify-content: space-between;
        z-index: 10;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
    }

    .teste span{
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #03AC00;
    }

`
const Nav = styled.div`
    width: 87%;
    display: flex;
    justify-content: space-between;
    margin-top: 13px;
    margin-bottom: 16px;
    div{
        display: flex;
        flex-direction: column;
        width: 47.5%;
        height: 114px;
        background: #A328D6;
        border-radius: 5px;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;

        color: #FFFFFF;
    }
    div ion-icon{
        margin-left: 11px;
        margin-top: 10px;
        font-size: 22px;
    }
    div span{
        width: 44px;
        margin-left: 12px;
        margin-top: 32px;
    }
`
export default Registros;