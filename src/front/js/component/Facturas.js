import React from 'react'
import { Link } from 'react-router-dom';


const Facturas = () => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Restaurant id</th>
                        <th>Order id</th>
                        <th>Total price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Fila 1, Col 1</td>
                        <td>Fila 1, Col 2</td>
                        <td>Fila 1, Col 3</td>
                        <td>Fila 1, Col 4</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Facturas
