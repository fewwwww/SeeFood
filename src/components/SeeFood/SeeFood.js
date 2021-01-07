import React from 'react';

const SeeFood = ({imageUrl}) => {
    return(
        <div className='center ma' style={{paddingBottom:'100px', display:"flex", justifyContent:"space-around"}}>
            <div className='mt2'>
                <img alt='' src={imageUrl} width='500px' height='auto'/>
            </div>
            <h3 id='foodList' style={{textAlign:"justify"}}> </h3>
        </div>
    )
};

export default SeeFood;