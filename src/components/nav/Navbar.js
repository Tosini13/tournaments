import React from 'react'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { NavBar } from '../style/styledLayouts'

const Navbar = (props) => {
    const { auth, toggleSideBarMenu } = props;
    const links = auth.uid ? <SignedInLinks profile={props.profile} /> : <SignedOutLinks />;
    return (
        <NavBar>
            <div className='container'>
                {links}
            </div>
            <IconButton onClick={toggleSideBarMenu}>
                <MenuIcon />
            </IconButton>
        </NavBar>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)