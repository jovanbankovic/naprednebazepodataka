import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { GetFriends } from '../store/User'

export const Extention = ({client}) =>
{
    return(
        <table className="table table-striped table-light table-hover shadow rounded">
        <tbody>
          <tr>
              <td style={{textAlign: 'center'}} className="font-analysis1">ALBUM NAME</td>
          </tr>
          {
              client.albums.map(test => 
                  <tr key={test.id}>
                      <td style={{textAlign: 'center'}}>{test.name}</td>
                  </tr>   
                
              )
          }
        </tbody>
      </table>
    );
}

export const ExpandableComponent = ({ dispatch, data}) => 
{ 
    return(
      
      <div className="mb-3">
          <div className="modal-row">
            <p className="font-analysis mt-3">PLAYLISTS</p>
          </div>
          <table className="table table-striped table-primary table-hover shadow rounded">
            <tbody>
              <tr>
                  <td style={{textAlign: 'center'}} className="font-analysis1">PLAYLIST NAME</td>
                  <td></td>
              </tr>
              {
                  data.playlists.map(client => 
                      <tr key={client.id}>
                          <td style={{textAlign: 'center'}}>{client.name}</td>
                          <td><Extention client={client}></Extention></td>
                      </tr>   
                    
                  )
              }
            </tbody>
          </table>
        </div>
    )
}

export const MyFriends = () =>
{
    const friends = useSelector(state => state.userReducer.users);
    const dispatch = useDispatch();


    const columns = [
      {
          name: 'Name',
          selector: 'Name',
          sortable: true,
          right: true,
          cell: friends => <div data-tag="allowRowEvents"><div>{friends.name}</div></div>,
        },
        {
            name: 'Surname',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: friends => <div data-tag="allowRowEvents"><div>{friends.surname}</div></div>,
        },
        {
            name: 'Username',
            selector: 'Name',
            sortable: true,
            right: true,
            cell: friends => <div data-tag="allowRowEvents"><div>{friends.username}</div></div>,
        }
    ];
    
    const data = friends;

    useEffect(() => {
        GetFriends(dispatch);
    }, []);

    const tableData = {
      columns,
      data,
    };

    return ( 
        <div className="centered-an">
        <p className="font-analysis margin-top">My Friends</p>
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
export default MyFriends;