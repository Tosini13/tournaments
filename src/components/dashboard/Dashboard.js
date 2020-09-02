import React, { Component } from "react";
import TournamentSummary from "../tournament/TournamentSummary";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { setBackBtn } from "../../structures/extra";
import moment from 'moment';

import { changeMenu, changeMenuView } from '../../store/actions/MenuActions'

import List from '@material-ui/core/List';
import { MenuConst, DashboardViewConst } from "../../configureFiles/constants";

class Dashboard extends Component {
    componentDidMount() {
        setBackBtn();
        this.props.changeMenu(MenuConst.main);
        this.props.changeMenuView(DashboardViewConst.today);
    }

    state = {
        showDate: DashboardViewConst.today
    }



    handleShow = (showDate) => {
        this.setState({
            showDate
        })
    }

    filterByDate = (tournaments) => {
        switch (this.props.menu.menuView) {
            case DashboardViewConst.live:
                return tournaments.filter(tournament => moment(new Date()).isSame(tournament.date));
            case DashboardViewConst.today:
                return tournaments.filter(tournament => moment(new Date()).isSame(tournament.date, 'day'));
            case DashboardViewConst.past:
                return tournaments.filter(tournament => moment(new Date()).isAfter(tournament.date, 'day'));
            case DashboardViewConst.future:
                return tournaments.filter(tournament => moment(new Date()).isBefore(tournament.date, 'day'));
            default:
                return tournaments;
        }
    }

    render() {
        const { tournaments } = this.props;
        if (tournaments && tournaments.length) {
            const tournamentsFiltered = this.filterByDate(tournaments);
            return (
                <div className='dashboard-container'>
                    <List>
                        {tournamentsFiltered && tournamentsFiltered.map(tournament => {
                            return (
                                <TournamentSummary key={tournament.id} tournament={tournament} />
                            )
                        })}
                    </List>
                </div >
            )
        } else {
            return (
                <div>Splash...</div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tournamentsMy: state.tournament.tournaments,
        tournaments: state.firestore.ordered.tournaments,
        menu: state.menu
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeMenu: (menu) => dispatch(changeMenu(menu)),
        changeMenuView: (menuView) => dispatch(changeMenuView(menuView))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        return [
            {
                collection: 'tournaments', orderBy: ['date', 'desc'],
            }
        ]
    }))(Dashboard);