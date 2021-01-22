import { ActionCreators } from '../redux/appReducer'
import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44374/Author'
})


export const GetAuthors = async (dispatch) => 
{  
    try
    {
        const {data} = await axiosInstance.get();
        dispatch(ActionCreators.setAuthors(data));
    }
    catch
    {
        console.log("Error in getting authors...")
    }
}


export const NewAuthor = async (dispatch,client) => {
    try 
    {
        await axiosInstance.post('/Create', client)
        dispatch(ActionCreators.newAuthor(client));
    } catch {
        console.log('Error!');
    }
}

export const DeleteAuthor = async (dispatch, client) => {
    try
    {
        await axiosInstance.delete('/Delete/'+`${client.nickname}`);
        dispatch(ActionCreators.deleteAuthor(client));
    }
    catch
    {
        console.log('Error in deleting author...')
    }
}

export const EditAuthor = async (dispatch, client, c) => {
    try
    {
        await axiosInstance.put('/Update/'+`${c.nickname}`+'/'+`${client.ages}`);
        dispatch(ActionCreators.editAuthor(client));

    }
    catch
    {
        console.log('Error in updating author...')
    }
}