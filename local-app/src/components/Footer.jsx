import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-green-200'>
            <h1 className='font-bold md:text-3xl text-xl text-center'>
                <span className='text-green-500'>&lt;</span>
                <span>MyPassword</span>
                <span className='text-green-500 font-bold md:text-3xl text-center text-xl'>Vault/&gt;</span>
            </h1>
            <div className='flex items-center justify-center font-bold'>Simple. Secure. Stored with you.</div>
            <div className='flex items-center justify-center mt-2.5'>All rights are reserved.</div>
        </footer>
    )
}

export default Footer
