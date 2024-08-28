import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Snack from './Snack';
import './VendingMachine.css'

const VendingMachine = () => {

    const Home = () => (
        <div>
            <h1>Welcome to the Snack Shack!</h1>
            <p>Choose one from the following:</p>
            <ul className="snack-list">
                <li><Link to="/coke">Coke</Link></li>
                <li><Link to="/chips">Chips</Link></li>
                <li><Link to="/candy">Candy</Link></li>
            </ul>
        </div>
    );

    return (
        <BrowserRouter>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/coke">Coke</Link>
                    <Link to="/chips">Chips</Link>
                    <Link to="/candy">Candy</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/coke" element={<Snack name="Coke" />} />
                    <Route path="/chips" element={<Snack name="Chips" />} />
                    <Route path="/candy" element={<Snack name="Candy" />} />
                </Routes>
            </div >
        </BrowserRouter >
    );
}

export default VendingMachine;