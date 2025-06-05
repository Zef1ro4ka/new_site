import './style.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TitlePage from './components/TitlePage';
import SityPage from './components/sity/SityPage'

function App(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<TitlePage />}></Route>
                <Route path="/city/:cityName" element={<SityPage />}></Route>
            </Routes>
        </Router>
    );
}

export default App;