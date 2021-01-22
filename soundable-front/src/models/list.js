import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetAuthors } from '../store/Author';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { Button, FormControl, InputGroup, Modal, Form } from 'react-bootstrap'
import { NewAuthor } from '../store/Author'
import { EditAuthor, DeleteAuthor } from '../store/Author'

export const EditClientModal = ( {client, c}) =>
{
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-warning shadow-lg p-3 mb-3 rounded">Edit Author</Button>
        <EClientModal client={client} c={c} handleFormSubmit={EditAuthor} show={show} handleClose={handleClose}></EClientModal>
    </div>
}
export const DeleteClientModal = ( {client}) =>
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="btn btn-danger shadow-lg p-3 mb-3 rounded">Delete Author</Button>
        <DClientModal client={client} handleFormSubmit={DeleteAuthor} show={show} handleClose={handleClose}></DClientModal>
    </div>
}


export const ExpandableComponent = ({ dispatch, data, allowed }) => 
{ 
    return(
      
      <div className="mb-3">
          <div className="modal-row">
               { allowed ? <EditClientModal client={{ name:data.name, surname: data.surname, nickname: data.nickname, birthdate: data.birthdate, ages: data.ages, citizenship: data.citizenship, networth: data.networth, childrens: data.childrens, bornplace: data.bornplace }} c={data}></EditClientModal> : <div/> }
               { allowed ? <DeleteClientModal client={data}></DeleteClientModal> : <div/> }

          </div>
          <div className="modal-row">
            <p className="font-analysis mt-3">Albums</p>
          </div>
          <table className="table table-striped table-primary table-hover shadow rounded">
            <tbody>
              <tr>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Name</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Price</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Length</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Studio</td>
              </tr>
              {
                  data.albums.map(client => 
                      <tr key={client.id}>
                          <td style={{textAlign: 'center'}}>{client.name}</td>
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
              <Modal.Title>Are you sure you want to delete this client?</Modal.Title>
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
              <Modal.Title>Edit client</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(dispatch, modalNote, c)
            }}>
            <Modal.Body>
                <p className="left-position font-analysis modal-font">Ages</p>
                <InputGroup>
                      <FormControl value={modalNote === null ? '' : modalNote.ages} onChange={event => setModalNote({...modalNote, ages: parseInt(event.target.value)})}></FormControl>
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
                    <p id="hidden-p" className="font-analysis-new">Are you sure you want to edit this client?</p>
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
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, surname: event.target.value})} placeholder="Surname" ></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, nickname: event.target.value})} placeholder="Nickname" ></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl type="date" onChange={event => setModalNote({...modalNote, birthdate: event.target.value})} placeholder="Birth date" ></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl type="number" onChange={event => setModalNote({...modalNote, ages: parseInt(event.target.value)})} placeholder="Ages" ></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, citizenship: event.target.value})} placeholder="Citizenship" ></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, networth: event.target.value})} placeholder="Networth" ></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl type="number" onChange={event => setModalNote({...modalNote, childrens: parseInt(event.target.value)})} placeholder="Childrens" ></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, bornplace: event.target.value})} placeholder="Born place" ></FormControl>
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

export const List = () =>
{
    const authors = useSelector(state => state.appReducer.authors);
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
            cell: authors => <div data-tag="allowRowEvents"><div>{authors.name}</div></div>,
          },
          {
            name: 'Surname',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: authors => <div data-tag="allowRowEvents"><div>{authors.surname}</div></div>,
          },
          {
            name: 'Nickname',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: authors => <div data-tag="allowRowEvents"><div>{authors.nickname}</div></div>,
          },
          {
            name: 'Networth',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: authors => <div data-tag="allowRowEvents"><div>{authors.networth}</div></div>,
          },
          {
            name: 'Citizenship',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: authors => <div data-tag="allowRowEvents"><div>{authors.citizenship}</div></div>,
          },
          {
            name: 'Ages',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: authors => <div data-tag="allowRowEvents"><div>{authors.ages}</div></div>,
          },
          {
            name: 'Place of birth',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: authors => <div data-tag="allowRowEvents"><div>{authors.bornplace}</div></div>,
          },
          {
            name: 'Childrens',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: authors => <div data-tag="allowRowEvents"><div>{authors.childrens}</div></div>,
          },
      ];
      
      const data = authors;
      useEffect(() => {
          GetAuthors(dispatch);
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
              <p className="font-analysis margin-top">List Of Authors</p>
              { allowed ? <Button type="submit" variant="primary" className="input-width margin-bottom" onClick={handleShow}>Create Author</Button> : <div/> }
              <ClientModal client={null} handleFormSubmit={NewAuthor} show={show} handleClose={handleClose}/>
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

export default List;