import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { GetUsers, GetAllUsers ,GetFriends } from '../store/User'
import { Button, FormControl, InputGroup, Modal, Form } from 'react-bootstrap'
import { AddFriend } from '../store/User'

export const AddFriendModal = ( {client}) =>
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className="btn btn-success shadow-lg p-3 mb-3 rounded">Add as Friend</Button>
        <AClientModal client={client} handleFormSubmit={AddFriend} show={show} handleClose={handleClose}></AClientModal>
    </div>
}


export const AClientModal = ({client, handleFormSubmit, show, handleClose}) => 
  {    
      const [ modalNote, setModalNote ] = useState({});
      const dispatch = useDispatch();

      useEffect(() => {
          setModalNote(client)
      }, [client]);
      return (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to add this user to your friends?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(dispatch, modalNote)
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

export const ExpandableComponent = ({ dispatch, data }) => 
{ 
    return(
      
      <div className="mb-3">
          <div className="modal-row">
              <AddFriendModal client={data}></AddFriendModal>
          </div>
      </div>
    )
}

export const User = () =>
{
    const users = useSelector(state => state.userReducer.users);
    const dispatch = useDispatch();

  const columns = [
      {
          name: 'Name',
          selector: 'Name',
          sortable: true,
          right: true,
          cell: users => <div data-tag="allowRowEvents"><div>{users.name}</div></div>,
        },
        {
          name: 'City',
          selector: 'Name',
          sortable: true,
          right: true,
          cell: users => <div data-tag="allowRowEvents"><div>{users.surname}</div></div>,
        },
        {
          name: 'Date',
          selector: 'Name',
          sortable: true,
          right: true,
          cell: users => <div data-tag="allowRowEvents"><div>{users.username}</div></div>,
        },
    ];
    
    const data = users;

    useEffect(() => {
        GetAllUsers(dispatch)
    }, []);

    const tableData = {
      columns,
      data,
    };

    return (
        <div className="centered-an">
        <p className="font-analysis margin-top">List Of Users</p>
        <DataTableExtensions print={true} export={true} exportHeaders={false} {...tableData}>
          <DataTable
            selectableRows 
            noHeader 
            selectableRowsHighlight 
            expandableRows 
            expandableRowsComponent={<ExpandableComponent dispatch={dispatch} data={data}></ExpandableComponent>}
            pagination 
            paginationRowsPerPageOptions={[5,10,15,20,25,50,100]}>
          </DataTable></DataTableExtensions>
    </div>
    );
}

export default User;