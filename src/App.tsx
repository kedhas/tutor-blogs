import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import LandingPage from './views/LandingPage/LandingPage';
import Lesson from './views/LessonView';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route >
            <Route index element={<LandingPage />} />
            <Route path="/:heading" element={<Lesson />} />
            <Route path="/:heading/:subHeading" element={<Lesson />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
