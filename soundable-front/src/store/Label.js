import { ActionCreators } from '../redux/labelsReducer'
import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44374/Label'
})

export const GetLabels = async (dispatch) => 
{  
    try
    {
        const {data} = await axiosInstance.get();
        dispatch(ActionCreators.setLabels(data));
    }
    catch
    {
        console.log('Error in geting labels...');
    }
}

export const NewLabel = async (dispatch,client) => {
    try 
    {
        await axiosInstance.post('/Create', client)
        dispatch(ActionCreators.newLabel(client));
    } catch {
        console.log('Error!');
    }
}

export const DeleteLabel = async (dispatch, client) => {
    try
    {
        await axiosInstance.delete('/Delete/'+`${client.name}`);
        dispatch(ActionCreators.deleteLabel(client));
    }
    catch
    {
        console.log('Error in deleting label...')
    }
}

export const EditLabel = async (dispatch, client, c) => {
    try
    {
        await axiosInstance.put('/Update/'+`${c.name}`+'/'+`${client.name}`);
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
        await axiosInstance.post('/Connect/'+`${client.name}`+'/'+`${client.nickname}`)
    }
    catch
    {
        console.log('Error in connecting label...')
    }
}