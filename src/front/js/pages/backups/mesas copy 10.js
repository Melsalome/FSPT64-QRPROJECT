import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../../styles/mesas.css";
import iconoMesas from "../../img/icono-mesa.png";
import iconoCanto from "../../img/barraCantoTransp.png";
import iconoBarra from "../../img/barraVertTransp.png";
import suelo from "../../img/suelo506.png";

const Mesas = () => {
    const [mesas, setMesas] = useState([]);
    const [angulosRotacion, setAngulosRotacion] = useState({});
    const [modoEdicion, setModoEdicion] = useState(false);
    const [nombreSalon, setNombreSalon] = useState('Salón 1');
    const [largoSala, setLargoSala] = useState(10);
    const [anchoSala, setAnchoSala] = useState(15);
    const [tempLargoSala, setTempLargoSala] = useState('10');
    const [tempAnchoSala, setTempAnchoSala] = useState('15');

    const girarMesa = (idMesa) => {
        setAngulosRotacion((prevAngulos) => {
            const anguloActual = prevAngulos[idMesa] || 0;
            const nuevoAngulo = anguloActual + 90;
            if (nuevoAngulo >= 360) {
                return { ...prevAngulos, [idMesa]: 0 };
            }
            return { ...prevAngulos, [idMesa]: nuevoAngulo };
        });
    };

    const agregarMesa = (icono) => {
        const maxId = mesas.reduce((max, mesa) => Math.max(max, mesa.id), 0);
        const nuevaMesa = {
            id: maxId + 1,
            nombre: `${maxId + 1}`,
            posicion: { x: 0, y: 10 },
            icono: icono,
        };
        setMesas([...mesas, nuevaMesa]);
    };

    const moverMesa = (id, nuevaPosicion) => {
        setMesas(mesas.map(mesa => {
            if (mesa.id === id) {
                return { ...mesa, posicion: nuevaPosicion };
            }
            return mesa;
        }));
    };

    const iniciarArrastre = (e, id) => {
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.setDragImage(e.target, 25, 25);
    };

    function finalizarArrastre(e) {
        e.target.style.zIndex = '';
    }

    const permitirSoltar = (e) => {
        e.preventDefault();
    };

    const actualizarTamañoSala = () => {
        const proporcion = 55;
        const nuevoAncho = anchoSala * proporcion;
        const nuevoAlto = largoSala * proporcion;
        const divSala = document.querySelector('.sala');
        if (divSala) {
            divSala.style.width = `${nuevoAncho}px`;
            divSala.style.height = `${nuevoAlto}px`;
        }
    };

    const eliminarMesa = (id) => {
        setMesas(mesas.filter(mesa => mesa.id !== id));
    };

    const manejarSoltar = (e) => {
        e.preventDefault();
        const contenedor = e.target.getBoundingClientRect();
        const id = e.dataTransfer.getData("text/plain");
        const ajusteX = 46;
        const ajusteY = 46;
        const nuevaPosicion = {
            x: e.clientX - contenedor.left - ajusteX,
            y: e.clientY - contenedor.top - ajusteY
        };
        moverMesa(parseInt(id), nuevaPosicion);
    };

    const actualizarNombreMesa = (id, nuevoNombre) => {
        setMesas(mesasPrevias => mesasPrevias.map(mesa =>
            mesa.id === id ? { ...mesa, nombre: nuevoNombre } : mesa
        ));
    };

    useEffect(() => {
        if (tempLargoSala != null && tempAnchoSala != null) {
            setLargoSala(tempLargoSala);
            setAnchoSala(tempAnchoSala);
        }
    }, [tempLargoSala, tempAnchoSala]);

    useEffect(() => {
        actualizarTamañoSala();
    }, [largoSala, anchoSala]);

    return (
        <>
            <section>
                <div className='principal'>
                    <div className='container-mesas1'>
                        <h3>Agregar Mesa</h3>
                        <img src={iconoMesas} alt="Agregar Mesa" onClick={() => agregarMesa(iconoMesas)} style={{ cursor: 'pointer', width: '50px', height: '50px' }} />
                        <img src={iconoBarra} alt="Agregar Mesa" onClick={() => agregarMesa(iconoBarra)} style={{ cursor: 'pointer', width: '50px', height: '50px' }} />
                        <img src={iconoCanto} alt="Agregar Mesa" onClick={() => agregarMesa(iconoCanto)} style={{ cursor: 'pointer', width: '50px', height: '50px' }} />
                        <button className='editar' onClick={() => setModoEdicion(!modoEdicion)}>Editar elementos</button>
                    </div>
                    <div className='top-bottom-container'>
                        <h3>{nombreSalon}</h3>
                        <div
                            className="sala container-mesas"
                            style={{ width: '1080px', height: '600px', position: 'relative', border: '1px solid black', backgroundImage: `url(${suelo})`, backgroundSize: '110px', backgroundPosition: 'center' }}
                            onDragOver={permitirSoltar}
                            onDrop={manejarSoltar}
                        >
                            {mesas.map((mesa) => (
                                <div
                                    key={mesa.id}
                                    draggable={!modoEdicion}
                                    onDragStart={(e) => iniciarArrastre(e, mesa.id)}
                                    onDragEnd={finalizarArrastre}
                                    style={{
                                        cursor: 'grab',
                                        color: 'white',
                                        position: 'absolute',
                                        left: mesa.posicion.x,
                                        top: mesa.posicion.y,
                                        zIndex: parseInt(mesa.nombre.replace(/\D/g, '')) || 1
                                    }}
                                    className="mesa-container"
                                >
                                    <img
                                        src={mesa.icono}
                                        alt="Mesa"
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            transform: `rotate(${angulosRotacion[mesa.id] || 0}deg)`,
                                            transition: 'transform 0.3s ease-in-out'
                                        }}
                                    />
                                    {modoEdicion ? (
                                        <>
                                            <input
                                                className='input-nombre-mesa'
                                                type="text"
                                                defaultValue={mesa.nombre}
                                                onBlur={(e) => actualizarNombreMesa(mesa.id, e.target.value)}
                                            />
                                            <button className='eliminar-mesa' onClick={() => eliminarMesa(mesa.id)} style={{ position: 'absolute', transform: 'translateX(-50%)', backgroundColor: 'red', color: 'white' }}>X</button>
                                            <button className='girar-mesa' onClick={() => girarMesa(mesa.id)} style={{ position: 'absolute', transform: 'translateX(-50%)', bottom: '-20px' }}>⭮</button>
                                        </>
                                    ) : (
                                        <div className='numeroMesa'>{mesa.nombre}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='container-mesas'>
                        <h3>Editar<br />Salón</h3>
                        <div className='sala-container'>
                            <p className='titulos'>Nombre<br /> del salón</p>
                            <input className='nombre-sala' type="text" value={nombreSalon} onChange={(e) => setNombreSalon(e.target.value)} placeholder="Nombre" />
                        </div>
                        <h3>Tamaño</h3>
                        <div className='sala-container'>
                            <p className='titulos'>Largo m</p>
                            <input
                                type="number"
                                className='nombre-sala'
                                value={tempLargoSala}
                                onChange={(e) => {
                                    setTempLargoSala(e.target.value);
                                    e.target.focus();
                                }}
                                placeholder="Largo"
                            />
                            <p className='titulos'>Ancho m</p>
                            <input
                                type="number"
                                className='nombre-sala'
                                value={tempAnchoSala}
                                onChange={(e) => {
                                    setTempAnchoSala(e.target.value);
                                    e.target.focus();
                                }}
                                placeholder="Ancho"
                            />
                            <button className='guardar'>Guardar</button>
                            <Link to="../app/dashboard">
                            <button className='salir'>Salir</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Mesas;
