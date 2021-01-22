import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { Button, FormControl, InputGroup, Modal, Form } from 'react-bootstrap'
import { GetAlbums } from '../store/Album'
import { GetSongs, NewSong, EditSong, DeleteSong, Connect } from '../store/Song'

export const EditClientModal = ( {client, c}) =>
{
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-warning shadow-lg p-3 mb-3 rounded">Edit Song</Button>
        <EClientModal client={client} c={c} handleFormSubmit={EditSong} show={show} handleClose={handleClose}></EClientModal>
    </div>
}

export const ConnectClientModal = ( { client, c }) =>
{
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-success shadow-lg p-3 mb-3 rounded">Connect</Button>
        <CClientModal client={client} c={c} handleFormSubmit={Connect} show={show} handleClose={handleClose}></CClientModal>
    </div>
}

export const DeleteClientModal = ( {client}) =>
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-danger shadow-lg p-3 mb-3 rounded">Delete Song</Button>
        <DClientModal client={client} handleFormSubmit={DeleteSong} show={show} handleClose={handleClose}></DClientModal>
    </div>
}


export const ExpandableComponent = ({ dispatch, data, albums, allowed }) => 
{ 
    return(
      <div className="mb-3">
          <div className="modal-row">
            { allowed ? <EditClientModal client={data} c={data}></EditClientModal> : <div/> }
            { allowed ? <DeleteClientModal client={data}></DeleteClientModal> : <div/> }
            { allowed ? <ConnectClientModal client={albums} c={data}></ConnectClientModal> : <div/> }
          </div>
      </div>
    )
}

export const DClientModal = ({client, handleFormSubmit, show, handleClose}) => 
  {    
      const [ modalNote, setModalNote ] = useState({});
      const dispatch = useDispatch();

      useEffect(() => {
          setModalNote(client)
      }, [client]);
      return (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to delete this song?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(dispatch, modalNote)
            }}>
            <Modal.Body>
                <div class="center-buttons">
                    <Button variant="primary" type="submit">Yes</Button>
                    <Button className="margin-left" variant="secondary" onClick={handleClose}>Close</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            </Form>
          </Modal>
      );
}

export const EClientModal = ({client, c, handleFormSubmit, show, handleClose}) => 
  {    
      const [ modalNote, setModalNote ] = useState({});
      const dispatch = useDispatch();

      useEffect(() => {
          setModalNote(client)
      }, [client]);
      return (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit song</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(dispatch, modalNote, c)
            }}>
            <Modal.Body>
                <p className="left-position font-analysis modal-font">Name</p>
                <InputGroup>
                      <FormControl value={modalNote === null ? '' : modalNote.name} onChange={event => setModalNote({...modalNote, name: event.target.value})}></FormControl>
                </InputGroup>
                <br></br>
                <div class="center-buttons">
                    <Button variant="primary" onClick={()=>openYesNo()}>Save</Button>
                    <Button className="margin-left" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer className="center-buttons1">
                <div>
                    <p id="hidden-p" className="font-analysis-new">Are you sure you want to edit this song?</p>
                    <div className="center-buttons">
                        <Button id="hidden-type" type="submit" variant="primary" onClick={handleClose}>Yes</Button>
                        <Button id="hidden-type1" className="margin-left" variant="secondary" onClick={()=>closeYesNo()}>Cancel</Button>
                    </div>
                </div>
            </Modal.Footer>
            </Form>
          </Modal>
      );
}


