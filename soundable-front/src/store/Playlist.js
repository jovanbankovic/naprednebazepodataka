import * as axios from 'axios';
import { ActionCreators } from '../redux/playlistReducer'

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44374/'
})

export const GetPlaylist = async (dispatch) => 
{  
    try
    {
        var loggedin = localStorage.getItem('username');
        const {data} = await axiosInstance.get('Playlist/'+`${loggedin}`);
        dispatch(ActionCreators.setPlaylists(data));
    }
    catch
    {
        console.log('Error in geting playlists...');
    }
}

export const NewPlaylist = async (dispatch, client) => 
{
    try
    {
        var loggedin = localStorage.getItem('username');
        await axiosInstance.post('Playlist/Create/'+`${loggedin}`, client);
        alert('Playlist successfuly created...');

    }
    catch
    {
        console.log('Error in creating a playlist...')
    }
}

export const EditPlaylist = async (dispatch, client, c) => {
    try
    {
        await axiosInstance.put('Playlist/Update/'+`${c.name}`+'/'+`${client.name}`);
        dispatch(ActionCreators.editLabel(client));

    }
    catch
    {
        console.log('Error in updating label...')
    }
}

export const Connect = async (dispatch, client) => {
    try
    {
        console.log(client);
        await axiosInstance.post('Playlist/Connect/'+`${client.nickname}`+'/'+`${client.name}`)
    }
    catch
    {
        console.log('Error in connecting label...')
    }
}


export const DeletePlaylist = async (dispatch, client) => {
    try
    {
        await axiosInstance.delete('Playlist/Delete/'+`${client.name}`);
        dispatch(ActionCreators.deleteSong(client));
    }
    catch
    {
        console.log('Error in deleting song...')
    }
}

export const DeletePlaylistAlbum = async (dispatch, client, c) => {
    try
    {
        await axiosInstance.delete('Playlist/DeleteAlbumInPlaylist/'+`${client.name}`+'/'+`${c.name}`);
    }
    catch
    {
        console.log('Error in deleting album from playlist...')
    }
}