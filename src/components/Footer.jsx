import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='flex flex-row items-center justify-center  bg-gray-900 '>
            <p className='text-lg font-medium text-white' >Copyright © {currentYear} AlTarek. All rights reserved.</p>
        </div>
    );
};

export default Footer;
