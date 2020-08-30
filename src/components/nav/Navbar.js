import React, { useState } from 'react'

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { IconButtonBackStyled } from '../style/styledButtons'
import { NavBar } from '../style/styledLayouts'
import { HamburgerStyled } from '../style/styledIcons'
import MenuSideBar from '../menu/Menu'

const Navbar = (props) => {

    const [sideBarMenu, setSideBarMenu] = useState(false)

    const toggleSideBarMenu = () => {
        setSideBarMenu(!sideBarMenu);
    }

    return (
        <>
            <NavBar>
                <IconButtonBackStyled className='btn-back'>
                    <KeyboardArrowLeftIcon fontSize="large" />
                </IconButtonBackStyled>
                <HamburgerStyled open={sideBarMenu} onClick={toggleSideBarMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </HamburgerStyled>
            </NavBar>
            <MenuSideBar sideBarMenu={sideBarMenu} toggleSideBarMenu={toggleSideBarMenu} />
        </>
    )
}

export default Navbar;