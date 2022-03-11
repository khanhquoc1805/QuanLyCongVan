import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CVden from "./Components/CVden/CVden";
import CVdi from "./Components/CVdi/CVdi";
import LoginPage from "./Components/Login/LoginPage";
import Main from "./Components/Main";
import PreviewDialog from "./Components/PreviewDialog/PreviewDialog";
import QuanLiSo from "./Components/QuanLiSo/QuanLiSo";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />}></Route>
                    <Route path="/test" element={<PreviewDialog />}></Route>
                    <Route path="/home" element={<Main />}></Route>
                    <Route path="/quanlycongvandi/*" element={<CVdi />}></Route>
                    <Route path="/quanlyso" element={<QuanLiSo />}></Route>
                    <Route
                        path="/quanlycongvanden/*"
                        element={<CVden />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
