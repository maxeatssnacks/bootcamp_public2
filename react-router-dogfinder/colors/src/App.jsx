import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ColorList from './ColorList';
import Color from './Color';
import NewColorForm from './NewColorForm';
import './App.css'

function App() {
  const [colors, setColors] = useState([
    { name: 'red', value: '#FF0000' },
    { name: 'green', value: '#00FF00' },
    { name: 'blue', value: '#0000FF' }
  ]);

  const addColor = (newColor) => {
    setColors([newColor, ...colors]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/colors" element={<ColorList colors={colors} />} />
          <Route path="/colors/new" element={<NewColorForm addColor={addColor} />} />
          <Route path="/colors/:color" element={<Color colors={colors} />} />
          <Route path="/" element={<Navigate replace to="/colors" />} />
          <Route path="*" element={<Navigate replace to="/colors" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
