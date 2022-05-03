import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/Login"
import Cadastro from "../Cadastro/Cadastro"
import Registros from "../Registros/Registros"

const App = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/cadastro" element={<Cadastro />}/>
                    <Route path="/registros" element={<Registros />}/>
                </Routes>
            </BrowserRouter>  
    );
}
export default App;