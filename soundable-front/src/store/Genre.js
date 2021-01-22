import { ActionCreators } from '../redux/genresReducer'
import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44374/Genre'
})

export const GetGenres = async (dispatch) => 
{  
    try
    {
        const {data} = await axiosInstance.get();
        dispatch(ActionCreators.setGenres(data));
    }
    catch
    {
        console.log('Error in geting genres...');
    }
}


export const NewGenre = async (dispatch,client) => {
    try 
    {
        await axiosInstance.post('/Create', client)
        dispatch(ActionCreators.newGenre(client));
    } catch {
        console.log('Error!');
    }
}

export const DeleteGenre = async (dispatch, client) => {
    try
    {
        await axiosInstance.delete('/Delete/'+`${client.name}`);
        dispatch(ActionCreators.deleteGenre(client));
    }
    catch
    {
        console.log('Error in deleting album...')
    }
}

export const EditGenre = async (dispatch, client, c) => {
    try
    {
        await axiosInstance.put('/Update/'+`${c.name}`+'/'+`${client.name}`);
        dispatch(ActionCreators.editGenre(client));

    }
    catch
    {
        console.log('Error in updating award...')
    }
}

export const Connect = async (dispatch, client) => {
    try
    {
        await axiosInstance.post('/Connect/'+`${client.name}`+'/'+`${client.nickname}`+'/'+`${client.songname}`)
    }
    catch
    {
        console.log('Error in connecting award...')
    }
}