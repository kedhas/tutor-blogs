import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './views/LandingPage/LandingPage';
import Header from './Components/Header/Header';
import HtmlCssAndJs from './views/HtmlCssAndJs/HtmlCssAndJs';
import Angular from './views/Angular/Angular';
import ReactJs from './views/ReactJs/ReactJs';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route >
            <Route index element={<LandingPage />} />
            <Route path="html-css-and-js" element={<HtmlCssAndJs />} />
            <Route path="angular" element={<Angular />} />
            <Route path="reactjs" element={<ReactJs />} />
            <Route path="*" element={<LandingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
