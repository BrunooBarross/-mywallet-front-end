import styled from 'styled-components';

const Inputs = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    input{
        width: 87%;
        height: 58px;
        background: #FFFFFF;
        border: none;
        border-radius: 5px;
        margin-top: 13px;
        padding-left: 15px;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
    }   

    input::placeholder{
        color: #000000;
    }
`
export default Inputs;