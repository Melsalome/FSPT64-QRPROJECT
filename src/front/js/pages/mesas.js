import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import "../../styles/mesas.css";
import iconoMesas from "../../img/icono-mesa.png";
import iconoCanto from "../../img/barraCantoTransp.png";
import iconoBarra from "../../img/barraVertTransp.png";
import suelo from "../../img/suelo506.png";
import { Context } from '../store/appContext';

const Mesas = () => {
    const [mesas, setMesas] = useState([]);
    const [angulosRotacion, setAngulosRotacion] = useState({});
    const [modoEdicion, setModoEdicion] = useState(false);
    const [nombreSalon, setNombreSalon] = useState('Salón 1');
    const [largoSala, setLargoSala] = useState(10);
    const [anchoSala, setAnchoSala] = useState(15);
    const [tempLargoSala, setTempLargoSala] = useState('10');
    const [tempAnchoSala, setTempAnchoSala] = useState('15');
    const {store, actions} = useContext(Context)

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

    
    const agregarMesa = async(icono) => {
        const maxId = mesas.reduce((max, mesa) => Math.max(max, mesa.id), 0);
       
        const nuevaMesa = {
            id: maxId + 1,
            table_number: `${maxId + 1}`,
            posicion: { x: 0, y: 10 },
            icono: icono,
        };
        await actions.createNewTable(nuevaMesa.table_number)
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

    const eliminarMesa = async(table_number) => {
        await actions.delete_table(table_number)
        const updatedTables = mesas.filter(mesa => console.log(mesa.id) !== id)
       
        setMesas(...mesas, updatedTables);
        
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


    useEffect(() => {
        
        const mesasGuardadas = localStorage.getItem('mesas');
        const angulosGuardados = localStorage.getItem('angulosRotacion');
        const largoSalaGuardado = localStorage.getItem('largoSala');
        const anchoSalaGuardado = localStorage.getItem('anchoSala');
        const tempLargoSalaGuardado = localStorage.getItem('tempLargoSala');
        const tempAnchoSalaGuardado = localStorage.getItem('tempAnchoSala');
        const nombreSalonGuardado = localStorage.getItem('nombreSalon');
      
        if (mesasGuardadas) setMesas(JSON.parse(mesasGuardadas));
        if (angulosGuardados) setAngulosRotacion(JSON.parse(angulosGuardados));
        if (largoSalaGuardado) setLargoSala(JSON.parse(largoSalaGuardado));
        if (anchoSalaGuardado) setAnchoSala(JSON.parse(anchoSalaGuardado));
        if (tempLargoSalaGuardado) setTempLargoSala(JSON.parse(tempLargoSalaGuardado));
        if (tempAnchoSalaGuardado) setTempAnchoSala(JSON.parse(tempAnchoSalaGuardado));
        if (nombreSalonGuardado) setNombreSalon(nombreSalonGuardado);
      }, []);
      
      const guardarEstado = () => {
    
        localStorage.setItem('mesas', JSON.stringify(mesas));
        localStorage.setItem('angulosRotacion', JSON.stringify(angulosRotacion));
        localStorage.setItem('largoSala', JSON.stringify(largoSala));
        localStorage.setItem('anchoSala', JSON.stringify(anchoSala));
        localStorage.setItem('tempLargoSala', JSON.stringify(tempLargoSala));
        localStorage.setItem('tempAnchoSala', JSON.stringify(tempAnchoSala));
        localStorage.setItem('nombreSalon', nombreSalon);
        alert('Guardado con éxito');
      };

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
                                        zIndex: parseInt(mesa.table_number.replace(/\D/g, '')) || 1
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
                                                defaultValue={mesa.table_number}
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
                            <button className='guardar' onClick={guardarEstado}>Guardar</button>
                            <Link to="../app/dashboard" className='link-boton-dash'>
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
