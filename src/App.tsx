import { BrowserRouter, Routes, Route } from "react-router-dom";
import HaedPage from "./pages/haedPage";
import WelcomePage from "./pages/welcomePage";
import WoovPage from "./pages/woovPage";
import { useEffect, useState } from "react";
import loadZipModel from "./feature/useLoadZip.ts";

export default function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/haed" element={<HaedPage/>} />
                <Route path="/woov" element={<WoovPage  />} />
            </Routes>
        </BrowserRouter>
    );
}
