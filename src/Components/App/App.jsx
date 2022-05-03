import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/Login"
import Cadastro from "../Cadastro/Cadastro"

import "./style.css"

const App = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/cadastro" element={<Cadastro />}/>
                </Routes>
            </BrowserRouter>  
    );
}
export default App;