import React from 'react'
import { NavLink } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {

    return (
        <ul className='right'>
            <li><NavLink to='/create'>New Tournament</NavLink></li>
            {/* <li><a href='#signout' onClick={props.singOut}>Log out</a></li> */}
            {/* <li><NavLink to='/' className='btn btn-floating pink lighten-1'>{props.profile.initials}</NavLink></li> */}
        </ul>
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         singOut: () => { dispatch(signOut()) }
//     }
// }

// export default connect(null, mapDispatchToProps)(SignedInLinks)
export default SignedInLinks