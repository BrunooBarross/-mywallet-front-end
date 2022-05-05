import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../Contexts/UserContext";
import Login from "../Login/Login"
import Cadastro from "../Cadastro/Cadastro"
import Registros from "../Registros/Registros"
import Entrada from "../Entrada/Entrada"
import Saida from "../Saida/Saida"

const App = () => {
    const [token, setToken] = useState("");
    console.log(token);
    return (
        <UserContext.Provider value={{token, setToken}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/cadastro" element={<Cadastro />}/>
                    <Route path="/registros" element={<Registros />}/>
                    <Route path="/entrada" element={<Entrada />}/>
                    <Route path="/saida" element={<Saida />}/>
                </Routes>
            </BrowserRouter> 
        </UserContext.Provider>  
    );
}
export default App;