import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutMenu = () => {
    return (
        <ul className='right'>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to='/signup'>Sign up</NavLink></li>
            <li><NavLink to='/signin'>Log in</NavLink></li>
        </ul>
    )
}

export default SignedOutMenu