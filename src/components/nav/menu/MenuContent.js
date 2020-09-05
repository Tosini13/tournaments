import React, { Component } from 'react';

import { MenuStyled, MenuElementStyled } from '../../style/styleNav'
import { menuStringConst } from "../../../configureFiles/constants";

class MenuContent extends Component {

    render() {
        const menuView = this.props.menuView;
        const changeMenuView = this.props.changeMenuView;
        const menuListConst = this.props.menuList;
        const menuListKeys = Object.keys(menuListConst);
        return (
            <MenuStyled>
                {menuListKeys && menuListKeys.map(element =>
                    <MenuElementStyled key={menuListConst[element]} selected={menuView === menuListConst[element] ? true : false}
                        onClick={() => { changeMenuView(menuListConst[element]) }}>
                        {menuStringConst.get(menuListConst[element])}
                    </MenuElementStyled>
                )}
            </MenuStyled>
        )
    }
}

export default MenuContent;