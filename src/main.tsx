import React from 'react'
import ReactDOM from 'react-dom/client'
import FirstStep from './pages/FirstStep.tsx'
import SecondStep from "./pages/SecondStep.tsx";
import './css/index.css'

// Config react router
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ThirdStep from "./pages/ThirdStep.tsx";
import ForthStep from "./pages/ForthStep.tsx";
import FifthStep from "./pages/FifthStep.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FirstStep />} />
                <Route path="/2" element={<SecondStep />} />
                <Route path="/3" element={<ThirdStep />} />
                <Route path="/4" element={<ForthStep />} />
                <Route path="/5" element={<FifthStep />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
