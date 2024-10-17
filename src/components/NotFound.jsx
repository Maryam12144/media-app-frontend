import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <div className="main-wrapper">
                <div className="wrap">
                    <div className="thankyou-wrap  px-5 py-40 text-center">
                        <h1 className='text-white text-2xl mb-1'>404 Page Not Found</h1>
                        <p className='text-slate-500 mb-4'>Sorry, the page you're looking for doesn't exist. </p>
                        <Link to="/" className='bg-white px-4 py-2 text-black hover:text-black'>Back to Home</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound