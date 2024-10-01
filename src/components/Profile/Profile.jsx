import React from 'react';
import './Profile.css'; // Make sure to create this CSS file with the same styles.

const Profile = () => {

  const handleMaintance = () => {
    navigate('/maint')
  }
  return (
    <div className='pb-5 mb-3 p-2'>
      <div className="profile-section">
        <img
          alt="Profile"
          src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
          width="100"
          height="100"
        />
        <br />
        <button onClick={() => handleMaintance()} className="btn-premium">Donate</button>
        <p>Join our global community for helping the poorest muslims!</p>
        <button onClick={() => handleMaintance()} className="btn-create-account">Create free account</button>
      </div>

      <div className="journey-section">
        <h4>Journey</h4>
        <button onClick={() => handleMaintance()} className="btn right">
          Set reading goal <i className="fas fa-arrow-right"></i>
        </button>
        <button onClick={() => handleMaintance()} className="btn ms-3 pt-0 left" style={{ width: '160px', height: '45px' }}>
          <span className="small m-0" style={{ fontSize: '10px' }}>Weekly</span>
          <br className='custom-br' />
          <span className='small '>-1 tracked</span>
        </button>

        <div className="progress-section">
          <div className="progress-item">
            <span>Days Prayed</span>
            <span>--</span>
          </div>
          <div className="progress-item">
            <span>Khatams</span>
            <span>--</span>
          </div>
        </div>
      </div>

      <div className="streak-section">
        <h4>Streak</h4>
        <div className="streak-item">
          <span>Daily Streak: Tap to Check In</span>
          <span>0</span>
        </div>
      </div>

      <div className="ad-banner mb-5">
        <p>Join our global community for helping the poorest muslims!</p>
        <button onClick={() => handleMaintance()} className="btn-premium bt">Donate Now</button>
      </div>
    </div>
  );
};

export default Profile;
