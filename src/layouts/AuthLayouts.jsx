import React from 'react';
import Navbar from '../pages/Home/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';

const AuthLayouts = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='flex bg-white'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                
            </div>
        </div>
    );
};

export default AuthLayouts;