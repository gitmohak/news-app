import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default function App () {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [progress, setProgress] = useState(0);

    return (
      <BrowserRouter>
        <LoadingBar color='#f11946' height={3} progress={progress}/>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<News setProgress={setProgress} apiKey={apiKey} key="home" pageSize={8} country="us" category="general" />} />

            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={8} country="us" category="business" />} />

            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={8} country="us" category="entertainment" />} />

            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={8} country="us" category="general" />} />

            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={8} country="us" category="health" />} />

            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={8} country="us" category="science" />} />

            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={8} country="us" category="sports" />} />

            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={8} country="us" category="technology" />} />

          </Route>
        </Routes>
      </BrowserRouter>
    )
}