import React from "react";

//include images into your bundle

import Fondo from "../../img/orange.png";
import Melisa from "../../img/Melisa.jpg"
import Rocio from "../../img/Rocio.jpeg"
import Jordi from "../../img/Jordi.jpg"
import AnhTu from "../../img/Anh-Tu.jpg"
import "../../styles/AboutUs.css";;


//create your first component
export const teamMembers = [
    {
        name: "Anh Tu Nguyen",
        alias: "TuNa",
        img: AnhTu,
        description: "Me formé y trabajé en el sector de Economía. Ahora soy un Developer entusiasmada de aprender cosas nuevas y resolver los problemas en el mundo de la programación. Si no me encuentra escribiendo códigos, estoy con mis preciosos hijos o leyendo un libro."
    },
    {
        name: "Melisa Navarro",
        alias: "Phoenix",
        img: Melisa,
        description: "Hoy en día, me dedico a explorar y expandir los límites de mi conocimiento en desarrollo de software. Me entusiasma aprender continuamente y aplicar nuevas tecnologías. Fuera del entorno de código y compilaciones, me encontrarás practicando Fitboxing, me considero ávido lectora y espectadora."
    },
    {
        name: "Rocio Martín",
        alias: "Leela",
        img: Rocio,
        description: "Soy Rocío, decidí cambiar de la Educación Social al mundo de la programación para dar un giro a mi vida. Me apasiona la música, el cine, la literatura y la naturaleza."
    },
    {
        name: "Jordi Goixart",
        alias: "DevConKai",
        img: Jordi,
        description: "He sido técnico de diálisis durante la mayor parte de mi vida laboral y después, al ver como cada vez, el mundo de la informática me ha ido gustando más y más, finalmente me decidí a ser Sofware Developer."
    },
];

export const AboutUs = () => {
    return (
        <div className="about-us-container" style={{ backgroundImage: `url(${Fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className="title"><b>About Us</b></h1>
            <div className="principal-about">
                {teamMembers.map((member, index) => (
                    <div className="vuelta alt" key={index}>
                        <div className="card">
                            <div className="front borders">
                                <div className="foto">
                                    <img className="foto-img" src={member.img} alt={member.name} />
                                </div>
                                <div className="datos-front">
                                    <div className="name">
                                        <h2>{member.name}</h2>
                                    </div>
                                    <div className="alias">
                                        <span>Alias: <b>{member.alias}</b></span>
                                    </div>
                                </div>
                            </div>
                            <div className="back borders">
                                <div className="datos">
                                    <p>{member.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};