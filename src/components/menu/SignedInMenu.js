import React from 'react'
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/AuthActions'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Divider from '@material-ui/core/Divider';

import { MenuLinkStyled } from '../style/styledLayouts';

const SignedInMenu = (props) => {

    const { user, chooseMenuOption } = props;

    return (
        <List>
            <ListItem>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={user?.login} />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => {
                chooseMenuOption();
            }}>
                <MenuLinkStyled to={'/create'}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Stwórz turniej" />
                </MenuLinkStyled>
            </ListItem>
            <ListItem button onClick={() => {
                chooseMenuOption();
            }}>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Moje turnieje" />
            </ListItem>
            <ListItem button onClick={() => {
                chooseMenuOption(props.singOut);
            }}>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Wyloguj" />
            </ListItem>
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