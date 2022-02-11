import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CVden from "./Components/CVden/CVden";
import CVdi from "./Components/CVdi/CVdi";
import Main from "./Components/Main";
import QuanLiSo from "./Components/QuanLiSo/QuanLiSo";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/quanlycongvandi/*" element={<CVdi />}></Route>
                    <Route path="/quanlyso" element={<QuanLiSo />}></Route>
                    <Route path="/quanlycongvanden/*" element={<CVden />}></Route>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App;
