import logo from './logo.svg';
import './App.css';
import List from './models/list'; 
import NavbarComponent from './models/navbar'
import Awards from './models/awards'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './models/homepage'
import Login from './models/login'
import ProtectedRoute from './auth/protectedroute'


export const App = () => {
  return (
    <Router>
    <div className="App">
        <Switch>
          <ProtectedRoute exact path="/authors" component={HomePage}></ProtectedRoute>
          <ProtectedRoute exact path="/awards" component={HomePage}></ProtectedRoute>
          <ProtectedRoute exact path="/labels" component={HomePage}></ProtectedRoute>
          <ProtectedRoute exact path="/genres" component={HomePage}></ProtectedRoute>
          <ProtectedRoute exact path="/albums" component={HomePage}></ProtectedRoute>
          <ProtectedRoute exact path="/home" component={HomePage}></ProtectedRoute>
          <ProtectedRoute exact path="/users" component={HomePage}></ProtectedRoute>
          <ProtectedRoute exact path="/playlist" component={HomePage}></ProtectedRoute>
          <ProtectedRoute exact path="/songs" component={HomePage}></ProtectedRoute>
          <ProtectedRoute exact path="/myfriends" component={HomePage}></ProtectedRoute>
          <Route exact path="/" component={Login}></Route>
          <Route path="*" component={()=> "404 Page not found."} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
