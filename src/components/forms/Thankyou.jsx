import React from 'react'
import Navbar from '../Navbar'
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';


const Thankyou = () => {
    return (
        <>
            <div className="main-wrapper">
                <div className="wrap">
                    <Navbar />
                    <div className="thankyou-wrap  px-5 py-40 text-center">
                        <CheckCircleOutlined className="!text-green-500 text-7xl mb-3" />
                        <h1 className='text-white text-2xl mb-1'>Your video has been Successfully uploaded.</h1>
                        <p className='text-slate-500 mb-4'>Video will be published after approval.</p>
                        <Link to="/upload-video" className='bg-white px-4 py-2 text-black hover:text-black'>Add other Video</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Thankyou