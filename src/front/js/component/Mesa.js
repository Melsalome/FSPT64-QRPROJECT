import React from 'react';
import mesagreen from "../../img/mesagreen.png";

const Mesa = ({ mesa, onClick, angulo, isSelected, onDeselect }) => {

    const handleClick = () => {
        if (isSelected) {
            onDeselect(); // Llama a la función para deseleccionar la mesa
        } else {
            onClick(); // Llama a la función para seleccionar la mesa
        }
    };

    return (
        <div
            style={{
                color: 'white',
                position: 'absolute',
                left: `${mesa.position_x}px`,
                top: `${mesa.position_y}px`,
                visibility: 'visible'
            }}
            className="mesa-container"
            onClick={handleClick}
        >
            <img
                src={mesa.icono}
                alt="Mesa"
                className={` ${isSelected ? 'img-resplandor' : ''} ${mesa.isActive ? 'filtros-mesa' : ''}`}
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

