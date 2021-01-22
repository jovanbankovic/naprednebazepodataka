import { ActionCreators } from '../redux/albumReducer'
import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44374/Album'
})

export const GetAlbums = async (dispatch) => 
{  
    try
    {
        const {data} = await axiosInstance.get();
        dispatch(ActionCreators.setAlbums(data));
    }
    catch
    {
        console.log('Error in geting albums...');
    }
}

export const NewAlbum = async (dispatch,client) => {
    try 
    {
        await axiosInstance.post('/Create', client)
        dispatch(ActionCreators.newAlbum(client));
    } catch {
        console.log('Error!');
    }
}

export const DeleteAlbum = async (dispatch, client) => {
    try
    {
        await axiosInstance.delete('/Delete/'+`${client.name}`);
        dispatch(ActionCreators.deleteAlbum(client));
    }
    catch
    {
        console.log('Error in deleting album...')
    }
}

export const EditAlbum = async (dispatch, client, c) => {
    try
    {
        await axiosInstance.put('/Update/'+`${c.name}`+'/'+`${client.price}`);
        dispatch(ActionCreators.editAlbum(client));

    }
    catch
    {
        console.log('Error in updating author...')
    }
}

export const Connect = async (dispatch, client) => {
    try
    {
        await axiosInstance.post('/Connect/'+`${client.name}`+'/'+`${client.nickname}`+'/'+`${client.genreName}`)
    }
    catch
    {
        console.log('Error in connecting album...')
    }
}

