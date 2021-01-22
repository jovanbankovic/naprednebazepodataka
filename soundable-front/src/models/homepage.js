import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './navbar'
import Author from './list'
import Awards from './awards'
import Genre from './genres'
import Label from './labels'
import Album from './albums'
import MainPage from './mainpage'
import ProtectedRoute from '../auth/protectedroute'
import Users from './users'
import Playlist from './playlist'
import MyFriends from './myfriend';
import Song from './song'

export const HomePage = () =>
{
    return(
        <Router>
            <div className="App">
                <Route exact path="/authors" component={Navbar}></Route>
                <Route exact path="/awards" component={Navbar}></Route>
                <Route exact path="/labels" component={Navbar}></Route>
                <Route exact path="/genres" component={Navbar}></Route>
                <Route exact path="/albums" component={Navbar}></Route>
                <Route exact path="/home" component={Navbar}></Route>
                <Route exact path="/users" component={Navbar}></Route>
                <Route exact path="/playlist" component={Navbar}></Route>
                <Route exact path="/songs" component={Navbar}></Route>
                <Route exact path="/myfriends" component={Navbar}></Route>

            </div>
            <div className="app-column">
                <Switch>
                    <ProtectedRoute exact path="/authors" component={Author}></ProtectedRoute>
                    <ProtectedRoute exact path="/awards" component={Awards}></ProtectedRoute>
                    <ProtectedRoute exact path="/labels" component={Label}></ProtectedRoute>
                    <ProtectedRoute exact path="/genres" component={Genre}></ProtectedRoute>
                    <ProtectedRoute exact path="/albums" component={Album}></ProtectedRoute>
                    <ProtectedRoute exact path="/home" component={MainPage}></ProtectedRoute>
                    <ProtectedRoute exact path="/users" component={Users}></ProtectedRoute>
                    <ProtectedRoute exact path="/playlist" component={Playlist}></ProtectedRoute>
                    <ProtectedRoute exact path="/songs" component={Song}></ProtectedRoute>
                    <ProtectedRoute exact path="/myfriends" component={MyFriends}></ProtectedRoute>
                </Switch>
            </div>
        </Router>
    );
}
export default HomePage;