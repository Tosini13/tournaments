import React from 'react'
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from 'react-redux'
import { signOut } from '../../../store/actions/AuthActions'

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import LockIcon from '@material-ui/icons/Lock';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import { ListItemStyled } from '../../style/styledLayouts';
import { MenuLinkStyled } from '../../style/styleNav';

const SignedInMenu = (props) => {

    const { user, chooseMenuOption } = props;

    return (
        <List>
            <ListItemStyled>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={user?.login} />
            </ListItemStyled>
            <ListItemStyled button onClick={() => {
                chooseMenuOption();
            }}>
                <MenuLinkStyled to={'/create'}>
                    <ListItemIcon>
                        <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Stwórz turniej" />
                </MenuLinkStyled>
            </ListItemStyled>
            <ListItemStyled button onClick={() => {
                chooseMenuOption();
            }}>
                <MenuLinkStyled to={'/'}>
                    <ListItemIcon>
                        <EmojiEventsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Turnieje" />
                </MenuLinkStyled>
            </ListItemStyled>
            <ListItemStyled button onClick={() => {
                chooseMenuOption();
            }}>
                <ListItemIcon>
                    <SportsSoccerIcon />
                </ListItemIcon>
                <ListItemText primary="Moje turnieje" />
            </ListItemStyled>
            <ListItemStyled button onClick={() => {
                chooseMenuOption(props.singOut);
            }}>
                <ListItemIcon>
                    <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Wyloguj" />
            </ListItemStyled>
        </List>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        singOut: () => { dispatch(signOut()) }
    }
}


export default compose(connect(null, mapDispatchToProps), firestoreConnect(props => {
    return [
        { collection: 'users' }
    ]
}))(SignedInMenu);