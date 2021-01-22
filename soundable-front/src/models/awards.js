import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { GetAwards, EditAward, NewAward, DeleteAward, Connect } from '../store/Awards'
import { Button, FormControl, InputGroup, Modal, Form } from 'react-bootstrap'
import { GetSongs } from '../store/Song'
import { GetAuthors } from '../store/Author'

export const EditClientModal = ( {client, c}) =>
{
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-warning shadow-lg p-3 mb-3 rounded">Edit Award</Button>
        <EClientModal client={client} c={c} handleFormSubmit={EditAward} show={show} handleClose={handleClose}></EClientModal>
    </div>
}

export const ConnectClientModal = ( { albums, client, c }) =>
{
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-success shadow-lg p-3 mb-3 rounded">Connect</Button>
        <CClientModal albums={albums} client={client} c={c} handleFormSubmit={Connect} show={show} handleClose={handleClose}></CClientModal>
    </div>
}

export const DeleteClientModal = ( {client}) =>
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-danger shadow-lg p-3 mb-3 rounded">Delete Award</Button>
        <DClientModal client={client} handleFormSubmit={DeleteAward} show={show} handleClose={handleClose}></DClientModal>
    </div>
}


export const ExpandableComponent = ({ dispatch, data, authors, songs, allowed }) => 
{ 
    return(
      <div className="mb-3">
          <div className="modal-row">
            { allowed ? <EditClientModal client={{ name: data.name, city: data.city, date: data.date }} c={data}></EditClientModal> : <div/> }
            { allowed ? <DeleteClientModal client={data}></DeleteClientModal> : <div/> }
            { allowed ? <ConnectClientModal albums={data} client={authors} c={songs}></ConnectClientModal> : <div/> }
          </div>
          <div className="modal-row">
            <p className="font-analysis mt-3">Songs</p>
          </div>
          <table className="table table-striped table-primary table-hover shadow rounded">
            <tbody>
              <tr>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Name</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Release Date</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Duration</td>
              </tr>
              {
                  data.songs.map(client => 
                      <tr key={client.id}>
                          <td style={{textAlign: 'center'}}>{client.name}</td>
                          <td style={{textAlign: 'center'}}>{client.released}</td>
                          <td style={{textAlign: 'center'}}>{client.duration}</td>
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
              <Modal.Title>Are you sure you want to delete this album?</Modal.Title>
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
              <Modal.Title>Edit award</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(dispatch, modalNote, c)
            }}>
            <Modal.Body>
                <p className="left-position font-analysis modal-font">City</p>
                <InputGroup>
                      <FormControl value={modalNote === null ? '' : modalNote.city} onChange={event => setModalNote({...modalNote, city: event.target.value})}></FormControl>
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
                    <p id="hidden-p" className="font-analysis-new">Are you sure you want to edit this award?</p>
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


export const CClientModal = ({ albums, client, c, handleFormSubmit, show, handleClose}) => 
  {    
      const [ modalNote, setModalNote ] = useState({});
      const dispatch = useDispatch();

      useEffect(() => {
          setModalNote(modalNote)
      }, [modalNote]);

      return (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Connect album</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(dispatch, modalNote)
            }}>
            <Modal.Body>
                <p className="left-position font-analysis modal-font">Albums</p>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, name: event.target.value})} placeholder={albums.name}></FormControl>
                </InputGroup>
                <br></br>
                <p className="left-position font-analysis modal-font">Author</p>
                <Form.Control as="select" onChange={event => setModalNote({...modalNote, nickname: event.target.value})}>
                  {client.map(x=><option key={indexedDB}>{x.nickname}</option>)}
                </Form.Control>
                <br></br>
                <p className="left-position font-analysis modal-font">Genre</p>
                <Form.Control as="select" onChange={event => setModalNote({...modalNote, songname: event.target.value})}>
                  {c.map(x=><option key={indexedDB}>{x.name}</option>)}
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
                    <p id="hidden-p" className="font-analysis-new">Are you sure you want to connect this album?</p>
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
              <Modal.Title>Create Award</Modal.Title>
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
                      <FormControl  onChange={event => setModalNote({...modalNote, city: event.target.value})} placeholder="City" ></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl type="date"  onChange={event => setModalNote({...modalNote, date: event.target.value})} placeholder="Date" ></FormControl>
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

export const Awards = () =>
{
  const awards = useSelector(state => state.awardsReducer.awards);
  const authors = useSelector(state => state.appReducer.authors);
  const songs = useSelector(state => state.songReducer.songs);

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
          cell: awards => <div data-tag="allowRowEvents"><div>{awards.name}</div></div>,
        },
        {
          name: 'City',
          selector: 'Name',
          sortable: true,
          right: true,
          cell: awards => <div data-tag="allowRowEvents"><div>{awards.city}</div></div>,
        },
        {
          name: 'Date',
          selector: 'Name',
          sortable: true,
          right: true,
          cell: awards => <div data-tag="allowRowEvents"><div>{awards.date}</div></div>,
        },
    ];
    
    const data = awards;

    useEffect(() => {
        GetAwards(dispatch); GetSongs(dispatch); GetAuthors(dispatch);
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
        <p className="font-analysis margin-top">List Of Awards</p>
        { allowed ? <Button type="submit" variant="primary" className="input-width margin-bottom" onClick={handleShow}>Create Award</Button> : <div/> }
        <ClientModal client={null} handleFormSubmit={NewAward} show={show} handleClose={handleClose}/>
        <DataTableExtensions print={true} export={true} exportHeaders={false} {...tableData}>
          <DataTable
            selectableRows 
            noHeader 
            selectableRowsHighlight 
            expandableRows 
            expandableRowsComponent={<ExpandableComponent dispatch={dispatch} data={data} authors={authors} songs={songs} allowed={allowed}></ExpandableComponent>}
            pagination 
            paginationRowsPerPageOptions={[5,10,15,20,25,50,100]}>
          </DataTable></DataTableExtensions>
    </div>
    );
}
export default Awards;