// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import ItemDetail from './components/ItemDetail';
import Quiz from './components/Quiz';
import ReportProblem from './components/ReportProblem';
import About from './components/About';
import EnvironmentalImpact from './components/EnvironmentalImpact';
import VideoLibrary from './components/VideoLibrary';
import DIYUpcycling from './components/DIYUpcycling';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Add your Header/Navigation component here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/report" element={<ReportProblem />} />
          <Route path="/about" element={<About />} />
          {/* New Components */}
          <Route path="/impact-calculator" element={<EnvironmentalImpact />} />
          <Route path="/video-library" element={<VideoLibrary />} />
          <Route path="/diy-projects" element={<DIYUpcycling />} />
          {/* Add Map route later */}
        </Routes>
        {/* Add your Footer component here */}
      </div>
    </Router>
  );
}

export default App;