import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/AuthActions'

const SignedInLinks = (props) => {
    console.log(props);
    return (
        <ul className=''>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to='/create'>New Tournament</NavLink></li>
            <li><a href='#signout' onClick={props.singOut}>Log out</a></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        singOut: () => { dispatch(signOut()) }
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)