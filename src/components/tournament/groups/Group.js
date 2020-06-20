import React, { Component } from 'react';
import MatchesList from '../matches/MatchesList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import TeamList from '../teams/TeamList';

class Group extends Component {
    render() {
        const { group, matches } = this.props;
        console.log(group);
        console.log(matches);
        if(group && matches){
            return (
                <div className='group'>
                    <p className='title'>{group.name}</p>
                    <MatchesList matches={matches} />
                    {/* <TeamList matches={matches} /> */}
                </div>
            )
        }else{
            return (
                <div>
                    Splash
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.groupId;
    let groups = state.firestore.data.groups;
    let group = groups ? groups[id] : null;
    return {
        group,
        matches: state.firestore.ordered.matches
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        return [{
            collection: 'tournaments',
            doc: props.match.params.id,
            subcollections: [{ collection: 'groups' }],
            storeAs: 'groups'
        },
        {
            collection: 'tournaments',
            doc: props.match.params.id,
            subcollections: [{
                collection: 'groups',
                doc: props.match.params.groupId,
                subcollections: [{ collection: 'matches' }],
            }],
            storeAs: 'matches'
        }]
    }
    ))(Group);