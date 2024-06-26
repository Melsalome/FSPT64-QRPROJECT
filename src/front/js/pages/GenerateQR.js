import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/GenerateQR.css";
import { useNavigate } from "react-router-dom";


export const GenerateQR = () => {
    const navigate = useNavigate();

    const irADashboard = () => {
        navigate('../app/dashboard');
    };
    const [restaurantId, setRestaurantId] = useState('');
    const [tableId, setTableId] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/restaurants/${restaurantId}/tables/${tableId}/generate_qr`, {
                method: 'GET',

            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setQrCodeUrl(url);
        } catch (error) {
            console.error('Error generating QR code', error);
        }
    };

    return (
        <section className='section-qr'>
            <div className='container-qr'>
                <h1>Generate QR Code</h1>

                <form onSubmit={handleSubmit}>
                    <div className='forms-qr'>
                        <div className='form-id-restaurant'>
                            <label>
                                Restaurant ID:</label>
                                <input
                                    type="text"
                                    value={restaurantId}
                                    onChange={(e) => setRestaurantId(e.target.value)}
                                    required
                                />
                            
                        </div>
                        <div className='form-id-table'>
                            <label>
                                Table ID:</label>
                                <input
                                    type="text"
                                    value={tableId}
                                    onChange={(e) => setTableId(e.target.value)}
                                    required
                                />
                            
                        </div>
                        
                    </div>
                    <div className='buttons-qr'>
                    <button className='generate-button' type="submit">Generate QR Code</button>
                    <button onClick={irADashboard} className='dash-button'>Dashboard</button>
                    </div>
                </form>



                {qrCodeUrl && (
                    <div>
                        <h2>QR Code:</h2>
                        <img src={qrCodeUrl} alt="QR Code" />
                    </div>
                )}
            </div>
        </section >
    );
};
