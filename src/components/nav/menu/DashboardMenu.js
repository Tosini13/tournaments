import React, { Component } from 'react';

import { DashboardViewConst } from "../../../configureFiles/constants";
import { MenuStyled, MenuElementStyled } from '../../style/styleNav';

class DashboardMenu extends Component {


    render() {
        const menuView = this.props.menuView;
        const changeMenuView = this.props.changeMenuView;

        return (
            <MenuStyled>
                <MenuElementStyled selected={menuView === DashboardViewConst.live ? true : false}
                    onClick={() => { changeMenuView(DashboardViewConst.live) }}>Na żywo
                </MenuElementStyled>
                <MenuElementStyled
                    selected={menuView === DashboardViewConst.today ? true : false}
                    onClick={() => { changeMenuView(DashboardViewConst.today) }}>
                    Dzisiaj
                </MenuElementStyled>
                <MenuElementStyled
                    selected={menuView === DashboardViewConst.past ? true : false}
                    onClick={() => { changeMenuView(DashboardViewConst.past) }}>
                    Przeszłe
                </MenuElementStyled>
                <MenuElementStyled selected={menuView === DashboardViewConst.future ? true : false}
                    onClick={() => { changeMenuView(DashboardViewConst.future) }}>
                    Przyszłe
                </MenuElementStyled>
            </MenuStyled>
        )
    }
}

export default DashboardMenu;