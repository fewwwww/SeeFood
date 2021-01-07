import React from 'react';
import Tilty from 'react-tilty';
import './Logo.css';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilty className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner"> 👽 </div>
            </Tilty>
        </div>
    )
};

export default Logo;