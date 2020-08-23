import React from 'react'
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { connect } from 'react-redux'

import { MenuSideBarContainerStyled } from '../style/styledLayouts'
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

const MenuSideBar = (props) => {

    const { sideBarMenu, user, toggleSideBarMenu, auth } = props;

    const chooseMenuOption = (action) => {
        if (action) action();
        toggleSideBarMenu();
    }

    return (
        <MenuSideBarContainerStyled open={sideBarMenu}>
            {auth.uid ?
                <SignedInMenu user={user} chooseMenuOption={chooseMenuOption} />
                :
                <SignedOutMenu chooseMenuOption={chooseMenuOption} />
            }
        </MenuSideBarContainerStyled>
    )
}

const mapStateToProps = (state) => {
    const user = state.firestore.ordered.users?.find(user => user.id === state.firebase.auth.uid)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        user
    }
}

export default compose(connect(mapStateToProps), firestoreConnect(props => {
    return [
        { collection: 'users' }
    ]
}))(MenuSideBar);