import { ActionCreators } from '../redux/awardsReducer'
import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44374/Award'
})

export const GetAwards = async (dispatch) => 
{  
    try
    {
        const {data} = await axiosInstance.get();
        dispatch(ActionCreators.setAwards(data));
    }
    catch
    {
        console.log('Error in geting awards...');
    }
}

export const NewAward = async (dispatch,client) => {
    try 
    {
        await axiosInstance.post('/Create', client)
        dispatch(ActionCreators.newAward(client));
    } catch {
        console.log('Error!');
    }
}

export const DeleteAward = async (dispatch, client) => {
    try
    {
        await axiosInstance.delete('/Delete/'+`${client.name}`);
        dispatch(ActionCreators.deleteAward(client));
    }
    catch
    {
        console.log('Error in deleting album...')
    }
}

export const EditAward = async (dispatch, client, c) => {
    try
    {
        await axiosInstance.put('/Update/'+`${c.name}`+'/'+`${client.city}`);
        dispatch(ActionCreators.editAward(client));

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