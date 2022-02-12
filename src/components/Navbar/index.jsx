import React, { useState } from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <>
            <div className="navbardiv">
                <NavLink className="navlogo" to="/" exact='true'><img src="/images/server-icon.png" height="60px" alt="Sw2"/></NavLink>
                <header className="navbar">
                    <div className="navbox"><NavLink className="navlink" activeclassname="active" to='/' exact='true'>Home</NavLink></div>
                    <div className="navbox"><NavLink className="navlink" activeclassname="active" to='/about'>Skin</NavLink></div>
                    <div className="navbox"><NavLink className="navlink" activeclassname="active" to='/education'>About US</NavLink></div>
                </header>
                <div className='MobileDiv' onClick={handleClick}>{
                    click ? <AiOutlineClose className='MobileBar' /> : <FaBars className='MobileBar' />
                }</div>
            </div>
            <div className={click ? 'Mobile' : 'MobileClose'}>
                <NavLink className="mobilelink" onClick={handleClick} activeclassname="active" to='/' exact='true'>Home</NavLink>
                <NavLink className="mobilelink" onClick={handleClick} activeclassname="active" to='/about'>Skin</NavLink>
                <NavLink className="mobilelink" onClick={handleClick} activeclassname="active" to='/education'>About</NavLink>
            </div>
        </>
    )
}

export default Navbar