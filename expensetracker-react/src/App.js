import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Category from './Category';
import Home from './Home';
import Expenses from './Expenses'
import NavBar from './NavBar';

class App extends Component{
  render(){
    return (
      <Router>
        <NavBar/>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/categories' exact={true} component={Category} />
          <Route path='/expenses' exact={true} component={Expenses} />
        </Switch>
      </Router>
    );
  }
  
}

export default App;
