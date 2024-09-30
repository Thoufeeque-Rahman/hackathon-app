import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import './Prayer.css'
function Prayer() {
  const [data, setData] = React.useState(null); // using State

  useEffect(() => {
    getLocation()
    const date = new Date()
    const formattedDate = date.toLocaleDateString('en-GB', { // Use en-GB locale for dd-mm-yyyy format
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    console.log(formattedDate)
    const latitude = 11.092555
    const longitude = 76.223289
    fetch(`https://api.aladhan.com/v1/timings?${formattedDate}&latitude=${latitude}&longitude=${longitude}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.timings.Fajr);
        setData(data); // Update state with fetched data
      });
  })


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    const latitude = position.coords
      .latitude;
    const longitude = position.coords.longitude;

    // Do something with the latitude and longitude, e.g., display them
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);
    // You can store these values in state variables or use them in an API call.
  }

  // Call the getLocation function to initiate the process



  const timings = data?.data?.timings;

  let filteredTimings = null; // Initialize filteredTimings

  if (timings) { // Check if timings is defined
    filteredTimings = Object.fromEntries(
      Object.entries(timings)
        .filter(([prayer]) => !['Sunset', 'Imsak', 'Midnight', 'Firstthird', 'Lastthird'].includes(prayer))
    );
  }




  return (
    <div className='prayer-container d-flex flex-column pb-5 mb-5' style={{ width: '100%', backgroundColor: "#9eb194", color: '#fef7f0' }}>
      {data ? (

        <div>
          <div className='prayer-head shadow-sm p-2  sticky-top '>
            <h2 className='prayer-heading ms-3 m-0 pt-2'>Prayers</h2>
            <p className='location ms-3'>{data?.data?.meta?.method.name}</p>
          </div>

          <div className="prayer-timings-container ms-5 me-5 mt-3">
            <div className='mb-5'>
              <h2 className="text-center m-0">Today, {data?.data?.date?.readable}</h2>
              <p className='text-center '>{data?.data?.date?.hijri.day} {data?.data?.date?.hijri.month.en} | {data?.data?.date?.hijri.year}</p>
            </div>
            <div className="d-flex flex-column gap-3">
              {filteredTimings && Object.entries(filteredTimings).map(([prayer, time]) => (
                <div>
                  <Row className='d-flex mt- pt- justify-content-between align-items-center container'>
                    <Col >
                      <div>
                        <h5 className='text-start'>{prayer}</h5>
                      </div>
                    </Col>
                    <Col >
                      <div>
                        <h5 className='text-end'>{time}</h5>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Suggested code may be subject to a license. Learn more: ~LicenseLog:567575206.
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Prayer;

