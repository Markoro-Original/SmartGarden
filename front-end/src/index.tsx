import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GardenDashboard from "./pages/GardenDashboard";
import Login from './pages/Login';
import Garden from './pages/Garden';
import Signup from './pages/Signup';
import {AuthProvider} from './components/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/dashboard" element={<GardenDashboard/>}/>
                    <Route path="/garden/:id" element={<Garden/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    </React.StrictMode>
);