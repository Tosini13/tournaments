import React from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Divider from '@material-ui/core/Divider';

import { MenuLinkStyled } from '../style/styledLayouts';

const SignedOutMenu = (props) => {

    const { chooseMenuOption } = props;

    return (
        <List>
            <ListItem button onClick={() => {
                chooseMenuOption();
            }}>
                <MenuLinkStyled to={'/signin'}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Zaloguj'} />
                </MenuLinkStyled>
            </ListItem>
            <Divider />
            <ListItem button onClick={() => {
                chooseMenuOption(props.singOut);
            }}>
                <MenuLinkStyled to={'/'}>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Turnieje" />
                </MenuLinkStyled>
            </ListItem>
        </List>
    )
}

export default SignedOutMenu;