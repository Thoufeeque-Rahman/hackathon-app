import React, { useEffect, useState } from 'react';
import './ReadSurah.css'

function ReadSurah() {
  const surahNumber = window.location.pathname.split('/').pop();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://quranapi.pages.dev/api/${surahNumber}.json`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data)
      });
  }, []);

  return (
    <div className="read-surah pb-5 mb-3">
      <div className="read-head shadow-sm pt-3 pb-3 p-3  sticky-top d-flex justify-content-between align-items-center" style={{ backgroundColor: '#9eb194' }}>
        <i className='fa fa-arrow-left fs-3 me-2' onClick={() => window.history.back()}></i>
        <div className='text-center'>
          <h4 className='m-0'>{data ? data.surahName : 'Loading...'}</h4>
          <p className='m-0 fs-6'>{data ? data.surahNameTranslation : 'Loading...'}</p>
        </div>
        <i className='fa fa-ellipsis-vertical fs-3'></i>

      </div>
      <div className="p-3 text-end">
        <h1 className='text-center mt-3'>﴾  {data ? data.surahNameArabicLong : 'Loading...'}  ﴿</h1>
        {/* <h2 className='bismi-text text-center mt-4'>﷽</h2> */}
        {surahNumber !== '1' && <h2 className='bismi-text text-center mt-4'>﷽</h2>}
        {data ? (
          <p className='text-center lh-lg mt-4'>
            {data.arabic1.join(' ۝ ')}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ReadSurah;
