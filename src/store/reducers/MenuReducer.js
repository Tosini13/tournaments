import { DashboardViewConst, MenuConst } from "../../configureFiles/constants";

const initState = {
    menu: MenuConst.main,
    menuView: DashboardViewConst.today
}

const menuReducer = (state = initState, action) => {
    switch (action.type) {
        case 'MENU_CHANGED':
            state.menu = action.menu;
            return { ...state };
        case 'MENU_VIEW_CHANGED':
            state.menuView = action.menuView;
            return { ...state };
        default:
            return { ...state };
    }
}

export default menuReducer;