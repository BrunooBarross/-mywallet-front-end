import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import UserContext from '../Contexts/UserContext';
import axios from 'axios';
import Registro from './Registro'

const Registros = () => {
    const navigate = useNavigate();
    const { token, nomeUsuario } = useContext(UserContext);
    const [listarRegistro, setListarRegistro] = useState([]);
    const [saldo, setSaldo] = useState('');
    const [sinalResultado, setSinalResultado] = useState("neutro");

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const requisicaoGet = axios.get("http://localhost:5000/registro", config);
        requisicaoGet.then(resposta => {
            const { data } = resposta;
            setListarRegistro(data);
            let resultado = 0;
            for (const property in data) {
                if (data[property].tipo === 'entrada') {
                    resultado = resultado + parseFloat(data[property].valor);
                }
                if (data[property].tipo === 'saida') {
                    resultado = resultado - parseFloat(data[property].valor);
                }
            }
            if (Math.sign(resultado) === 1) { setSinalResultado("positivo"); }
            if (Math.sign(resultado) === -1) { setSinalResultado("negativo"); }
            if (resultado === 0) { setSinalResultado("neutro"); }
            const valorConvertido = resultado.toLocaleString('pt-br', { minimumFractionDigits: 2 });
            setSaldo(valorConvertido);
        });
        requisicaoGet.catch(error => {
            console.log(error);
        });
    }, [token]);

    function logoutApp() {
        localStorage.clear();
        navigate('/');
    }
    if (!token) {
        return (<></>);
    }
    return (
        <Container>
            {!token ? <></> :
                <>
                    <Menu>
                        <span>Olá, {nomeUsuario}</span>
                        <ion-icon onClick={() => logoutApp()} name="log-out-outline"></ion-icon>
                    </Menu>
                    {listarRegistro.length === 0 ?
                        <RegistrosContainer>
                            <SemRegistro>
                                <span>Não há registros de entrada ou saída</span>
                            </SemRegistro>
                        </RegistrosContainer> :
                        <>
                             <RegistrosContainer>
                                {listarRegistro.map((item, key) =>
                                    <Registro
                                        key={key}
                                        id={item._id}
                                        tipo={item.tipo}
                                        data={item.data}
                                        valor={item.valor}
                                        descricao={item.descricao}
                                        token={token}
                                        listarRegistro={listarRegistro}
                                        setListarRegistro={setListarRegistro}
                                        setSaldo={setSaldo}
                                        setSinalResultado={setSinalResultado}
                                    />)}
                            </RegistrosContainer>
                            <div className="teste">
                                <div>SALDO</div>
                                <Saldo sinal={sinalResultado}>{saldo}</Saldo>
                            </div> 
                        </>
                    }
                    <Nav>
                        <div>
                            <Link to={`/entrada`}>
                                <div>
                                    <ion-icon name="add-circle-outline"></ion-icon>
                                    <span>Nova entrada</span>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to={`/saida`}>
                                <div>
                                    <ion-icon name="remove-circle-outline"></ion-icon>
                                    <span>Nova saída</span>
                                </div>
                            </Link>
                        </div>
                    </Nav>
                </>
            }
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    .teste{
        display: flex;
        justify-content: space-between;
        width: 87%;
        background-color: #FFFFFF;
        border-radius: 0 0 10px 10px;
        padding-top:10px;
    }
    .teste div{
        margin-left: 15px;
    }
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
    border-radius: 10px 10px 0 0 ;
    overflow-y: scroll;
`
const SemRegistro = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;

    span{
        width: 180px;
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
const Saldo = styled.span`
        margin-right: 11px;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: ${props => props.sinal === "neutro" ? "#000000;" : props.sinal === "positivo" ?
        "#03AC00;" : "#C70000;"};
`;
export default Registros;