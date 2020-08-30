import React, { Component } from "react";
import firebase from 'firebase';
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteTournament } from "../../store/actions/TournamentActions";
import Question from "../extra/Question";
import { setBackBtn } from "../../structures/extra";
import { TournamentListItemImgStyled } from "../style/styledTournament";


import DeleteIcon from '@material-ui/icons/Delete';

import trophy from '../../configureFiles/img/trophy.png'
import {
    TournamentDetailsContainerStyled, TournamentDetailsHeaderStyled,
    TournamentDetailsTitleStyled
} from '../style/styledTournament'
import TournamentDetailsInfo from "./tournamentDetails/TournamentDetailsInfo";
import TournamentDetailsGroups from "./tournamentDetails/TournamentDetailsGroups";
import TournamentDetailsBracket from "./tournamentDetails/TournamentDetailsBracket";
import TournamentDetailsTeams from "./tournamentDetails/TournamentDetailsTeams";
import TournamentDetailsNav from "./tournamentDetails/TournamentDetailsNav";
import { TournamentViewConst } from "../../configureFiles/constants";
import { ButtoErrorStyled } from "../style/styledButtons";

class TournamentDetails extends Component {

    componentDidMount() {
        setBackBtn(() => {
            this.props.history.push('/');
        });
    }

    state = {
        question: null,
        image: null,
        view: TournamentViewConst.info
    }

    handleChangeView = (view) => {
        this.setState({ view });
    }

    handleDeleteTournament = () => {
        this.setState({
            question: {
                question: 'Do you want to delete the tournament?',
                answer1: {
                    answer: 'Yes',
                    feedback: () => {
                        this.props.deleteTournament(this.props.match.params.id);
                        this.props.history.push('/');
                    }
                },
                answer2: {
                    answer: 'No',
                    feedback: () => {
                        this.setState({ question: null });
                    }
                }
            }
        });
    }


    componentWillUpdate() {
        if (this.props.tournament?.image) {
            const url = `images/${this.props.tournament.authorId}/`;
            const storage = firebase.storage();
            const pathReference = storage.ref(url);
            const imageId = `${url}${this.props.tournament.image}`;
            const img = localStorage.getItem(imageId);

            const setImage = (url) => {
                this.setState({
                    image: url
                });
            }

            if (!img) {
                pathReference.child(this.props.tournament.image).getDownloadURL().then(function (imgUrl) {
                    localStorage.setItem(imageId, imgUrl);
                    setImage(imgUrl);
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                if (!this.state.image) {
                    setImage(img);
                }
            }
        }
    }

    getView = (tournament, teams, groups, auth, bracket, id) => {
        let groupFinished = false;
        groups.forEach(group => {
            if (group.finished) {
                groupFinished = true;
            }
        })
        switch (this.state.view) {
            case TournamentViewConst.info:
                return (<><TournamentDetailsInfo tournament={tournament} />
                    <ButtoErrorStyled
                        onClick={this.handleDeleteTournament}
                        startIcon={<DeleteIcon />}
                    >
                        USUŃ TURNIEJ
                  </ButtoErrorStyled>
                    {this.state.question ? <Question question={this.state.question} /> : null}</>);
            case TournamentViewConst.groups:
                return <TournamentDetailsGroups tournamentId={id} groups={groups} isBracketCreated={Boolean(bracket) && bracket.length} auth={auth} />
            case TournamentViewConst.bracket:
                return <TournamentDetailsBracket tournamentId={id} bracket={bracket} isGroupFinished={groupFinished} auth={auth} />
            case TournamentViewConst.teams:
                return <TournamentDetailsTeams tournamentId={id} teams={teams} isGroupCreated={Boolean(groups) && !groups.length} auth={auth} />
            default:
                return <TournamentDetailsInfo tournament={tournament} />;
        }
    }

    render() {
        const id = this.props.match.params.id
        const { tournament, teams, groups, auth, bracket } = this.props;
        if (tournament && groups && teams) {


            return (
                <>
                    <TournamentDetailsNav handleChangeView={this.handleChangeView} currentView={this.state.view} />
                    <TournamentDetailsContainerStyled>
                        <TournamentDetailsHeaderStyled>
                            <TournamentListItemImgStyled src={this.state.image ? this.state.image : trophy} alt='logo' />
                            <TournamentDetailsTitleStyled>{tournament.name}</TournamentDetailsTitleStyled>
                        </TournamentDetailsHeaderStyled>
                        {this.getView(tournament, teams, groups, auth, bracket, id)}
                    </TournamentDetailsContainerStyled>
                </>
            )
        } else {
            return (
                <div>
                    Splash screen
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const tournaments = state.firestore.data.tournaments;
    const tournament = tournaments ? tournaments[id] : null;
    const auth = state.firebase.auth.uid;
    return {
        tournament: tournament,
        teams: state.firestore.ordered.teams,
        groups: state.firestore.ordered.groups,
        bracket: state.firestore.ordered.bracket,
        auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTournament: (tournamentId) => dispatch(deleteTournament(tournamentId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        return [
            { collection: 'tournaments' },
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'teams', orderBy: ['name', 'asc'] }],
                storeAs: 'teams'
            },
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'groups', orderBy: ['name', 'asc'] }],
                storeAs: 'groups'
            },
            {
                collection: 'tournaments',
                doc: props.match.params.id,
                subcollections: [{ collection: 'bracket' }],
                storeAs: 'bracket'
            },
        ]
    })
)(TournamentDetails);