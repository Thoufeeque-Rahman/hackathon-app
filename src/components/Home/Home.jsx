import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Home.css';
import Modal from 'react-modal';
import Qalbox from '../Qalbox/Qalbox';
import { useNavigate } from 'react-router';

// Set the root element for accessibility of modal
Modal.setAppElement('#root');

function Home() {
  const [data, setData] = useState(null);
  const [nearestPrayer, setNearestPrayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  const navigate = useNavigate()
  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', { // Use en-GB locale for dd-mm-yyyy format
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    console.log(formattedDate);
    const latitude = 11.092555;
    const longitude = 76.223289;
    fetch(`https://api.aladhan.com/v1/timings?${formattedDate}&latitude=${latitude}&longitude=${longitude}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.timings.Fajr);
        setData(data);
      });

    const timings = data?.data?.timings;

    let filteredTimings = null;

    if (timings) {
      filteredTimings = Object.fromEntries(
        Object.entries(timings)
          .filter(([prayer]) => !['Sunset', 'Imsak', 'Midnight', 'Firstthird', 'Lastthird'].includes(prayer))
      );
    }

    if (data) {
      findNearestPrayerTime(filteredTimings);
    }
  }, [data]);

  const findNearestPrayerTime = (timings) => {
    const now = new Date();
    let minDiff = Infinity;
    let closestPrayer = null;
    for (const [prayerName, prayerTime] of Object.entries(timings || {})) {
      const [hours, minutes] = prayerTime.split(':');
      const prayerDate = new Date();
      prayerDate.setHours(hours, minutes, 0, 0);
      let diff = prayerDate - now; // Updates very time

      if (diff < 0) {
        prayerDate.setDate(prayerDate.getDate() + 1); // Add 1 day
        diff = prayerDate - now;
      }
      if (diff < minDiff) {
        minDiff = diff;
        closestPrayer = { name: prayerName, time: prayerTime, diff };
      }
    }
    setNearestPrayer(closestPrayer);
  };

  const handleMaintance = () => {
    navigate('/maint')
  }

  return (
    <div className='p-2' style={{ backgroundColor: '#9eb194', overflow: 'hidden' }}>
      <div className="head" style={{ backgroundColor: '#9eb194', height: '1vh' }}></div>
      <div style={{ backgroundColor: '#f2e9da', color: '#9eb194', borderRadius: '25px' }} className="time-and-date  p-3 shadow-sm">
        <Row>
          <Col xs={6}>
            {nearestPrayer && (
              <div className='time-card'>
                <p>Salaam</p>
                <p className='fs-4 fw-medium'>{nearestPrayer.name}</p>
                <h1 className='fw-semibold'>View Time <i className='fa fa-arrow-right fs-3 me-2'></i></h1>
                <p>-{formatTimeRemaining(nearestPrayer.diff)}</p>
              </div>
            )}
          </Col>
          <Col xs={6}>
            {data?.data?.date && (
              <div style={{ height: '120px' }} className='time-card d-flex align-items-end flex-column'>
                <div className="d-flex ms-auto fs-3 me-3">
                  <div className='px-3 py-1 text-center' style={{ background: '#9eb194', color: 'white', borderRadius: '25px', marginRight: '10px', cursor: 'pointer' }}>
                    <p onClick={() => navigate('/Profile')} className='fs-6 fw-medium'>Profile</p>
                  </div>
                  <i onClick={() => handleMaintance()} className='fa fa-gear mt-1 fs-3'></i>
                </div>
                <div className="p-1"></div>
                <p className='mt-auto'>{data?.data?.date?.hijri.day} {data?.data?.date?.hijri.month.en} | {data?.data?.date?.hijri.year}</p>
                <p className='fw-medium'>Malappuram</p>
              </div>
            )}
          </Col>
        </Row>
      </div>

      {/* AiDeen */}
      <div
        className="rouded mt-2 p-1 ps-3 shadow-sm border-2 border-white"
        style={{
          width: '100%',
          height: '5%',
          borderRadius: '25px',
          background: 'linear-gradient(130deg, #fff, #9eb194)',
          color: '#9eb194',
          cursor: 'pointer',
        }}
        onClick={openModal} // Open the modal on click
      >
        <img src="https://www.salam.chat/_next/static/media/salamchaticon.567b4abf.svg" alt="salam chat" style={{ height: '20px', width: '20px' }} />
        <span style={{ paddingTop: '10px', fontSize: '15px' }}> Ask AiDeen anything.. </span>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Salam Chat Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            height: '80%',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          borderRadius: '20px'
        }}
      >
        <button onClick={closeModal} style={{ float: 'right', fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
        <iframe
          src="https://app.salam.chat/"
          width="min-content"
          height="100%"
          allowFullScreen
        ></iframe>
      </Modal>

      <div className="journ-section">
        <h4>Journey</h4>
        <div>
          <button onClick={() => handleMaintance()} className="btn right" style={{ display: 'inline-block' }}>
            Set reading goal <i className="fas fa-arrow-right"></i>
          </button>
          <button onClick={() => handleMaintance()} className="btn ms-3 pt-0 left" style={{ width: '160px', height: '45px', display: 'inline-block' }}>
            <span className="small" style={{ fontSize: '10px', paddingBottom: '0px' }}>Weekly</span>
            <br className="custom-br" />
            <span className="small" style={{ paddingTop: '0px' }}>-1 tracked</span>
          </button>
          <button onClick={() => handleMaintance()} className="btn ms-3 pt-0 left" style={{ width: '160px', height: '45px', display: 'inline-block', alignContent: 'center', justifyContent: 'center', paddingTop: '0px' }}>
            <span className='small' style={{ marginTop: '5px', paddingTop: '5px' }}>Days Prayed</span>
            <span>--</span>
          </button>
          <button onClick={() => handleMaintance()} className="btn ms-3 pt-0 left" style={{ width: '160px', height: '45px', display: 'inline-block' }}>
            <span className="small" style={{ fontSize: '10px', paddingBottom: '0px' }}>Weekly</span>
            <br className="custom-br" />
            <span className="small" style={{ paddingTop: '0px' }}>-1 tracked</span>
          </button>
        </div>
      </div>

      <div className="more-buttons">
        <Row>
          <Col xs={2} style={{ textAlign: 'center' }}>
            <div onClick={() => handleMaintance()}>
              <i class="fa-solid fa-ellipsis p-3" style={{ color: 'white', backgroundColor: 'grey', borderRadius: '25px', cursor: 'pointer' }}></i>
              More
            </div>
          </Col>

          <Col xs={2} style={{ textAlign: 'center' }}>
            <div onClick={() => handleMaintance()}>
              <i class="fa-solid fa-compass  fs-1" style={{ color: 'white', borderRadius: '25px', backgroundColor: 'grey', cursor: 'pointer', padding: '10px' }}></i>
              Qibla
            </div>
          </Col>

          <Col xs={2} style={{ textAlign: 'center' }}>
            <div onClick={() => handleMaintance()}>
              <i class="fa-solid fa-hands-holding p-3" style={{ color: 'white', backgroundColor: 'grey', borderRadius: '25px', cursor: 'pointer' }}></i>
              Duas
            </div>
          </Col>

          <Col xs={2} style={{ textAlign: 'center' }}>
            <div onClick={() => handleMaintance()}>
              <i class="fa-solid fa-video p-3" style={{ color: 'white', backgroundColor: 'grey', borderRadius: '25px', cursor: 'pointer' }}></i>
              Live
            </div>
          </Col>

          <Col xs={2} style={{ textAlign: 'center' }}>
            <div onClick={() => handleMaintance()}>
              <i class="fa-solid fa-book-open p-3" style={{ color: 'white', backgroundColor: 'grey', borderRadius: '25px', cursor: 'pointer' }}></i>
              Ilm
            </div>
          </Col>

          <Col xs={2} style={{ textAlign: 'center' }}>
            <div onClick={() => handleMaintance()}>
              <i class="fa-solid fa-circle-plus p-3" style={{ color: 'white', backgroundColor: 'grey', borderRadius: '25px', cursor: 'pointer' }}></i>
              Tasbih
            </div>
          </Col>

        </Row>


      </div>

      <Qalbox />

    </div>
  );
}

// Helper function to format time remaining
const formatTimeRemaining = (milliseconds) => {
  const totalSeconds = Math.round(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

export default Home;
