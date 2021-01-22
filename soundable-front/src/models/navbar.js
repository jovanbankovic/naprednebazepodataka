import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import auth from '../auth/auth'

export const NavbarComponent = props =>
{
    return ( 
      <Navbar fixed="top" bg="primary" variant="dark">
        <Navbar.Brand style={{cursor: 'grab'}} onClick={()=>{ auth.redirect(() => { props.history.push('/home') }) }}>Soundable</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={()=>{ auth.redirect(() => { props.history.push('/authors') }) }}>Authors</Nav.Link>
            <Nav.Link onClick={()=>{ auth.redirect(() => { props.history.push('/albums') }) }}>Albums</Nav.Link>
            <Nav.Link onClick={()=>{ auth.redirect(() => { props.history.push('/awards') }) }}>Awards</Nav.Link>
            <Nav.Link onClick={()=>{ auth.redirect(() => { props.history.push('/genres') }) }}>Genres</Nav.Link>
            <Nav.Link onClick={()=>{ auth.redirect(() => { props.history.push('/labels') }) }}>Labels</Nav.Link>
            <Nav.Link onClick={()=>{ auth.redirect(() => { props.history.push('/songs') }) }}>Songs</Nav.Link>
            <Nav.Link onClick={()=>{ auth.redirect(() => { props.history.push('/users') }) }}>Users</Nav.Link>
            <Nav.Link style={{position: 'absolute', right: '0', marginRight: '100px' }} onClick={()=>{ auth.redirect(() => { props.history.push('/playlist') }) }}>Playlist</Nav.Link>
            <Nav.Link style={{position: 'absolute', right: '0' }} onClick={()=>{ auth.redirect(() => { props.history.push('/myfriends') }) }}>My Friends</Nav.Link>
          </Nav>
        </Navbar>
    );
}

export default NavbarComponent;