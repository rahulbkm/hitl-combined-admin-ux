import React, { useState } from 'react';
import { RealtimeQuality } from './components/RealtimeQualityNew';
import { Home } from './components/Home';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('Home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'Home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'Real-time coaching' && <RealtimeQuality onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
