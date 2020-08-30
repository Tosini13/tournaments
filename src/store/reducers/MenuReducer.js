import { dashboardViewConst, MenuConst } from "../../configureFiles/constants";

const initState = {
    menu: MenuConst.main,
    submenu: dashboardViewConst.today
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'MENU_CHANGED':
            console.log('MENU_CHANGED');
            return {
                ...state,
            };
        case 'MENU_VIEW_CHANGED':
            console.log('MENU_VIEW_CHANGED');
            return {
                ...state,
            };
        default:
            return state;
    }
}

export default authReducer;