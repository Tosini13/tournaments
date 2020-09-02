import React, { useState } from 'react'

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import Menu from './menu/Menu'
import { IconButtonBackStyled } from '../style/styledButtons'
import { NavBarStyled, NavContainerStyled } from '../style/styleNav'
import { HamburgerStyled } from '../style/styledIcons'
import MenuSideBar from './mainMenu/MenuSideBar'

const Navbar = (props) => {

    const [sideBarMenu, setSideBarMenu] = useState(false)

    const toggleSideBarMenu = () => {
        setSideBarMenu(!sideBarMenu);
    }

    return (
        <>
            <NavContainerStyled>
                <NavBarStyled>
                    <IconButtonBackStyled className='btn-back'>
                        <KeyboardArrowLeftIcon fontSize="large" />
                    </IconButtonBackStyled>
                    <HamburgerStyled open={sideBarMenu} onClick={toggleSideBarMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </HamburgerStyled>
                </NavBarStyled>
                <Menu />
            </NavContainerStyled>
            <MenuSideBar sideBarMenu={sideBarMenu} toggleSideBarMenu={toggleSideBarMenu} />
        </>
    )
}

export default Navbar;