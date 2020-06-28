import React from 'react';
import './css/style.css'
import './css/fontello/css/fontello.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import TournamentDetails from './components/tournament/TournamentDetails';
import CreateTournament from './components/tournament/create/CreateTournament';
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Group from './components/tournament/groups/Group';
import CreateGroups from './components/tournament/create/CreateGroups'
import MatchGroup from './components/tournament/matches/MatchGroup';
import CreateBracket from './components/tournament/bracket/CreateBracket';
import BracketDetails from './components/tournament/bracket/BracketDetails';
import MatchBracket from './components/tournament/matches/MatchBracket';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main className='container'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/tournaments/:id/groups/:groupId/matches/:matchId' component={MatchGroup} />
            <Route path='/tournaments/:id/groups/create' component={CreateGroups} />
            <Route path='/tournaments/:id/groups/:groupId' component={Group} />
            <Route path='/tournaments/:id/bracket/create' component={CreateBracket} />
            <Route path='/tournaments/:id/bracket/:matchId' component={MatchBracket} />
            <Route path='/tournaments/:id/bracket' component={BracketDetails} />
            <Route path='/tournaments/:id' component={TournamentDetails} />
            <Route path='/create' component={CreateTournament} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
