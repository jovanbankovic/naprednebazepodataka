import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { GetGenres, NewGenre, DeleteGenre, EditGenre } from '../store/Genre'
import { Button, FormControl, InputGroup, Modal, Form } from 'react-bootstrap'

export const EditClientModal = ( {client, c}) =>
{
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-warning shadow-lg p-3 mb-3 rounded">Edit Genre</Button>
        <EClientModal client={client} c={c} handleFormSubmit={EditGenre} show={show} handleClose={handleClose}></EClientModal>
    </div>
}

export const DeleteClientModal = ( {client}) =>
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-danger shadow-lg p-3 mb-3 rounded">Delete Genre</Button>
        <DClientModal client={client} handleFormSubmit={DeleteGenre} show={show} handleClose={handleClose}></DClientModal>
    </div>
}


export const ExpandableComponent = ({ dispatch, data, allowed}) => 
{ 
    return(
      <div className="mb-3">
          <div className="modal-row">
            { allowed ? <EditClientModal client={{ name: data.name }} c={data}></EditClientModal> : <div/> }
            { allowed ? <DeleteClientModal client={data}></DeleteClientModal> : <div/> }
          </div>
          <div className="modal-row">
            <p className="font-analysis mt-3">Albums</p>
          </div>
          <table className="table table-striped table-primary table-hover shadow rounded">
            <tbody>
              <tr>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Name</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Release Date</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Price</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Length</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Studio</td>
              </tr>
              {
                  data.albums.map(client => 
                      <tr key={client.id}>
                          <td style={{textAlign: 'center'}}>{client.name}</td>
                          <td style={{textAlign: 'center'}}>{client.releasedate}</td>
                          <td style={{textAlign: 'center'}}>{client.price}</td>
                          <td style={{textAlign: 'center'}}>{client.length}</td>
                          <td style={{textAlign: 'center'}}>{client.studio}</td>
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
              <Modal.Title>Are you sure you want to delete this genre?</Modal.Title>
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
                    <p id="hidden-p" className="font-analysis-new">Are you sure you want to edit this genre?</p>
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

export const Genres = () =>
{
  const genres = useSelector(state => state.genreReducer.genres);
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
          cell: genres => <div data-tag="allowRowEvents"><div>{genres.name}</div></div>,
      }
  ];
    
    const data = genres;

    useEffect(() => {
        GetGenres(dispatch);
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
        <p className="font-analysis margin-top">List Of Genres</p>
        { allowed ? <Button type="submit" variant="primary" className="input-width margin-bottom" onClick={handleShow}>Create Genre</Button> : <div/> }
        <ClientModal client={null} handleFormSubmit={NewGenre} show={show} handleClose={handleClose}/>
        <DataTableExtensions print={true} export={true} exportHeaders={false} {...tableData}>
          <DataTable
            selectableRows 
            noHeader 
            selectableRowsHighlight 
            expandableRows 
            expandableRowsComponent={<ExpandableComponent dispatch={dispatch} data={data} allowed={allowed}></ExpandableComponent>}
            pagination 
            paginationRowsPerPageOptions={[5,10,15,20,25,50,100]}>
          </DataTable></DataTableExtensions>
    </div>
    );
}
export default Genres;