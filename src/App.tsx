import { BrowserRouter, Routes, Route } from "react-router-dom";
import HaedPage from "./pages/haedPage";
import WelcomePage from "./pages/welcomePage";
import WoovPage from "./pages/woovPage";
import SearchPage from "./pages/searchPage";

export default function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/haed" element={<HaedPage/>} />
                <Route path="/woov" element={<WoovPage  />} />
                <Route path="/search" element={<SearchPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
