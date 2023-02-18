import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ContentPage from './views/ContentPage/ContentPage';
import ComingSoon from './views/ComingSoon';
import LandingPage from './views/LandingPage/LandingPage';
// import Lesson from './views/LessonView';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route >
            <Route index element={<LandingPage />} />
            <Route path="/:heading" element={<ContentPage />} />
            <Route path="/:heading/:subHeading" element={<ContentPage />} />
            <Route path="/:heading/coming-soon" element={<ComingSoon />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
