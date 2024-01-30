import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}