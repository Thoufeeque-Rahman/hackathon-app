import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Prayer from './components/Prayer/Prayer';
import Qalbox from './components/Qalbox/Qalbox';
import Quran from './components/Quran/Quran';
import ReadSurah from './components/ReadSurah/ReadSurah';
import Profile from './components/Profile/Profile';

function App() {

  return (
    <div className="App" style={{ overflow: ''}}>
      <div className="d-block d-sm-block d-md-none">
        <Routes>
          <Route path="/*" element={
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Prayers" element={<Prayer />} />
                <Route path="/Qalbox" element={<Qalbox />} />
                <Route path="/Quran" element={<Quran />} />
                <Route path="/Quran/read-surah/:surahNumber" element={<ReadSurah />} />
                <Route path="/Profile" element={<Profile />} />
              </Routes>
            </div>
          } />
        </Routes>
      </div>
      <div className="d-md-block d-none d-sm-none text-center" style={{
        backgroundColor: 'grey',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <p>Not supported in this Device, use Mobile Device to use App.</p>
      </div>
    </div>
  );
}

export default App;