import React from 'react';
import './css/style.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import TournamentDetails from './components/tournament/TournamentDetails';
import CreateTournament from './components/tournament/create/CreateTournament';
// import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Group from './components/tournament/groups/Group';
// import CreateProject from './components/projects/CreateProject'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/tournament/:id/group/:groupId' component={Group} />
          <Route path='/tournament/:id' component={TournamentDetails} />
          <Route path='/create' component={CreateTournament} />
          {/* <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
