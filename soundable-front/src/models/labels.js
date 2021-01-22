import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { GetLabels, EditLabel, NewLabel, DeleteLabel, Connect } from '../store/Label'
import { Button, FormControl, InputGroup, Modal, Form } from 'react-bootstrap'
import { GetAuthors } from '../store/Author'

export const EditClientModal = ( {client, c}) =>
{
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="left-margin-please btn btn-warning shadow-lg p-3 mb-3 rounded">Edit Label</Button>
        <EClientModal client={client} c={c} handleFormSubmit={EditLabel} show={show} handleClose={handleClose}></EClientModal>
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
        <Button onClick={handleShow} className="left-margin-please btn btn-danger shadow-lg p-3 mb-3 rounded">Delete Label</Button>
        <DClientModal client={client} handleFormSubmit={DeleteLabel} show={show} handleClose={handleClose}></DClientModal>
    </div>
}

export const ExpandableComponent = ({ dispatch, data, authors, allowed }) => 
{ 
    return(
      <div className="mb-3">
          <div className="modal-row">
            { allowed ? <EditClientModal client={data} c={data}></EditClientModal> : <div/> }
            { allowed ? <DeleteClientModal client={data}></DeleteClientModal> : <div/> }
            { allowed ? <ConnectClientModal client={authors} c={data}></ConnectClientModal> : <div/> }
          </div>
          <div className="modal-row">
            <p className="font-analysis mt-3">Authors</p>
          </div>
          <table className="table table-striped table-primary table-hover shadow rounded">
            <tbody>
              <tr>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Name</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Surname</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Nickname</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Ages</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Citizenship</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Networth</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Childrens</td>
                  <td style={{textAlign: 'center'}} className="font-analysis1">Bornplace</td>
              </tr>
              {
                  data.authors.map(client => 
                      <tr key={client.id}>
                          <td style={{textAlign: 'center'}}>{client.name}</td>
                          <td style={{textAlign: 'center'}}>{client.surname}</td>
                          <td style={{textAlign: 'center'}}>{client.nickname}</td>
                          <td style={{textAlign: 'center'}}>{client.ages}</td>
                          <td style={{textAlign: 'center'}}>{client.citizenship}</td>
                          <td style={{textAlign: 'center'}}>{client.networth}</td>
                          <td style={{textAlign: 'center'}}>{client.childrens}</td>
                          <td style={{textAlign: 'center'}}>{client.bornplace}</td>
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
              <Modal.Title>Are you sure you want to delete this label?</Modal.Title>
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
              <Modal.Title>Edit label</Modal.Title>
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
                    <p id="hidden-p" className="font-analysis-new">Are you sure you want to edit this label?</p>
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


export const CClientModal = ({ client, c ,handleFormSubmit, show, handleClose}) => 
  {    
      const [ modalNote, setModalNote ] = useState({});
      const dispatch = useDispatch();

      useEffect(() => {
          setModalNote(modalNote)
      }, [modalNote]);

      return (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Connect Label</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(dispatch, modalNote)
            }}>
            <Modal.Body>
                <p className="left-position font-analysis modal-font">Label</p>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, name: event.target.value})} placeholder={c.name}></FormControl>
                </InputGroup>
                <br></br>
                <p className="left-position font-analysis modal-font">Author</p>
                <Form.Control as="select" onChange={event => setModalNote({...modalNote, nickname: event.target.value})}>
                  {client.map(x=><option key={indexedDB}>{x.nickname}</option>)}
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
                    <p id="hidden-p" className="font-analysis-new">Are you sure you want to connect this label?</p>
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
              <Modal.Title>Create Label</Modal.Title>
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
                      <FormControl type="date" onChange={event => setModalNote({...modalNote, founded: event.target.value})} placeholder="Founded"></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, founder: event.target.value})} placeholder="Founder"></FormControl>
                </InputGroup>
                <br></br>
                <InputGroup>
                      <FormControl onChange={event => setModalNote({...modalNote, country: event.target.value})} placeholder="Country"></FormControl>
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


export const Labels = () =>
{
  const labels = useSelector(state => state.labelsReducer.labels);
  const authors = useSelector(state => state.appReducer.authors)
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
          cell: labels => <div data-tag="allowRowEvents"><div>{labels.name}</div></div>,
        },
        {
          name: 'Founder',
          selector: 'Name',
          sortable: true,
          right: true,
          cell: labels => <div data-tag="allowRowEvents"><div>{labels.founder}</div></div>,
        },
        {
          name: 'Founded',
          selector: 'Name',
          sortable: true,
          right: true,
          cell: labels => <div data-tag="allowRowEvents"><div>{labels.founded}</div></div>,
        },
        {
          name: 'Country',
          selector: 'Name',
          sortable: true,
          right: true,
          cell: labels => <div data-tag="allowRowEvents"><div>{labels.country}</div></div>,
        }
    ];
    
    const data = labels;

    useEffect(() => {
        GetLabels(dispatch); GetAuthors(dispatch);
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
        <p className="font-analysis margin-top">List Of Labels</p>
        { allowed ? <Button type="submit" variant="primary" className="input-width margin-bottom" onClick={handleShow}>Create Label</Button> : <div/> }
        <ClientModal client={null} handleFormSubmit={NewLabel} show={show} handleClose={handleClose}/>
        <DataTableExtensions print={true} export={true} exportHeaders={false} {...tableData}>
          <DataTable
            selectableRows 
            noHeader 
            selectableRowsHighlight 
            expandableRows 
            expandableRowsComponent={<ExpandableComponent dispatch={dispatch} data={data} authors={authors} allowed={allowed}></ExpandableComponent>}
            pagination 
            paginationRowsPerPageOptions={[5,10,15,20,25,50,100]}>
          </DataTable></DataTableExtensions>
    </div>
    );
}
export default Labels;