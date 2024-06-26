import React from 'react'
import { Link } from 'react-router-dom';

const Buttondashboard = () => {
  return (
    <div>
        <Link to ="app/dashboard">
        <button>Your Dashboard</button>
        </Link>
      
    </div>
  )
}

export default Buttondashboard
