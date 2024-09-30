import React from 'react'

function Maintenance() {
    return (
        <div className='position-relative text-center' style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <div className='position-absolute top-50 start-50 translate-middle'>
                <i style={{ fontSize: '100px' }} class="fa-solid fa-person-digging mb-3"></i>
                <p>This Page is under Maintanance! Visit later.</p>
            </div>
        </div>
    )
}

export default Maintenance