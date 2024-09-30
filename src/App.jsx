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
import Maintenance from './components/Maintenance/Maintenance';

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
                <Route path="/maint" element={<Maintenance />} />
                
              </Routes>
            </div>
          } />
        </Routes>
      </div>
      <div className='position-relative text-center' style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <div className='position-absolute top-50 start-50 translate-middle'>
                <i style={{ fontSize: '100px' }} class="fa-solid fa-ghost mb-3"></i>
                <p>This Device is not supported for this app. Use Mobile Phone for better experience!</p>
            </div>
        </div>
    </div>
  );
}

export default App;