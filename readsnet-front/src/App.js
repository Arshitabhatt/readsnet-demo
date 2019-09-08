import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/navbar'
import UpcomingList from './components/Upcoming.component'
import AddEvent from './components/Add.component'

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Switch>
     <Route path="/upcoming" exact component={UpcomingList} />
     {/* <Route path="/twiceread" exact component={ShowEvent} /> */}
     <Route path="/addevent" exact component={AddEvent} />
     </Switch>
    </Router>
  );
}

export default App;
