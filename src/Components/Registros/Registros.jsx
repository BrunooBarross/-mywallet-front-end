import styled from 'styled-components';

const Registros = () => {
    return (
        <Container>
            <Menu>
                <span>Olá, Fulano</span>
                <ion-icon name="log-out-outline"></ion-icon>
            </Menu>
            <RegistrosContainer>
                <h2>regis</h2>
            </RegistrosContainer>
            <Nav>
                <div>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <span>Nova entrada</span>
                </div>
                <div>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <span>Nova saída</span>
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