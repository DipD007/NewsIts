import './App.css';
import React, { useState } from 'react';
import NavBar from './component/NavBar';
import News from './component/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [mode, setMode] = useState('light');
  const [progress, setProgress] = useState(0);

  const toggleMode = () => {
    setMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      document.body.style.backgroundColor = newMode === 'light' ? 'white' : '#151922';
      return newMode;
    });
  };

  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  return (
    <div>
      <Router>
        <NavBar toggleMode={toggleMode} mode={mode} />
        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
        />
        <Routes>
          <Route
            path="/"
            element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" mode={mode} />}
          />
          {categories.map(category => (
            <Route
              key={category}
              path={`/${category}`}
              element={<News setProgress={setProgress} apiKey={apiKey} key={category} pageSize={pageSize} country="us" category={category} mode={mode} />}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
