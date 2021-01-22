import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { GetPlaylist, NewPlaylist, EditPlaylist, DeletePlaylist, Connect, DeletePlaylistAlbum } from '../store/Playlist'
import { Button, FormControl, InputGroup, Modal, Form } from 'react-bootstrap'
import { GetAlbums } from '../store/Album';


export const EditClientModal = ( {client, c}) =>
{
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-warning shadow-lg p-3 mb-3 rounded">Edit Playlist</Button>
        <EClientModal client={client} c={c} handleFormSubmit={EditPlaylist} show={show} handleClose={handleClose}></EClientModal>
    </div>
}

export const ConnectClientModal = ( { client, c }) =>
{
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-success shadow-lg p-3 mb-3 rounded">Add album to playlist</Button>
        <CClientModal client={client} c={c} handleFormSubmit={Connect} show={show} handleClose={handleClose}></CClientModal>
    </div>
}

export const DeleteClientModal = ( {client}) =>
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-danger shadow-lg p-3 mb-3 rounded">Delete Playlist</Button>
        <DClientModal client={client} handleFormSubmit={DeletePlaylist} show={show} handleClose={handleClose}></DClientModal>
    </div>
}

export const DeleteAlbumClientModal = ( {client, c}) =>
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-danger shadow-lg p-3 mb-3 rounded">Delete Album From Playlist</Button>
        <DAClientModal client={client} c={c} handleFormSubmit={DeletePlaylistAlbum} show={show} handleClose={handleClose}></DAClientModal>
    </div>
}

export const ExpandableComponent = ({ dispatch, data, albums, allowed }) => 
{ 
    return(
      
      <div className="mb-3">
          <div className="modal-row">
            <EditClientModal client={data} c={data}></EditClientModal>
            <DeleteClientModal client={data}></DeleteClientModal>
            <ConnectClientModal client={albums} c={data}></ConnectClientModal>
          </div>
          <div className="modal-row">
            <p className="font-analysis mt-3">Albums</p>
          </div>
          <table className="table table-striped table-primary table-hover shadow rounded">
            <tbody>
              <tr>
                  <td style={{textAlign: 'center'}} className="font-analysis1"></td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Name</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Link</td>
                  <td></td>
              </tr>
              {
                  data.albums.map(client => 
                      <tr key={client.id}>
                          <td style={{textAlign: 'center'}}><img src={client.picture}></img></td>
                          <td style={{textAlign: 'center'}}>{client.name}</td>
                          <td style={{textAlign: 'center'}}><a href={client.link} target="_blank" rel="noopener noreferrer">Listen to the album!</a></td>
                          <td><DeleteAlbumClientModal client={data} c={client}></DeleteAlbumClientModal></td>
                      </tr>    
                  )
              }
            </tbody>
          </table>
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

export const DAClientModal = ({client, c, handleFormSubmit, show, handleClose}) => 
  {    
      const [ modalNote, setModalNote ] = useState({});
      const dispatch = useDispatch();

      useEffect(() => {
          setModalNote(client)
      }, [client]);
      return (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to delete this album from playlist?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(dispatch, modalNote, c)
            }}>
            <Modal.Body>
                <div class="center-buttons">
                    <Button variant="primary" type="submit" onClick={handleClose}>Yes</Button>
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
              <Modal.Title>Edit playlist</Modal.Title>
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
                    <p id="hidden-p" className="font-analysis-new">Are you sure you want to edit this playlist?</p>
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
              <Modal.Title>Connect playlist</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(dispatch, modalNote)
            }}>
            <Modal.Body>
                <p className="left-position font-analysis modal-font">Playlist</p>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, name: event.target.value})} placeholder='Type your playlist name'></FormControl>
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
                    <p id="hidden-p" className="font-analysis-new">Are you sure you want to connect this playlist?</p>
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
              <Modal.Title>Create Author</Modal.Title>
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

export const Playlist = () =>
{
    const playlist = useSelector(state => state.playlistReducer.playlists);
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
          cell: playlist => <div data-tag="allowRowEvents"><div>{playlist.name}</div></div>,
        }
    ];
    
    const data = playlist;

    useEffect(() => {
        GetPlaylist(dispatch); GetAlbums(dispatch);
        if(localStorage.getItem('username') == 'admin')
        {
          setAllowed(true);
        }
    }, []);

    const tableData = {
      columns,
      data,
    };

    return (
        <div className="centered-an">
        <p className="font-analysis margin-top">My Playlists</p>
        <Button type="submit" variant="primary" className="input-width margin-bottom" onClick={handleShow}>Create Playlist</Button>
        <ClientModal client={null} handleFormSubmit={NewPlaylist} show={show} handleClose={handleClose}/>
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

export default Playlist;