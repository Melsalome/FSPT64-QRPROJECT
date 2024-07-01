import React, { useState } from 'react';
import mesagreen from "../../img/mesagreen.png"
import mesaYellow from "../../img/mesaYellow.png"

const Mesa = ({ mesa, onClick, angulo }) => {
   
    const [isSelected, setIsSelected] = useState(false);

    const mesaImage = isSelected ? mesaYellow : (mesa.isActive ? mesagreen : mesa.icono);

    
    const handleClick = (e) => {
        onClick(e); 
        setIsSelected(!isSelected); 
    };
    return (
        <div
            style={{
                color: 'white',
                position: 'absolute',
                left: `${mesa.posicion.x}px`,
                top: `${mesa.posicion.y}px`,
                visibility: 'visible'
            }}
            className="mesa-container"
            onClick={handleClick}
        >
            <img
                
                src={mesaImage}
                alt="Mesa"
                
                style={{
                    width: '60px',
                    height: '60px',
                    transform: `rotate(${angulo || 0}deg)`,
                    transition: 'transform 0.3s ease-in-out'
                }}
            />
            <div className="numeroMesa">{mesa.table_number}</div>
        </div>
    );
};

export default Mesa;