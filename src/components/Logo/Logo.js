import React from 'react';
import Tilty from 'react-tilty';
import './Logo.css';
import brain from './brain.png'

const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilty className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 120, width: 110 }} >
                <div className="Tilt-inner"><img style={{paddingTop: '5px'}} alt='brain logo' src={brain}></img></div>
            </Tilty>
        </div>
    )
};

export default Logo;