export const CClientModal = ({ client, c, handleFormSubmit, show, handleClose}) => 
  {    
      const [ modalNote, setModalNote ] = useState({});
      const dispatch = useDispatch();

      useEffect(() => {
          setModalNote(modalNote)
      }, [modalNote]);

      return (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Connect song</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(dispatch, modalNote)
            }}>
            <Modal.Body>
                <p className="left-position font-analysis modal-font">Song</p>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, name: event.target.value})} placeholder={c.name}></FormControl>
                </InputGroup>
                <br></br>
                <p className="left-position font-analysis modal-font">Albums</p>
                <Form.Control as="select" onChange={event => setModalNote({...modalNote, nickname: event.target.value})}>
                  {client.map(x=><option key={indexedDB}>{x.name}</option>)}
                </Form.Control>
                <br></br>
                <div className="center-buttons">
                    <Button variant="primary" onClick={()=>openYesNo()}>Save</Button>
                    <Button className="margin-left" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer className="center-buttons1">
                <div>
                    <p id="hidden-p" className="font-analysis-new">Are you sure you want to connect this song?</p>
                    <div className="center-buttons">
                        <Button id="hidden-type" type="submit" variant="primary" onClick={handleClose}>Yes</Button>
                        <Button id="hidden-type1" className="margin-left" variant="secondary" onClick={()=>closeYesNo()}>Cancel</Button>
                    </div>
                </div>
            </Modal.Footer>
            </Form>
          </Modal>
      );
}
function closeYesNo()
{
    var p = document.getElementById('hidden-p');
    var button1 = document.getElementById('hidden-type');
    var button2 = document.getElementById('hidden-type1');
    button1.style.display = 'none';
    button2.style.display = 'none';
    p.style.display='none';
}

function openYesNo()
{
    var p = document.getElementById('hidden-p');
    var button1 = document.getElementById('hidden-type');
    var button2 = document.getElementById('hidden-type1');
    button1.style.display = 'inline';
    button2.style.display = 'inline';
    p.style.display='inline';
}

export const ClientModal = ({client, handleFormSubmit, show, handleClose}) => 
  {    
      const [ modalNote, setModalNote ] = useState({});
      const dispatch = useDispatch();

      useEffect(() => {
          setModalNote(client)
      }, [client]);
      return (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Song</Modal.Title>
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
                      <FormControl  onChange={event => setModalNote({...modalNote, duration: event.target.value})} placeholder="Duration" ></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl type="date" onChange={event => setModalNote({...modalNote, released: event.target.value})} placeholder="Released" ></FormControl>
                </InputGroup>
                <br></br>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>Save</Button>
            </Modal.Footer>
            </Form>
          </Modal>
      );
}

export const Song = () =>
{
    const songs = useSelector(state => state.songReducer.songs);
    const albums = useSelector(state => state.albumsReducer.albums);
  
    const dispatch = useDispatch();
    const [allowed, setAllowed] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const columns = [
        {
            name: 'Name',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: songs => <div data-tag="allowRowEvents"><div>{songs.name}</div></div>,
          },
          {
            name: 'Duration',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: songs => <div data-tag="allowRowEvents"><div>{songs.duration}</div></div>,
          },
          {
            name: 'Released',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: songs => <div data-tag="allowRowEvents"><div>{songs.released}</div></div>,
          },
      ];
      
      const data = songs;
  
      useEffect(() => {
          GetSongs(dispatch); GetAlbums(dispatch);
          if(localStorage.getItem('username') == 'admin')
          {
            setAllowed(true);
          }
      }, []);
  
      const tableData = {
        columns,
        data,
      };

    return(
        <div className="centered-an">
        <p className="font-analysis margin-top">List Of Songs</p>
        { allowed ? <Button type="submit" variant="primary" className="input-width margin-bottom" onClick={handleShow}>Create Song</Button> : <div/> }
        <ClientModal client={null} handleFormSubmit={NewSong} show={show} handleClose={handleClose}/>
        <DataTableExtensions print={true} export={true} exportHeaders={false} {...tableData}>
          <DataTable
            selectableRows 
            noHeader 
            selectableRowsHighlight 
            expandableRows 
            expandableRowsComponent={<ExpandableComponent dispatch={dispatch} data={data} albums={albums} allowed={allowed}></ExpandableComponent>}
            pagination 
            paginationRowsPerPageOptions={[5,10,15,20,25,50,100]}>
          </DataTable></DataTableExtensions>
        </div>
    );
}

export default Song;