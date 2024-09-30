import React, { useEffect, useState } from 'react';
import './Quran.css';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Quran() {
  let chapters = [];
  const [data, setData] = useState(null); // using State
  const msg = 'hi';
  useEffect(() => {
    fetch('https://quranapi.pages.dev/api/surah.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        chapters = data; // Assign data to chapters
        setData(data); // Update state with fetched data
      });

    console.log(chapters);
  }, []);

  const navigate = useNavigate()

  const handleSurah = (surahNumber) => {
    navigate(`/Quran/read-surah/${surahNumber}`)
    console.log(`clicked ${surahNumber}`);
  }

  return (
    <div className="quran pb-5">
      <div className="quran-head shadow-sm p-3 sticky-top d-flex justify-content-between align-items-center" style={{ backgroundColor: '#9eb194' }}>
        <h4 className='m-0'>Quran</h4>
        <i className='fa fa-gear'></i>
      </div>
      <div className="quran-table p-3 pb-5">
        <div className='px-2 text-center' style={{ background: 'white', color: '#9eb194', paddingTop: '5px', paddingBottom: '3px', borderRadius: '20px', width: 'fit-content' }}>
          <p className='m-0'>Surah</p>
        </div>
        {data ? ( // Check if data is available
          // Render your content based on the fetched data
          data.map((chapter, index) => (
            <div key={chapter.id} onClick={() => handleSurah(index + 1)}>
              <Row className='d-flex mt-3 pt-2 justify-content-between align-items-center container'>
                <Col xs={2}>
                  <div>
                    <h1 style={{ color: '#f2e9da' }}>{index + 1}</h1>
                  </div>
                </Col>
                <Col xs={6}>
                  <div>
                    <h1 className='fs-2 m-0'>{chapter.surahName}</h1>
                    <p>{chapter.surahNameTranslation}</p>
                  </div>
                </Col>
                <Col >
                  <div className='text-end'>
                    <h1 className='surahNameArabic fs-1 m-0'>{chapter.surahNameArabic}</h1>
                    <p>{chapter.totalAyah} Verses</p>
                  </div>
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <p>Loading...</p> // Display loading message while fetching data
        )}

      </div>
    </div>
  );
}

export default Quran;
