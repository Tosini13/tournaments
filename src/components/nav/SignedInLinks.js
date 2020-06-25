import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/AuthActions'

const SignedInLinks = (props) => {
    console.log(props);
    return (
        <ul className=''>
            <li><NavLink to={'/'}><i className='icon-trophy'></i><span className='desktop'>Home</span></NavLink></li>
            <li><NavLink to='/create'><i className='icon-plus'></i><span className='desktop'>New Tournament</span></NavLink></li>
            <li><a href='#signout' onClick={props.singOut}><i className='icon-off'></i><span className='desktop'>Log out</span></a></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        singOut: () => { dispatch(signOut()) }
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)