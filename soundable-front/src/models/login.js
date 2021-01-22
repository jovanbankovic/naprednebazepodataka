import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as UserServices from '../store/User'
import { Button, FormControl, InputGroup, Modal, Form } from 'react-bootstrap'
import { NewUser } from '../store/User'

export const ClientModal = ({client, handleFormSubmit, show, handleClose}) => 
  {    
      const [ modalNote, setModalNote ] = useState({});
      const dispatch = useDispatch();

      useEffect(() => {
          setModalNote(client)
      }, [client], console.log(client));

      return (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Register User</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(dispatch, modalNote);
            }}>
            <Modal.Body>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, name: event.target.value})} placeholder="Name"></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, surname: event.target.value})} placeholder="Surname" ></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, username: event.target.value})} placeholder="Username" ></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl type="password" onChange={event => setModalNote({...modalNote, password: event.target.value})} placeholder="Password" ></FormControl>
                </InputGroup>
                <br></br>
                <br></br>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">Register</Button>
            </Modal.Footer>
            </Form>
          </Modal>
      );
}


export const ReadMeModal = ({show, handleClose}) => 
  {    
      return (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Use Guide</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Na pocetnoj strani nalazi se login forma, kao i Register dugme. Popunjavanjem login forme, nakon registracije sa validnim
                    korisnickim imenom i lozinkom, prebacuje vas na home page nase aplikacije. </p>
                <p>Ukoliko je kao username unet 'admin' i kao password 'admin' prebacuje vas takodje na home page nase aplikacije, ali sa dodatnim mogucnostima koje ima administrator. </p>
                <p>Mogucnosti koje poseduje admin su dodavanje bilo kog modela, brisanje i editovanje, kao i Connect opciju za pojedine modele (Kompletna mogucnost menjanja podataka iz baze). Svi podaci su prikazani kroz tabele, dok se pregled Edit, Delete i Connect mogucnosti omogucava spustanjem komponente u tabeli za svaki od objekata.</p>
                <p>User ima mogucnost pregleda svih albuma, autora, zanrova itd. kao i dodavanje albuma u svoju playlistu, slusanje istih i brisanje i modifikovanje svoje playliste.</p>
                <p>User ima mogucnost dodavanja korisnika kao svoje prijatelje i pregled svojih prijatelja i njihovih albuma.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
      );
}



export const Login = props =>
{
    var user = {
        name: null,
        surname: null,
        nickname: null,
        password: null,
        token: null,
        login: false,
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    useEffect(() => {
        localStorage.clear();
    });

    return (
        <div style={{background:'rgb(176,224,230)'}} className="mt-5 mb-5 shadow-lg rounded container">
        <div style={{background:'rgb(176,224,230)'}} className="centered-login shadow login-column width-cont">
            <p id="overlay7" style={{color: 'black'}} className="font-analysis-new" size="lg">Sign in and start you journey...</p>
            <h1 id="overlay1" className="font-analysis" size="lg">Soundable</h1>
            <div className="rounded input-row">
                <input onChange={(event)=>{user.email= event.target.value}} placeholder="Username" type="email" className="zoom font-analysis1 shadow-lg styleinput1" size="lg"></input>
                <input onChange={(event)=>{user.password = event.target.value}} placeholder="Password" type="password" className="zoom font-analysis1 shadow-lg styleinput2" size="lg"></input>
            </div>
            <div className="button-login">
                <a type="submit" onClick={()=> { UserServices.login(user, props) }} className="font-analysis1 zoom shadow-lg css-button-rounded">Sign In</a>
            </div>

            <Button type="submit" variant="primary" className="input-width margin-bottom mt-5" onClick={handleShow}>Register</Button>
            <ClientModal client={null} handleFormSubmit={NewUser} show={show} handleClose={handleClose}/>
            <br></br>
            <Button variant="primary" variant="lg" className="input-width margin-bottom mt-5" onClick={handleShow1}>READ ME BEFORE USE</Button>
            <ReadMeModal show={show1} handleClose={handleClose1}/>
        </div>
    </div>
    );
}

export default Login;