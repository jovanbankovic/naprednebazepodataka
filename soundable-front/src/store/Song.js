import { ActionCreators } from '../redux/songReducer'
import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44374/Song'
})

export const GetSongs = async (dispatch) => 
{  
    try
    {
        const {data} = await axiosInstance.get();
        dispatch(ActionCreators.setSongs(data));
    }
    catch
    {
        console.log('Error in geting songs...');
    }
}

export const NewSong = async (dispatch,client) => {
    try 
    {
        await axiosInstance.post('/Create', client)
        dispatch(ActionCreators.newSong(client));
    } catch {
        console.log('Error!');
    }
}

export const DeleteSong = async (dispatch, client) => {
    try
    {
        await axiosInstance.delete('/Delete/'+`${client.name}`);
        dispatch(ActionCreators.deleteSong(client));
    }
    catch
    {
        console.log('Error in deleting song...')
    }
}

export const EditSong = async (dispatch, client, c) => {
    try
    {
        await axiosInstance.put('/Update/'+`${c.name}`+'/'+`${client.name}`);
        dispatch(ActionCreators.editSong(client));

    }
    catch
    {
        console.log('Error in updating song...')
    }
}

export const Connect = async (dispatch, client) => {
    try
    {
        await axiosInstance.post('/Connect/'+`${client.name}`+'/'+`${client.nickname}`)
    }
    catch
    {
        console.log('Error in connecting song...')
    }
}